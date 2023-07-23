//graphAlgorithms.ts
import { Node, Edge } from "reactflow";
import { CustomNodeData, GraphStorage } from "../types";

type AdjacencyList = Map<string, number[]>;

function createAdjList(
  nodes: Node<CustomNodeData>[],
  edges: Edge[]
): AdjacencyList {
  const adjacencyList: AdjacencyList = new Map();
  for (const node of nodes) {
    adjacencyList.set(node.id, []);
  }
  for (const edge of edges) {
    const sourceId = edge.source.toString();
    const targetId = edge.target.toString();

    adjacencyList.get(sourceId)?.push(Number(targetId));
    adjacencyList.get(targetId)?.push(Number(sourceId));
  }

  return adjacencyList;
}

const BFSSteps = (
  nodes: Node<CustomNodeData>[],
  edges: Edge[]
): GraphStorage[] => {
  const adj = createAdjList(nodes, edges);
  const startNode = "1";
  const q: string[] = [];
  const visited = new Set<string>();
  const newSearchSteps: GraphStorage[] = [];

  const bfsIterative = () => {
    while (q.length > 0) {
      for (let i = 0; i < q.length; i++) {
        let n = q.shift();
        if (!n) {
          return newSearchSteps;
        }
        visited.add(n);
        nodes[parseInt(n, 10) - 1].data.visited = true;
        newSearchSteps.push({
          nodes: nodes.map((node) => ({ ...node, data: { ...node.data } })),
          edges: edges.map((edge) => ({ ...edge })),
        });

        for (const neighbor of adj.get(n)!) {
          if (visited.has(neighbor.toString())) {
            continue;
          }
          nodes[neighbor - 1].data.visiting = true;
          q.push(neighbor.toString());
        }
        newSearchSteps.push({
          nodes: nodes.map((node) => ({ ...node, data: { ...node.data } })),
          edges: edges.map((edge) => ({ ...edge })),
        });
        for (const neighbor of adj.get(n)!) {
          if (visited.has(neighbor.toString())) {
            continue;
          }
          nodes[neighbor - 1].data.visiting = false;
        }
      }
    }
  };

  q.push(startNode);
  visited.add(startNode);
  newSearchSteps.push({
    nodes: nodes.map((node) => ({ ...node, data: { ...node.data } })),
    edges: edges.map((edge) => ({ ...edge })),
  });
  bfsIterative();

  for (const n of nodes) {
    let v = n.data.value.toString();
    if (visited.has(v)) {
      continue;
    }
    q.push(v);
    visited.add(startNode);
    newSearchSteps.push({
      nodes: nodes.map((node) => ({ ...node, data: { ...node.data } })),
      edges: edges.map((edge) => ({ ...edge })),
    });
    bfsIterative();
  }

  return newSearchSteps;
};

const DFSSteps = (
  nodes: Node<CustomNodeData>[],
  edges: Edge[]
): GraphStorage[] => {
  const adj = createAdjList(nodes, edges);
  const startNode = "1";
  const visited = new Set<string>();
  const newSearchSteps: GraphStorage[] = [];

  const dfsRecursive = (n: string) => {
    if (!n) {
      return;
    }
    visited.add(n);
    nodes[parseInt(n, 10) - 1].data.visiting = true;
    newSearchSteps.push({
      nodes: nodes.map((node) => ({ ...node, data: { ...node.data } })),
      edges: edges.map((edge) => ({ ...edge })),
    });
    for (const neighbor of adj.get(n)!) {
      if (visited.has(neighbor.toString())) {
        continue;
      }
      nodes[neighbor - 1].data.visiting = true;
      dfsRecursive(neighbor.toString());
    }
    nodes[parseInt(n, 10) - 1].data.visiting = false;
    nodes[parseInt(n, 10) - 1].data.visited = true;
    newSearchSteps.push({
      nodes: nodes.map((node) => ({ ...node, data: { ...node.data } })),
      edges: edges.map((edge) => ({ ...edge })),
    });
  };

  dfsRecursive(startNode);
  for (const n of nodes) {
    let v = n.data.value.toString();
    if (visited.has(v)) {
      continue;
    }
    dfsRecursive(v);
  }

  return newSearchSteps;
};

// Export the sorting functions in an object, so they can be accessed by name
export const graphAlgorithms = {
  "Breadth First Search": BFSSteps,
  "Depth First Search": DFSSteps,
};
