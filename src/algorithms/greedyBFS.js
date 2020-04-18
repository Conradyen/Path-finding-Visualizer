import { getUnvisitedNeighbors } from "./utils";
import { queue } from "../Datastructer/queue";

export function greedyBFS(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  startNode.cost = 0;
  visitedNodesInOrder.push(startNode);
  //const unvisitedNodes = getAllNodes(grid);
  var q = new queue();
  q.enqueue(startNode);
  while (!q.isEmpty()) {
    // sortNodesAstar(unvisitedNodes, finishNode);
    const closestNode = q.dequeue();
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid);
    for (const neighbor of unvisitedNeighbors) {
      if (neighbor.visited) continue;
      if (neighbor.isWall) continue;
      neighbor.visited = true;
      neighbor.previousNode = closestNode;
      visitedNodesInOrder.push(neighbor);
      q.enqueue(neighbor);
    }
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
  }
}
