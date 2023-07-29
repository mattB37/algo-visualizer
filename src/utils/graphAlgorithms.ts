//graphAlgorithms.ts
import { Node, Edge } from "reactflow";
import { CustomNodeData, VisualizationStorage } from "../types";

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
): VisualizationStorage[] => {
  const adj = createAdjList(nodes, edges);
  const startNode = "1";
  const q: string[] = [];
  const visited = new Set<string>();
  const newSearchSteps: VisualizationStorage[] = [];

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
          stack: [],
          queue: q.map((v) => parseInt(v, 10)),
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
          stack: [],
          queue: q.map((v) => parseInt(v, 10)),
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
    stack: [],
    queue: q.map((v) => parseInt(v, 10)),
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
      stack: [],
      queue: q.map((v) => parseInt(v, 10)),
    });
    bfsIterative();
  }

  return newSearchSteps;
};

const DFSSteps = (
  nodes: Node<CustomNodeData>[],
  edges: Edge[]
): VisualizationStorage[] => {
  const adj = createAdjList(nodes, edges);
  const startNode = "1";
  const visited = new Set<string>();
  const newSearchSteps: VisualizationStorage[] = [];

  const dfsRecursive = (n: string) => {
    if (!n) {
      return;
    }
    visited.add(n);
    nodes[parseInt(n, 10) - 1].data.visiting = true;
    newSearchSteps.push({
      nodes: nodes.map((node) => ({ ...node, data: { ...node.data } })),
      edges: edges.map((edge) => ({ ...edge })),
      stack: [],
      queue: [],
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
      stack: [],
      queue: [],
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

const DijkstraSteps = (
  nodes: Node<CustomNodeData>[],
  edges: Edge[]
): VisualizationStorage[] => {
  const nodesMap: Map<string, Node<CustomNodeData>> = nodes.reduce(
    (map, node) => {
      map.set(node.data.value.toString(), node);
      return map;
    },
    new Map<string, Node<CustomNodeData>>()
  );
  const adj = createAdjList(nodes, edges);
  const startNode = "1";
  const visited = new Set<string>();
  const dist: Map<string, number> = new Map();
  const prev: Map<string, string> = new Map();
  const q: number[] = [];
  const newSearchSteps: VisualizationStorage[] = [];

  const removeMinFromArray = (arr: number[]) => {
    const min = Math.min(...arr);
    const index = arr.indexOf(min);
    return arr.splice(index, 1)[0];
  };
  const euclidDistance = (u: string, v: string) => {
    const nodeU = nodesMap.get(u);
    const nodeV = nodesMap.get(v);

    if (!nodeU || !nodeV) {
      return Infinity;
    }

    const uX = nodeU.position.x;
    const uY = nodeU.position.y;
    const vX = nodeV.position.x;
    const vY = nodeV.position.y;

    const distance = (vX - uX) ** 2 + (vY - uY) ** 2;
    return distance;
  };

  for (const vertex of nodes) {
    dist.set(vertex.data.value.toString(), Infinity);
    prev.set(vertex.data.value.toString(), "");
    q.push(vertex.data.value);
  }

  dist.set(startNode, 0);

  while (q.length > 0) {
    const u = removeMinFromArray(q).toString(); //removes and returns the smallest element in q
    visited.add(u);
    nodes[parseInt(u, 10) - 1].data.visited = true;
    newSearchSteps.push({
      nodes: nodes.map((node) => ({ ...node, data: { ...node.data } })),
      edges: edges.map((edge) => ({ ...edge })),
      stack: [],
      queue: q.map((v) => v),
    });

    for (const neighbor of adj.get(u)!) {
      if (visited.has(neighbor.toString())) {
        continue;
      }
      nodes[neighbor - 1].data.visiting = true;
      const newDist = dist.get(u)! + euclidDistance(u, neighbor.toString());
      if (newDist < dist.get(neighbor.toString())!) {
        dist.set(neighbor.toString(), newDist);
        prev.set(neighbor.toString(), u);
      }
    }
    newSearchSteps.push({
      nodes: nodes.map((node) => ({ ...node, data: { ...node.data } })),
      edges: edges.map((edge) => ({ ...edge })),
      stack: [],
      queue: q.map((v) => v),
    });
    for (const neighbor of adj.get(u)!) {
      if (visited.has(neighbor.toString())) {
        continue;
      }
      nodes[neighbor - 1].data.visiting = false;
    }
  }

  return newSearchSteps;
};

// Export the sorting functions in an object, so they can be accessed by name
export const graphAlgorithms = {
  "Breadth First Search": BFSSteps,
  "Depth First Search": DFSSteps,
  "Dijkstra's Algorithm": DijkstraSteps,
};
