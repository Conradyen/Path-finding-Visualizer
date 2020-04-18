import React, { useState } from "react";
import GraphNode from "./GraphNode";
import "./graph.css";
import { dijkstra } from "../algorithms/dijkstra";
import { aStar } from "../algorithms/aStar";
import { getNodesInShortestPathOrder } from "../algorithms/utils";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const initGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(getNewNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const getNewNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: true,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export default function Graph() {
  const [grid, setGrid] = useState(initGrid());
  const [mouseDown, setMouse] = useState(false);
  const [startMove, setstartMove] = useState(false);
  const [endMove, setEndMove] = useState(false);
  const [startROW, setstartROW] = useState(10);
  const [startCOL, setstartCOL] = useState(15);
  const [endROW, setendROW] = useState(10);
  const [endCOL, setendCOL] = useState(35);

  const getNewGridWithStartMoved = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isStart: !node.isStart,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const getNewGridWithEndMoved = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isFinish: !node.isFinish,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const handleMouseDown = (row, col) => {
    if (row === startROW && col === startCOL) {
      //move start
      setstartMove(true);
    } else if (row === endROW && col === endCOL) {
      //move end
      setEndMove(true);
    } else {
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid);
      setMouse(true);
    }
  };

  const handleMouseEnter = (row, col) => {
    if (startMove) {
      const newGrid = getNewGridWithStartMoved(grid, row, col);
      setstartROW(row);
      setstartCOL(col);
      setGrid(newGrid);
    } else if (endMove) {
      const newGrid = getNewGridWithEndMoved(grid, row, col);
      setendROW(row);
      setendCOL(col);
      setGrid(newGrid);
    } else {
      return;
    }
  };

  const handleMouseOut = (row, col) => {
    if (startMove) {
      const newGrid = getNewGridWithStartMoved(grid, row, col);
      setstartROW(row);
      setstartCOL(col);
      setGrid(newGrid);
    } else if (endMove) {
      const newGrid = getNewGridWithEndMoved(grid, row, col);
      setendROW(row);
      setendCOL(col);
      setGrid(newGrid);
    } else if (mouseDown) {
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid);
    } else {
      return;
    }
  };

  const handleMouseUp = () => {
    if (startMove) {
      setstartMove(false);
    } else if (endMove) {
      setEndMove(false);
    } else if (mouseDown) {
      setMouse(false);
    }
  };

  const handleResetButtonClick = () => {
    setGrid(initGrid());
    setstartROW(START_NODE_ROW);
    setstartCOL(START_NODE_COL);
    setendROW(FINISH_NODE_ROW);
    setendCOL(FINISH_NODE_COL);
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        const node = grid[i][j];
        if (node.row === START_NODE_ROW && node.col === START_NODE_COL) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-start";
        } else if (
          node.row === FINISH_NODE_ROW &&
          node.col === FINISH_NODE_COL
        ) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-finish";
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node";
        }
      }
    }
  };

  const animateVisitedNode = (
    visitedNodesInOrder,
    nodesInShortestPathOrder
  ) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  };

  const visualizeDijkstra = () => {
    const startNode = grid[startROW][startCOL];
    const finishNode = grid[endROW][endCOL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateVisitedNode(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const visualizeAStar = () => {
    const startNode = grid[startROW][startCOL];
    const finishNode = grid[endROW][endCOL];
    const visitedNodesInOrder = aStar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateVisitedNode(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  return (
    <React.Fragment>
      <button onClick={() => visualizeDijkstra()}>
        Visualize Dijkstra's Algorithm
      </button>
      <button onClick={() => visualizeAStar()}>
        Visualize aStar Algorithm
      </button>
      <button onClick={() => handleResetButtonClick()}>Reset</button>
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className="graphRow">
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall } = node;
                return (
                  <GraphNode
                    key={nodeIdx}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    mouseIsPressed={mouseDown}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
                    onMouseOut={(row, col) => handleMouseOut(row, col)}
                    row={row}
                  ></GraphNode>
                );
              })}
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}
