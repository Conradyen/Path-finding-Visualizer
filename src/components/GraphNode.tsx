import React from "react";
import "./node.css";
import { connect } from "react-redux";
// import Overlay from "./overlay";
import { onMouseMove, onMouseDown, onMouseUp } from "../actions";
import { IPOS } from "../constant/ITypes";
import styled, { keyframes } from "styled-components";

interface IComponentProps {
  key: number;
  col: number;
  isEnd: boolean;
  isStart: boolean;
  isWall: boolean;
  isPath: boolean;
  isVisited: boolean;
  mouseDown: boolean;
  onMouseDown: (pos: IPOS) => void;
  onMouseMove: (pos: IPOS) => void;
  onMouseUp: () => void;
  row: number;
}

interface IComponentState {
  mouseDown: boolean;
}
interface INodeprops {
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
}
const mapColor = (
  isStart: boolean,
  isEnd: boolean,
  isWall: boolean
): string => {
  if (isStart) {
    return "var(--start)";
  }
  if (isEnd) {
    return "var(--end)";
  }
  if (isWall) {
    return "var(--wall)";
  }
  return "var(--background)";
};

const keyFrameVisited = keyframes`
  0% {
    transform: scale(0.6);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
`;

const Square = styled.div<INodeprops>`
  width: 25px;
  height: 25px;
  background-color: ${(props) =>
    mapColor(props.isStart, props.isEnd, props.isWall)};
  transition: ${keyFrameVisited} 2s ease-in-out;
  display: inline-block;
  margin: 0px;
  border: 1px solid #bbb;
  padding: 0px;
  border-radius: 1px;
  /* box-shadow: 0px 2px 0px #bbb; */
  cursor: pointer;
`;

const GraphNode: React.FC<IComponentProps> = ({
  key,
  col,
  isEnd,
  isStart,
  isWall,
  isVisited,
  isPath,
  mouseDown,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  row,
}) => {
  const extraClassName = isWall
    ? "node-new-wall"
    : isStart
    ? ""
    : isEnd
    ? ""
    : isWall
    ? ""
    : isPath
    ? "node-shortest-path"
    : isVisited
    ? "node-visited"
    : "";
  const pos: IPOS = { col, row };
  return (
    <Square
      className={`node ${extraClassName}`}
      isStart={isStart}
      isEnd={isEnd}
      isWall={isWall}
      onMouseDown={() => onMouseDown(pos)}
      onMouseMove={() => onMouseMove(pos)}
      onMouseUp={() => onMouseUp()}
    ></Square>
  );
};

const MapStateToProps = (state: IComponentState) => ({
  mouseDown: state.mouseDown,
  // isEnd: start.graph.isEnd,
  // isStart: start.graph.isStart,
  // isWall: start.graph.isWall,
});

const MapDispatchToProps = (dispatch: any) => ({
  onMouseMove: (pos: IPOS) => dispatch(onMouseMove(pos)),
  onMouseDown: (pos: IPOS) => dispatch(onMouseDown(pos)),
  onMouseUp: () => dispatch(onMouseUp()),
});

export default connect(MapStateToProps, MapDispatchToProps)(GraphNode);
