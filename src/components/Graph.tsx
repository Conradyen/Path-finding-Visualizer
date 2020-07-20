import React, { useEffect } from "react";
import { connect } from "react-redux";
import GraphNode from "./GraphNode";
import "./graph.css";
import { IPOS, IAction } from "../constant/ITypes";
import { updateNodes } from "../actions/index";
import { INode } from "../constant/ITypes";
import styled from "styled-components";
interface IComponentState {
  startMove: boolean;
  endMove: boolean;
  nodes: Array<Array<INode>>;
  startROW: number;
  startCOL: number;
  endROW: number;
  endCOL: number;
  mouseDown: boolean;
  currClickPos: IPOS;
  nextAction: IAction | null;
}

interface IComponentProps {
  nodes: Array<Array<INode>>;
  updateNodes: (payload: object) => void;
  startROW: number;
  startCOL: number;
  endROW: number;
  endCOL: number;
  mouseDown: boolean;
  currClickPos: IPOS;
  nextAction: IAction | null;
}
const Wrapper = styled.div`
  margin-top: 0px;
`;

const Graph: React.FC<IComponentProps> = ({
  nodes,
  updateNodes,
  startROW,
  startCOL,
  endROW,
  endCOL,
  mouseDown,
  currClickPos,
  nextAction,
}) => {
  useEffect(() => {
    if (nextAction !== null && nextAction !== undefined) {
      if (nextAction.type === "toVisited") {
        const updateNode = {
          type: "visited",
          payload: { row: nextAction.row, col: nextAction.col },
        };
        updateNodes(updateNode);
      }
      if (nextAction.type === "shortestPath") {
        const updateNode = {
          type: "toShortestPath",
          payload: { row: nextAction.row, col: nextAction.col },
        };
        updateNodes(updateNode);
      }
    }
  }, [
    startROW,
    startCOL,
    endROW,
    endCOL,
    mouseDown,
    currClickPos,
    nextAction,
    updateNodes,
  ]);
  return (
    <Wrapper>
      <div key={0} className="grid">
        {nodes.map((row, rowIdx) => {
          // console.log("render row");
          return (
            <div key={rowIdx} className="graphRow">
              {row.map((node) => {
                const {
                  id,
                  row,
                  col,
                  isFinish,
                  isVisited,
                  isPath,
                  isStart,
                  isWall,
                } = node;
                return (
                  <GraphNode
                    key={id}
                    col={col}
                    isEnd={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    isPath={isPath}
                    isVisited={isVisited}
                    row={row}
                  ></GraphNode>
                );
              })}
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

const MapStateToProps = (state: IComponentState) => ({
  nodes: state.nodes,
  mouseDown: state.mouseDown,
  // startMove: state.mouse.startMove,
  // endMove: state.mouse.endMove,
  startROW: state.startROW,
  startCOL: state.startCOL,
  endROW: state.endROW,
  endCOL: state.endCOL,
  currClickPos: state.currClickPos,
  nextAction: state.nextAction,
});

const MapDispatchToProps = (dispatch: any) => ({
  updateNodes: (payload: object) => dispatch(updateNodes(payload)),
  // setStartMove: (isStart: boolean) => dispatch(setStartMove({ isStart })),
  // setMouseDown: (isDown: boolean) => dispatch(setMouseDown({ isDown })),
  // setEndMove: (isEndMove: boolean) => dispatch(setEndMove({ isEndMove })),
});

export default connect(MapStateToProps, MapDispatchToProps)(Graph);
