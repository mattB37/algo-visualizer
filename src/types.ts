import { Node, Edge } from "reactflow";

export type Block = {
  id: number;
  size: number;
  width: string;
  highlighted: boolean;
  toSwap: boolean;
  pivot: boolean;
};

//types.ts
export interface CustomNodeData {
  value: number;
  startNode: boolean;
  visited: boolean;
  visiting: boolean;
}
export type VisualizationStorage = {
  nodes: Node<CustomNodeData>[];
  edges: Edge[];
  stack: number[];
  queue: number[];
};
