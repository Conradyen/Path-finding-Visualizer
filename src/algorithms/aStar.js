import { getUnvisitedNeighbors } from "./utils";
import { minHeap } from "../Datastructer/heap";

export function aStar(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  startNode.cost = 0;
  visitedNodesInOrder.push(startNode);
  //const unvisitedNodes = getAllNodes(grid);
  var minheap = new minHeap((node) => {
    return node.cost;
  });
  minheap.push(startNode);
  while (!minheap.isEmpty()) {
    // sortNodesAstar(unvisitedNodes, finishNode);
    const closestNode = minheap.pop();
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid);
    for (const neighbor of unvisitedNeighbors) {
      if (closestNode.distance + 1 < neighbor.distance) {
        neighbor.distance = closestNode.distance + 1;
        neighbor.previousNode = closestNode;
        visitedNodesInOrder.push(closestNode);
      }
      var newCost =
        closestNode.distance +
        Math.abs(finishNode.col - neighbor.col) +
        Math.abs(finishNode.row - neighbor.row);

      if (newCost < neighbor.cost) {
        neighbor.cost = newCost;
        minheap.push(neighbor);
      }
    }
    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    if (closestNode === finishNode) return visitedNodesInOrder;
  }
}
