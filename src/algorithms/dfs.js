import { getUnvisitedNeighbors } from "./utils";

function dfsHelper(node, grid, finishNode, visitedNodesInOrder) {
  if (node === finishNode) {
    return true;
  }
  node.visited = true;
  visitedNodesInOrder.push(node);
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    if (neighbor.isWall) continue;
    if (!neighbor.visited) {
      neighbor.previousNode = node;
      var pathFound = dfsHelper(
        neighbor,
        grid,
        finishNode,
        visitedNodesInOrder
      );
      if (pathFound) {
        visitedNodesInOrder.push(node);
        return true;
      }
    }
  }
  visitedNodesInOrder.push(node);
  return false;
}

export function dfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  visitedNodesInOrder.push(startNode);
  dfsHelper(startNode, grid, finishNode, visitedNodesInOrder);
  return visitedNodesInOrder;
}
