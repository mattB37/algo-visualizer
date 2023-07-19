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
                <GraphVisualizer />
                <p>
                  The green node is the starting node (no way to change this
                  yet).
                </p>
              </div>
            </div>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
