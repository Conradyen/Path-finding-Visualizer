import React from "react";
import "./node.css";

export default function GraphNode({
  key,
  col,
  isFinish,
  isStart,
  isWall,
  mouseIsPressed,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  onMouseOut,
  row,
}) {
  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : "";
  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
      onMouseOut={() => onMouseOut(row, col)}
    ></div>
  );
}
