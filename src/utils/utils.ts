import { INode } from "../constant/ITypes";

export const initGrid = (
  startRow: number,
  startCol: number,
  endRow: number,
  endCol: number
): Array<Array<INode>> => {
  const grid = [];
  let id = 0;
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(
        getNewNode(id, col, row, startRow, startCol, endRow, endCol)
      );
      id++;
    }
    grid.push(currentRow);
  }
  return grid;
};

export const ResetAllWithWall = (
  grid: Array<Array<INode>>
): Array<Array<INode>> => {
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 50; j++) {
      const tempNode = grid[i][j];
      tempNode.isPath = false;
      tempNode.distance = Infinity;
      tempNode.cost = Infinity;
      tempNode.isVisited = false;
      tempNode.previousNode = null;
      tempNode.nextNode = null;
      grid[i][j] = tempNode;
    }
  }

  return grid;
};

const getNewNode = (
  id: number,
  col: number,
  row: number,
  startRow: number,
  startCol: number,
  endRow: number,
  endCol: number
): INode => {
  return {
    id,
    col,
    row,
    isStart: row === startRow && col === startCol,
    isFinish: row === endRow && col === endCol,
    isPath: false,
    distance: Infinity,
    cost: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    nextNode: null,
  };
};
