import {
  sortNodes,
  updateUnvisitedNeighbors,
  getAllNodes,
  euclideanDistance,
  sortNodesAstar,
} from "./utils";

export function aStar(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  visitedNodesInOrder.push(startNode);
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesAstar(unvisitedNodes, finishNode);
    const closestNode = unvisitedNodes.shift();
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(
      closestNode,
      grid,
      euclideanDistance(closestNode, finishNode)
    );
  }
}
