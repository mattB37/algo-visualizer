import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import SortingVisualizer from "./components/SortingVisualizer";
import Home from "./pages/home";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="algo-visualizer" element={<Home />} />
        <Route
          path="algo-visualizer/sort-visualizer"
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
          path="algo-visualizer/graph-visualizer"
          element={
            <div>
              <NavBar></NavBar>
              <div>
                <h1 className="App">Coming Soon</h1>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
