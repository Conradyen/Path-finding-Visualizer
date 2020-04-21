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
    closestNode.isVisited = true;
    if (closestNode.isWall) continue;
    const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid);
    for (const neighbor of unvisitedNeighbors) {
      if (neighbor.visited) continue;
      if (neighbor.isWall) continue;
      neighbor.visited = true;
      neighbor.previousNode = closestNode;
      visitedNodesInOrder.push(neighbor);
      q.enqueue(neighbor);
    }

    if (closestNode === finishNode) return visitedNodesInOrder;
    visitedNodesInOrder.push(closestNode);
  }
}
