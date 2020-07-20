export interface INode {
  id: number;
  col: number;
  row: number;
  isStart: boolean;
  isFinish: boolean;
  isPath: boolean;
  distance: number;
  cost: number;
  isVisited: boolean;
  isWall: boolean;
  previousNode: INode | null;
  nextNode: INode | null;
}

export interface IAction {
  type: string;
  row: number;
  col: number;
}

export interface IPOS {
  row: number;
  col: number;
}
