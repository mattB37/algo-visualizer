import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import SortingVisualizer from "./components/SortingVisualizer";
import Home from "./pages/home";
import NavBar from "./components/NavBar";
import GraphVisualizer from "./components/GraphVisualizer";

function App() {
  return (
    <HashRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/sort-visualizer"
          element={
            <div>
              <NavBar></NavBar>
              <div className="App">
                <p>Basic Sorting Visualizer</p>
                <SortingVisualizer />
              </div>
            </div>
          }
        />
        <Route
          path="/graph-visualizer"
          element={
            <div>
              <NavBar></NavBar>
              <div className="App">
                <p>Basic Graph Visualizer</p>
                <div className="my-4">
                  <GraphVisualizer />
                </div>
                <div className="my-4">
                  <p className="font-size:0.5rem">
                    FAQ: The green node is always the starting node (currently
                    no way to change this).
                    <br />
                    Dijkstras calculates shortest path from starting node to all
                    nodes where distance is euclidean distance from x,y position
                    of nodes.
                    <br />
                    The dfs is recursive which is why there is no values in the
                    stack during traversal visualization.
                  </p>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
