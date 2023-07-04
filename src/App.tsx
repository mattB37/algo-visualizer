import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SortingVisualizer from "./components/SortingVisualizer";

function Home() {
  return (
    <main>
      <h2>Home</h2>
      <a href="https://mattb37.github.io/sort-visualizer/">sort visualizer</a>
    </main>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/algo-visualizer" element={<Home />} />
        <Route
          path="/sort-visualizer"
          element={
            <div className="App">
              <header className="App-header">
                <p>Basic Sorting Visualizer</p>
                <SortingVisualizer />
              </header>
            </div>
          }
        />
        <Route path="/graph-visualizer" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
