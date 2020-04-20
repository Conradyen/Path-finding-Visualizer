import React, { useState } from "react";
import GraphNode from "./GraphNode";
import "./graph.css";
import { dijkstra } from "../algorithms/dijkstra";
import { aStar } from "../algorithms/aStar";
import { greedyBFS } from "../algorithms/greedyBFS";
import { dfs } from "../algorithms/dfs";
import { getNodesInShortestPathOrder } from "../algorithms/utils";
import Controller from "./Controller";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

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
    cost: Infinity,
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
  const [useAlgo, setAlgo] = useState(1);
  const [algoDone, setalgoDone] = useState(false);

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
      if (algoDone) {
        handelSPafterAlgocomplete();
      }
    } else if (endMove) {
      setEndMove(false);
      if (algoDone) {
        handelSPafterAlgocomplete();
      }
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
    setalgoDone(false);
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

  const handleClearWall = () => {
    const newGrid = grid.slice();
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[0].length; j++) {
        const node = newGrid[i][j];
        if (node.isWall) {
          node.isWall = false;
        }
      }
    }
    setGrid(newGrid);
  };

  const resetAllDistance = () => {
    const newGrid = grid.slice();
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[0].length; j++) {
        const node = newGrid[i][j];
        node.distance = Infinity;
        node.cost = Infinity;
        node.isVisited = false;
        node.previousNode = null;
        newGrid[i][j] = node;
      }
    }
    setGrid(newGrid);
  };

  const handelAlgoChange = (e) => {
    setAlgo(e.target.value);
  };

  const resetAllClassName = () => {
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        if (
          !(
            document.getElementById(`node-${row}-${col}`).className ===
              "node node-finish" ||
            document.getElementById(`node-${row}-${col}`).className ===
              "node node-start" ||
            document.getElementById(`node-${row}-${col}`).className ===
              "node node-wall"
          )
        ) {
          document.getElementById(`node-${row}-${col}`).className = "node";
        }
      }
    }
    document.getElementById(`node-${startROW}-${startCOL}`).className =
      "node node-start";
    document.getElementById(`node-${endROW}-${endCOL}`).className =
      "node node-finish";
  };

  const directShowVisitedNode = (
    visitedNodesInOrder,
    nodesInShortestPathOrder
  ) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        directShowShortestPath(nodesInShortestPathOrder);
        return;
      }
      const node = visitedNodesInOrder[i];
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node node-visited";
    }
  };

  const directShowShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      const node = nodesInShortestPathOrder[i];
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node node-shortest-path";
    }
  };

  const handelSPafterAlgocomplete = () => {
    resetAllDistance();
    resetAllClassName();
    const startNode = grid[startROW][startCOL];
    const finishNode = grid[endROW][endCOL];

    var visitedNodesInOrder;
    switch (useAlgo) {
      case 2:
        visitedNodesInOrder = aStar(grid, startNode, finishNode);
        break;
      case 3:
        visitedNodesInOrder = greedyBFS(grid, startNode, finishNode);
        break;
      case 4:
        visitedNodesInOrder = dfs(grid, startNode, finishNode);
        break;
      default:
        visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    }
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    directShowVisitedNode(visitedNodesInOrder, nodesInShortestPathOrder);
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
      if (visitedNodesInOrder[i] === grid[startROW][startCOL]) continue;
      if (visitedNodesInOrder[i] === grid[endROW][endCOL]) continue;
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      if (nodesInShortestPathOrder[i] === grid[startROW][startCOL]) continue;
      if (nodesInShortestPathOrder[i] === grid[endROW][endCOL]) continue;
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  };

  const handelStartBtnClick = () => {
    const startNode = grid[startROW][startCOL];
    const finishNode = grid[endROW][endCOL];
    resetAllDistance();
    var visitedNodesInOrder;
    switch (useAlgo) {
      case 2:
        visitedNodesInOrder = aStar(grid, startNode, finishNode);
        break;
      case 3:
        visitedNodesInOrder = greedyBFS(grid, startNode, finishNode);
        break;
      case 4:
        visitedNodesInOrder = dfs(grid, startNode, finishNode);
        break;
      default:
        visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    }
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateVisitedNode(visitedNodesInOrder, nodesInShortestPathOrder);
    setalgoDone(true);
  };

  return (
    <React.Fragment>
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
      <Controller
        useAlgo={useAlgo}
        handelAlgoChange={handelAlgoChange}
        handelStartBtnClick={handelStartBtnClick}
        handleResetButtonClick={handleResetButtonClick}
        handleClearWall={handleClearWall}
      ></Controller>
      <a href="https://github.com/Conradyen/Path-finding-Visualizer">
        <FontAwesomeIcon icon={faGithub} size="3x" color="#7a7979" />
      </a>
    </React.Fragment>
  );
}
