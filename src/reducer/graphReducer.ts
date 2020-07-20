import {
  START_PATH_FINDING,
  UPDATE_NODES,
  UPDATE_WALL_NODES,
  UPDATE_START_NODES,
  UPDATE_END_NODES,
  CLEAR_WALL,
  RESET_ALL,
  SET_CLICK_POS,
  SET_MOUSE_DOWN,
  SET_START_MOVE,
  SET_END_MOVE,
  ISDARK,
  SET_PATH_ALGO,
  NEXTACTION,
  ISFINDING,
  SET_SPEED,
} from "../constant/actionTypes";
import { INode } from "../constant/ITypes";
import { initGrid, ResetAllWithWall } from "../utils/utils";
import { IPOS, IAction } from "../constant/ITypes";
import { getPathfindGenerator } from "../algorithms";

interface IState {
  nodes: Array<Array<INode>>;
  isFinding: boolean;
  isReady: boolean;
  useAlgo: number;
  mouseDown: boolean;
  startMove: boolean;
  endMove: boolean;
  startROW: number;
  startCOL: number;
  endROW: number;
  endCOL: number;
  currClickPos: IPOS | null;
  isDark: boolean;
  actions: IterableIterator<IAction> | null;
  nextAction: IAction | null;
  speed: string;
}

const initState = {
  nodes: initGrid(10, 15, 10, 35),
  isFinding: false,
  isReady: false,
  useAlgo: 1,
  mouseDown: false,
  startMove: false,
  endMove: false,
  startROW: 10,
  startCOL: 15,
  endROW: 10,
  endCOL: 35,
  currClickPos: null,
  isDark: false,
  actions: null,
  nextAction: null,
  speed: "10",
};

export default function graphReducer(
  state: IState = initState,
  action: any
): IState {
  switch (action.type) {
    case ISDARK:
      const { isDark } = action.payload;
      return { ...state, isDark };
    case ISFINDING:
      const { isFinding } = state;
      return { ...state, isFinding: !isFinding };
    case SET_MOUSE_DOWN:
      return { ...state, mouseDown: action.payload };
    case SET_START_MOVE:
      return { ...state, startMove: action.payload };
    case SET_END_MOVE:
      return { ...state, endMove: action.payload };
    case SET_CLICK_POS:
      return { ...state, currClickPos: action.payload };
    case SET_SPEED:
      return { ...state, speed: action.payload };
    case START_PATH_FINDING:
      const isReady = action.payload.isReady;
      let pathFindTarget = state.nodes;
      let actions = null;
      let nextAction: IAction | null = null;
      if (isReady) {
        const { useAlgo, startROW, startCOL, endROW, endCOL } = state;
        actions = getPathfindGenerator(
          useAlgo,
          pathFindTarget,
          pathFindTarget[startROW][startCOL],
          pathFindTarget[endROW][endCOL]
        );
      }
      return {
        ...state,
        isReady,
        actions,
        nextAction,
      };
    case SET_PATH_ALGO:
      const { Algo } = action.payload;
      return { ...state, useAlgo: Algo };
    case CLEAR_WALL:
      const oldNodes = state.nodes;
      for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 50; col++) {
          oldNodes[row][col].isWall = false;
        }
      }
      return { ...state, nodes: oldNodes, currClickPos: null };
    case RESET_ALL:
      return {
        ...state,
        nodes: ResetAllWithWall(state.nodes),
        isFinding: false,
        isReady: false,
        mouseDown: false,
        startMove: false,
        endMove: false,
        startROW: 10,
        startCOL: 15,
        endROW: 10,
        endCOL: 35,
        currClickPos: null,
        actions: null,
        nextAction: null,
      };
    case UPDATE_WALL_NODES:
      return { ...state };
    case UPDATE_NODES:
      const allNodes = state.nodes;
      const updateRow = action.payload.payload.row;
      const updateCol = action.payload.payload.col;
      // console.log(updateRow);
      let newNode = allNodes[updateRow][updateCol];
      if (action.payload.type === "to_init") {
        // console.log("to init");
        newNode.isStart = false;
        newNode.isFinish = false;
        newNode.isWall = false;
      } else if (action.payload.type === "on_move") {
        // console.log("on_move");
        newNode.isWall = true;
      } else if (action.payload.type === "visited") {
        // console.log("on_visited");
        newNode.isVisited = true;
      } else if (action.payload.type === "toShortestPath") {
        // console.log("on_shortest_path");
        newNode.isPath = true;
      }
      //TODO :
      // else if (action.payload.type === "on_click"){
      // }
      allNodes[updateRow][updateCol] = newNode;
      return { ...state, nodes: allNodes };
    case UPDATE_START_NODES:
      //TODO :
      const updateStartRow = action.payload.row;
      const updateStartCol = action.payload.col;
      const graph = state.nodes;
      const node = graph[updateStartRow][updateStartCol];
      // console.log(node);
      node.isStart = true;
      graph[updateStartRow][updateStartCol] = node;
      // console.log(graph[updateStartRow][updateStartCol]);
      return {
        ...state,
        nodes: graph,
        startROW: updateStartRow,
        startCOL: updateStartCol,
      };
    case UPDATE_END_NODES:
      //TODO :
      const updateEndRow = action.payload.row;
      const updateEndCol = action.payload.col;
      const nodes = state.nodes;
      const n = nodes[updateEndRow][updateEndCol];
      n.isFinish = true;
      nodes[updateEndRow][updateEndCol] = n;
      return {
        ...state,
        nodes: nodes,
        endCOL: updateEndCol,
        endROW: updateEndRow,
      };
    case NEXTACTION:
      //update next action
      const ready = state.isReady;
      return {
        ...state,
        nextAction: ready ? action.payload : null,
      };
    // return { ...state };
    default:
      return { ...state };
  }
}
