import { dfs } from "./dfs";
import { dijkstra } from "./dijkstra";
import { aStar } from "./aStar";
import { greedyBFS } from "./greedyBFS";
import { INode, IAction } from "../constant/ITypes";

export function getPathfindGenerator(
  useAlgo: number,
  nodes: Array<Array<INode>>,
  start: INode,
  end: INode
): IterableIterator<IAction> | null {
  var pathFindGenerator = null;
  switch (useAlgo) {
    case 1:
      pathFindGenerator = dijkstra(nodes, start, end);
      break;
    case 2:
      pathFindGenerator = aStar(nodes, start, end);
      break;
    case 3:
      pathFindGenerator = greedyBFS(nodes, start, end);
      break;
    case 4:
      pathFindGenerator = dfs(nodes, start, end);
      break;
    default:
      pathFindGenerator = dijkstra(nodes, start, end);
  }
  return pathFindGenerator;
}
