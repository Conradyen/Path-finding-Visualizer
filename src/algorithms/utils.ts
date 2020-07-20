import { INode, IPOS } from "../constant/ITypes";
// import { getPathfindGenerator } from "./index";

export function sortNodes(unvisitedNodes: Array<INode>) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

export function sortNodesAstar(unvisitedNodes: Array<INode>, endNode: INode) {
  unvisitedNodes.sort(
    (nodeA, nodeB) =>
      nodeA.distance +
      euclideanDistance(nodeA, endNode) -
      (nodeB.distance + euclideanDistance(nodeB, endNode))
  );
}

export function NodeCompareElement(Node: INode): number {
  return Node.distance;
}

// export function updateUnvisitedNeighbors(
//   node: INode,
//   grid: Array<Array<INode>>,
//   distance: number
// ) {
//   const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
//   for (const neighbor of unvisitedNeighbors) {
//     neighbor.distance = node.distance + 1;
//     neighbor.previousNode = node;
//   }
// }

export function getUnvisitedNeighbors(
  node: INode,
  grid: Array<Array<INode>>
): Array<INode> {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

export function getNeighbors(
  node: INode,
  grid: Array<Array<INode>>
): Array<IPOS> {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0 && !grid[row - 1][col].isVisited)
    neighbors.push({ row: row - 1, col: col });
  if (row < grid.length - 1 && !grid[row + 1][col].isVisited)
    neighbors.push({ row: row + 1, col: col });
  if (col > 0 && !grid[row][col - 1].isVisited)
    neighbors.push({ row: row, col: col - 1 });
  if (col < grid[0].length - 1 && !grid[row][col + 1].isVisited)
    neighbors.push({ row: row, col: col + 1 });
  return neighbors;
}

export function getNeighborsFromPos(
  node: IPOS,
  grid: Array<Array<INode>>
): Array<IPOS> {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push({ row: row - 1, col: col });
  if (row < grid.length - 1) neighbors.push({ row: row + 1, col: col });
  if (col > 0) neighbors.push({ row: row, col: col - 1 });
  if (col < grid[0].length - 1) neighbors.push({ row: row, col: col + 1 });
  return neighbors;
}

export function getAllNodes(grid: Array<Array<INode>>): Array<INode> {
  const nodes: Array<INode> = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

//calculate distance between start and end.
export function euclideanDistance(startNode: INode, endNode: INode): number {
  const col_d = Math.abs(endNode.col - startNode.col);
  const row_d = Math.abs(endNode.row - startNode.row);
  return col_d + row_d;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode: INode): Array<INode> {
  const nodesInShortestPathOrder = [];
  let currentNode: INode | null = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
