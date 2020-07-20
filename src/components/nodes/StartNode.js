import React from "react";
import { NodeTypes } from "../Constant";
import { DragSource, DragPreviewImage } from "react-dnd";

const startNodeStyle = {
  fontSize: 40,
  fontWeight: "bold",
  cursor: "move",
};

const StartNode = ({ connectDragSource, connectDragPreview, isDragging }) => {
  return (
    <>
      <DragPreviewImage connect={connectDragPreview} />
      <div
        ref={connectDragSource}
        style={{
          ...startNodeStyle,
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        {/* >> */}
      </div>
    </>
  );
};

export default DragSource(
  NodeTypes.STARTNODE,
  {
    beginDrag: () => ({}),
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  })
)(StartNode);
