import React from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { CustomNodeData } from "../types";

const CustomNode: React.FC<NodeProps<CustomNodeData>> = ({ data }) => {
  const customNodeStyle: React.CSSProperties = {
    borderRadius: "50%",
    backgroundColor: data.visiting
      ? "yellow"
      : data.visited
      ? "red"
      : data.startNode
      ? "green"
      : "lightblue",
    border: "5px solid black",
    width: "100px",
    height: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
  };

  return (
    <>
      <Handle
        type="source"
        position={Position.Left}
        style={{ background: "transparent" }}
      />
      <div style={customNodeStyle}>{data?.value}</div>
      <Handle
        type="target"
        position={Position.Right}
        style={{ background: "transparent" }}
      />
    </>
  );
};

export default CustomNode;
