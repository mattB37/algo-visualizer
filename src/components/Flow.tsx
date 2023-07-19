import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";

const nodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Hello" },
    type: "input",
  },
  {
    id: "2",
    position: { x: 100, y: 100 },
    data: { label: "World" },
  },
];

function Flow() {
  return (
    <div style={{ width: "500px", height: "500px" }}>
      <ReactFlow nodes={nodes}>
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
