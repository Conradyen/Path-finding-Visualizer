import { getNeighbors } from "./utils";
import { minHeap } from "../Datastructer/heap";
import { IAction, INode } from "../constant/ITypes";

export function* aStar(
  grid: Array<Array<INode>>,
  startNode: INode,
  finishNode: INode
): IterableIterator<IAction> {
  // const visitedNodesInOrder = [];
  grid[startNode.row][startNode.col].distance = 0;
  grid[startNode.row][startNode.col].cost = 0;
  grid[startNode.row][startNode.col].isVisited = true;
  yield { type: "visited", row: startNode.row, col: startNode.col };
  // visitedNodesInOrder.push(startNode);
  //const unvisitedNodes = getAllNodes(grid);
  var minheap = new minHeap((node: INode) => {
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
    const validNeighbors = getNeighbors(closestNode, grid);
    for (const neighborPOS of validNeighbors) {
      const neighbor = grid[neighborPOS.row][neighborPOS.col];
      if (neighbor.isVisited) continue;
      if (closestNode.distance + 1 < neighbor.distance) {
        neighbor.distance = closestNode.distance + 1;
        neighbor.previousNode = closestNode;
        yield { type: "visited", row: closestNode.row, col: closestNode.col };
      }
      var newCost =
        closestNode.distance +
        Math.abs(finishNode.col - neighbor.col) +
        Math.abs(finishNode.row - neighbor.row);

      if (newCost < neighbor.cost) {
        neighbor.cost = newCost;
        minheap.push(neighbor);
      }
      grid[neighborPOS.row][neighborPOS.col] = neighbor;
    }
    if (closestNode.distance === Infinity) break;

    closestNode.isVisited = true;
    yield { type: "visited", row: closestNode.row, col: closestNode.col };

    if (closestNode === finishNode) break;
  }
}
