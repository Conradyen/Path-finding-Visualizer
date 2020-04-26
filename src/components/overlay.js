import React from "react";
const Overlay = ({ color }) => {
  return (
    <div
      style={{
        height: "25px",
        width: "25px",
        zIndex: 1,
        opacity: 0.8,
        backgroundColor: color,
      }}
    ></div>
  );
};
export default Overlay;
