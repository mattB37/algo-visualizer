import { Node, Edge } from "reactflow";

export function generateRandomGraph() {
  //https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
  const randomNumberInRange = (x: number, y: number): number => {
    return Math.floor(Math.random() * (y - x + 1)) + x;
  };
  const randomNumberInRangeExcluding = (
    x: number,
    y: number,
    exclude: number
  ): number => {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * (y - x + 1)) + x;
    } while (randomNumber === exclude);

    return randomNumber;
  };

  const nodeCount = randomNumberInRange(5, 20);

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  for (let i = 1; i <= nodeCount; i++) {
    const x = randomNumberInRange(50, 500);
    const y = randomNumberInRange(40, 400);

    const node: Node = {
      id: i.toString(),
      type: "nodeVis",
      data: { value: i, startNode: true ? i === 1 : false, visited: false },
      position: { x, y },
      className: "circle",
    };

    nodes.push(node);
  }

  const numEdges = randomNumberInRange(nodeCount, nodeCount * nodeCount);
  console.log(numEdges);

  const existingEdges = new Set(); // Keep track of existing edges

  for (let i = 1; i <= numEdges; i++) {
    if (Math.random() < 0.3) {
      let s, t;
      let edgeExists;

      do {
        s = randomNumberInRangeExcluding(nodes.length, 1, i).toString();
        t = randomNumberInRangeExcluding(nodes.length, 1, i).toString();

        edgeExists =
          existingEdges.has(`${s}-${t}`) || existingEdges.has(`${t}-${s}`);
      } while (edgeExists);

      const edge: Edge = {
        id: `e${s}-${t}`,
        source: s,
        target: t,
      };

      edges.push(edge);
      existingEdges.add(`${s}-${t}`);
    }
  }

  console.log(nodes, edges);

  return { nodes, edges };
}
