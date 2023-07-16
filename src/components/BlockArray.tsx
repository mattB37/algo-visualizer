//blockarray.tsx
import React from "react";
import { Block } from "../types";

type BlockArrayProps = {
  blocks: Block[]; // use the Block type from types.ts
};

const BlockArray: React.FC<BlockArrayProps> = ({ blocks }) => (
  <div
    style={{ display: "flex", flexDirection: "row", alignItems: "flex-end" }}
  >
    {blocks.map((block) => (
      <div
        key={block.id}
        style={{
          height: `${block.size}px`,
          width: block.width,
          backgroundColor: block.pivot
            ? "black"
            : block.highlighted
            ? "red"
            : block.toSwap
            ? "green"
            : "blue",
          margin: "5px",
        }}
      />
    ))}
  </div>
);

export default BlockArray;
