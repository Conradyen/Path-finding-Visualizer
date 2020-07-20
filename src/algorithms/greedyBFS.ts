import { getNeighbors } from "./utils";
import { queue } from "../Datastructer/queue";
import { IAction, INode } from "../constant/ITypes";

export function* greedyBFS(
  grid: Array<Array<INode>>,
  startNode: INode,
  finishNode: INode
): IterableIterator<IAction> {
  grid[startNode.row][startNode.col].distance = 0;
  // startNode.distance = 0;
  // startNode.cost = 0;
  yield { type: "visited", row: startNode.row, col: startNode.col };
  //const unvisitedNodes = getAllNodes(grid);
  var q = new queue();
  q.enqueue(startNode);
  while (!q.isEmpty()) {
    // sortNodesAstar(unvisitedNodes, finishNode);
    const closestNode = q.dequeue();
    closestNode.isVisited = true;
    if (closestNode.isWall) continue;
    const validNeighbors = getNeighbors(closestNode, grid);
    for (const neighborPOS of validNeighbors) {
      const neighbor = grid[neighborPOS.row][neighborPOS.col];
      if (neighbor.isVisited) continue;
      // if (neighbor.visited) continue;
      if (neighbor.isWall) continue;
      neighbor.isVisited = true;
      neighbor.previousNode = closestNode;
      yield { type: "visited", row: neighbor.row, col: neighbor.col };
      q.enqueue(neighbor);
      grid[neighborPOS.row][neighborPOS.col] = neighbor;
    }

    if (closestNode === finishNode) break;
    yield { type: "visited", row: closestNode.row, col: closestNode.col };
  }
}
