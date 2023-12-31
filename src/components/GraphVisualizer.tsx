//GraphVisualizer.tsx
import React, { useState, useCallback, useEffect } from "react";
import { graphAlgorithms } from "../utils/graphAlgorithms";
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  Controls,
  MiniMap,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import { VisualizationStorage, CustomNodeData } from "../types";
import { sparseInitialEdges, sparseInitialNodes } from "../utils/presetGraphs";
import { generateRandomGraph } from "../utils/randomGraphGen";
import ArrayDisplay from "./ArrayDisplay";

const initialNodes: Node<CustomNodeData>[] = [
  {
    id: "1",
    type: "nodeVis",
    data: { value: 1, startNode: true, visited: false, visiting: false },
    position: { x: 5, y: 5 },
    className: "circle",
  },
  {
    id: "2",
    type: "nodeVis",
    data: { value: 2, startNode: false, visited: false, visiting: false },
    position: { x: 5, y: 100 },
    className: "circle",
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
];

type AlgorithmName = keyof typeof graphAlgorithms;
const nodeTypes = { nodeVis: CustomNode };

const GraphVisualizer: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<AlgorithmName>(
    "Breadth First Search"
  );
  const [speed, setSpeed] = useState(1);

  const [nodes, setNodes] = useState<Node<CustomNodeData>[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [stkArr, setStkArr] = useState<number[]>([]);
  const [queueArr, setQueueArr] = useState<number[]>([]);

  const [steps, setSteps] = useState<VisualizationStorage[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const generateSteps = () => {
    setIsSearching(true);
    setSteps(graphAlgorithms[algorithm](nodes, edges));
  };

  useEffect(() => {
    if (steps.length > 0) {
      const timer = setTimeout(() => {
        setNodes(steps[0].nodes);
        setEdges(steps[0].edges);
        setStkArr(steps[0].stack);
        setQueueArr(steps[0].queue);
        setSteps(steps.slice(1));
      }, 500 / speed);
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [steps, speed]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const createNewNode = () => {
    const newNodeId = String(nodes.length + 1);
    const newNode: Node = {
      id: newNodeId,
      type: "nodeVis",
      data: { value: nodes.length + 1 },
      position: { x: 1, y: 1 },
      className: "circle",
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const clearAllNodes = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  };

  const resetVisualization = () => {
    const updatedNodes = nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        visited: false,
        visiting: false,
      },
    }));

    setNodes(updatedNodes);
  };

  return (
    <div>
      <select
        className="text-black bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        disabled={isSearching}
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value as AlgorithmName)}
      >
        {Object.keys(graphAlgorithms).map((algorithmName) => (
          <option key={algorithmName} value={algorithmName}>
            {algorithmName}
          </option>
        ))}
      </select>
      <select
        className="text-black bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        disabled={isSearching}
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
      >
        <option value={0.5}>0.5x</option>
        <option value={1}>1x</option>
        <option value={2}>2x</option>
        <option value={5}>5x</option>
      </select>
      <button
        className="text-black bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={generateSteps}
        disabled={isSearching}
      >
        Visualize
      </button>
      <button
        className="text-black bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={createNewNode}
        disabled={isSearching}
      >
        Create New Node
      </button>
      <button
        className="text-black bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={clearAllNodes}
        disabled={isSearching}
      >
        Clear All Nodes
      </button>

      <button
        onClick={resetVisualization}
        className="text-black bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        disabled={isSearching}
      >
        Reset visualization
      </button>
      <button
        className="text-black bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={() => {
          setNodes(sparseInitialNodes);
          setEdges(sparseInitialEdges);
        }}
        disabled={isSearching}
      >
        Generate Preset Sparse Graph
      </button>
      <button
        className="text-black bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={() => {
          const { nodes, edges } = generateRandomGraph();
          setNodes(nodes);
          setEdges(edges);
        }}
        disabled={isSearching}
      >
        Generate random graph
      </button>
      <div
        style={{
          width: window.innerWidth / 1.5,
          height: window.innerHeight / 1.5,
        }}
      >
        <ReactFlow
          key="react-flow-graph"
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
      <ArrayDisplay title="Stack" array={stkArr} />
      <ArrayDisplay title="Queue" array={queueArr} />
    </div>
  );
};

export default GraphVisualizer;
