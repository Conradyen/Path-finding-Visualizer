import {
  START_PATH_FINDING,
  UPDATE_NODES,
  UPDATE_WALL_NODES,
  UPDATE_START_NODES,
  UPDATE_END_NODES,
  CLEAR_WALL,
  RESET_ALL,
  SET_START_MOVE,
  SET_MOUSE_DOWN,
  SET_END_MOVE,
  SET_PATH_ALGO,
  SET_SPEED,
  // SET_MOUSE_MOVE,
  // ON_MOUSE_DOWN,
  SET_CLICK_POS,
  // ON_MOUSE_UP,
  ISFINDING,
  ISDARK,
  NEXTACTION,
} from "../constant/actionTypes";
import { IPOS } from "../constant/ITypes";

export const setDark = (payload: object) => ({
  type: ISDARK,
  payload,
});

export const startPathFinding = (payload: object) => ({
  type: START_PATH_FINDING,
  payload,
});

export const updateNodes = (payload: object) => ({
  type: UPDATE_NODES,
  payload,
});

export const updateWall = (payload: object) => ({
  type: UPDATE_WALL_NODES,
  payload,
});

export const updateStart = (payload: object) => ({
  type: UPDATE_START_NODES,
  payload,
});

export const updateEnd = (payload: object) => ({
  type: UPDATE_END_NODES,
  payload,
});

export const clearWall = (payload: object) => ({
  type: CLEAR_WALL,
  payload,
});

export const resetAll = (payload: object) => ({
  type: RESET_ALL,
  payload,
});

export const setSpeed = (payload: string) => ({
  type: SET_SPEED,
  payload,
});

export const setStartMove = (payload: object) => ({
  type: SET_START_MOVE,
  payload,
});

export const setMouseDown = (payload: object) => ({
  type: SET_MOUSE_DOWN,
  payload,
});

export const setEndMove = (payload: object) => ({
  type: SET_END_MOVE,
  payload,
});

export const setPathAlgo = (payload: object) => ({
  type: SET_PATH_ALGO,
  payload,
});

export const onMouseMove = (payload: IPOS) => async (
  dispatch: any,
  getState: any
) => {
  const { row, col } = payload;
  const { startMove, endMove } = getState();
  // console.log(startMove);
  if (startMove) {
    const { startROW, startCOL } = getState();

    const updateStart = {
      type: "to_init",
      payload: { row: startROW, col: startCOL },
    };
    dispatch({ type: UPDATE_NODES, payload: updateStart });
    dispatch({ type: UPDATE_START_NODES, payload: payload });
  } else if (endMove) {
    const { endROW, endCOL } = getState();
    const updateEnd = {
      type: "to_init",
      payload: { row: endROW, col: endCOL },
    };
    dispatch({ type: UPDATE_NODES, payload: updateEnd });
    dispatch({ type: UPDATE_END_NODES, payload: payload });
  } else {
    const { mouseDown, currClickPos } = getState();
    if (!mouseDown) return;
    if (currClickPos.row === row && currClickPos.col === col) return;
    const updateNode = {
      type: "on_move",
      payload: { row, col },
    };
    dispatch({ type: UPDATE_NODES, payload: updateNode });
    dispatch({ type: SET_CLICK_POS, payload });
  }
};

export const onMouseDown = (payload: IPOS) => async (
  dispatch: any,
  getState: any
) => {
  const { col, row } = payload;
  const { startROW, startCOL, endROW, endCOL } = getState();
  // console.log(startROW);
  if (row === startROW && col === startCOL) {
    //start move
    dispatch({ type: SET_START_MOVE, payload: true });
  } else if (row === endROW && col === endCOL) {
    //end move
    dispatch({ type: SET_END_MOVE, payload: true });
  } else {
    // const clickPOS:IPOS = {row,col}
    dispatch({ type: SET_CLICK_POS, payload });
    dispatch({ type: SET_MOUSE_DOWN, payload: true });
  }
};
export const onMouseUp = () => async (dispatch: any, getState: any) => {
  const { startMove, endMove } = getState();
  if (startMove) {
    dispatch({ type: SET_START_MOVE, payload: false });
  }
  if (endMove) {
    dispatch({ type: SET_END_MOVE, payload: false });
  }
  dispatch({ type: SET_MOUSE_DOWN, payload: false });
};

const sleep = async (ms: number): Promise<any> =>
  new Promise((r) => setTimeout(r, ms));

export const performPathFind = (payload: object) => async (
  dispatch: any,
  getState: any
) => {
  dispatch({ type: ISFINDING, payload: {} });
  dispatch({ type: START_PATH_FINDING, payload });
  const { actions } = getState();
  // console.log(actions);
  if (actions != null) {
    let { isReady, speed } = getState();
    speed = parseInt(speed);
    while (isReady) {
      let newAction = actions.next();
      // console.log(newAction);
      const payload = newAction.value;
      // console.log(payload);
      if (payload === undefined) {
        const cleanAction = {
          type: "clean",
        };
        dispatch({
          type: NEXTACTION,
          payload: cleanAction,
        });
        break;
      }
      if (payload.type === "visited") {
        const toVisited = {
          type: "toVisited",
          row: payload.row,
          col: payload.col,
        };
        dispatch({
          type: NEXTACTION,
          payload: toVisited,
        });
        await sleep(speed);
      }
    }
    dispatch({ type: ISFINDING, payload: {} });
  }
};

export const performShortestPathAnimation = (payload: object) => async (
  dispatch: any,
  getState: any
) => {
  dispatch({ type: ISFINDING, payload: {} });
  const { nodes, endROW, endCOL, speed } = getState();
  var tempNode = nodes[endROW][endCOL];
  // var startNode = nodes[startROW][startCOL];
  //reverse the path
  while (tempNode.previousNode != null) {
    const temp = tempNode.previousNode;
    temp.nextNode = tempNode;
    tempNode = temp;
  }
  tempNode = tempNode.nextNode;
  while (tempNode != null) {
    // console.log(tempNode);
    const toShortestPath = {
      type: "shortestPath",
      row: tempNode.row,
      col: tempNode.col,
    };
    dispatch({
      type: NEXTACTION,
      payload: toShortestPath,
    });
    await sleep(speed);
    tempNode = tempNode.nextNode;
  }
  dispatch({ type: ISFINDING, payload: {} });
};

export const startPathFind = (payload: object) => async (
  dispatch: any,
  getState: any
) => {
  let actions = [];
  actions.push(performPathFind(payload));
  actions.push(performShortestPathAnimation(payload));
  dispatch(actions);
};
