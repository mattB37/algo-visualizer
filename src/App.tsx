import React from "react";
import "./App.css";
import SortingVisualizer from "./components/SortingVisualizer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Basic Sorting Visualizer</p>
        <SortingVisualizer></SortingVisualizer>
      </header>
    </div>
  );
}

export default App;
