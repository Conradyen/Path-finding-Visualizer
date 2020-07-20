import { getNeighbors } from "./utils";
import { INode, IAction } from "../constant/ITypes";
import { stack } from "../Datastructer/stack";

export function* dfs(
  grid: Array<Array<INode>>,
  startNode: INode,
  finishNode: INode
): IterableIterator<IAction> {
  let s = new stack();
  s.push(startNode);
  while (!s.isEmpty()) {
    const tempNode = s.pop();
    if (tempNode.isWall) continue;
    // console.log(s.items);
    const validNeighbor = getNeighbors(tempNode, grid);
    if (validNeighbor.length === 0) {
      s.pop();
      // continue;
    } else {
      for (const neighborPOS of validNeighbor) {
        const node = grid[neighborPOS.row][neighborPOS.col];
        node.previousNode = tempNode;
        s.push(node);
      }
    }
    tempNode.isVisited = true;
    yield { type: "visited", row: tempNode.row, col: tempNode.col };
    grid[tempNode.row][tempNode.col] = tempNode;
    if (tempNode === finishNode) break;
  }
}
