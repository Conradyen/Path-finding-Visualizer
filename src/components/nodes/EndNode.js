import React from "react";
import { NodeTypes } from "../Constant";
import { DragSource, DragPreviewImage } from "react-dnd";

const endNodeStyle = {
  fontSize: 40,
  fontWeight: "bold",
  cursor: "move",
};

const EndNode = ({ connectDragSource, connectDragPreview, isDragging }) => {
  return (
    <>
      <DragPreviewImage connect={connectDragPreview} />
      <div
        ref={connectDragSource}
        style={{
          ...endNodeStyle,
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        o
      </div>
    </>
  );
};

export default DragSource(
  NodeTypes.ENDNODE,
  {
    beginDrag: () => ({}),
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  })
)(EndNode);
