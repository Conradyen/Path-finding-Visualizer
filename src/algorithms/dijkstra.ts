import { INode, IAction, IPOS } from "../constant/ITypes";

// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
const getMinDistance = (grid: Array<Array<INode>>): IPOS => {
  // Initialize min value
  let min = Infinity,
    min_pos = {
      row: -1,
      col: -1,
    };
  for (const row of grid) {
    for (const node of row) {
      if (
        grid[node.row][node.col].isVisited === false &&
        node.distance <= min
      ) {
        min = node.distance;
        min_pos = {
          row: node.row,
          col: node.col,
        };
      }
    }
  }
  return min_pos;
};

function updateGrid(
  grid: Array<Array<INode>>,
  prevNode: INode,
  row: number,
  col: number,
  distance: number
) {
  if (grid[row][col].isVisited === false) {
    grid[row][col].distance = distance + 1;
    grid[row][col].previousNode = prevNode;
  }
}

export function* dijkstra(
  grid: Array<Array<INode>>,
  startNode: INode,
  finishNode: INode
): IterableIterator<IAction> {
  grid[startNode.row][startNode.col].distance = 0;
  for (let i = 0; i < 1000; i++) {
    let clostestNode = getMinDistance(grid);
    grid[clostestNode.row][clostestNode.col].isVisited = true;
    yield { type: "visited", row: clostestNode.row, col: clostestNode.col };
    let tempNode = grid[clostestNode.row][clostestNode.col];
    if (tempNode.isWall) continue;
    if (clostestNode.row > 0) {
      updateGrid(
        grid,
        tempNode,
        clostestNode.row - 1,
        clostestNode.col,
        tempNode.distance
      );
    }
    if (clostestNode.row < grid.length - 1) {
      updateGrid(
        grid,
        tempNode,
        clostestNode.row + 1,
        clostestNode.col,
        tempNode.distance
      );
    }
    if (clostestNode.col > 0) {
      updateGrid(
        grid,
        tempNode,
        clostestNode.row,
        clostestNode.col - 1,
        tempNode.distance
      );
    }
    if (clostestNode.col < grid[0].length - 1) {
      updateGrid(
        grid,
        tempNode,
        clostestNode.row,
        clostestNode.col + 1,
        tempNode.distance
      );
    }
    if (tempNode === finishNode) break;
  }
}
