export function sortNodes(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

export function sortNodesAstar(unvisitedNodes, endNode) {
  unvisitedNodes.sort(
    (nodeA, nodeB) =>
      nodeA.distance +
      euclideanDistance(nodeA, endNode) -
      (nodeB.distance + euclideanDistance(nodeB, endNode))
  );
}

export function NodeCompareElement(Node) {
  return Node.distance;
}

export function updateUnvisitedNeighbors(node, grid, distance) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

export function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

export function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

//calculate distance between start and end.
export function euclideanDistance(startNode, endNode) {
  const col_d = Math.abs(endNode.col - startNode.col);
  const row_d = Math.abs(endNode.row - startNode.row);
  return col_d + row_d;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
