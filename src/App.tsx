import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./styles/App.css";
import SortingVisualizer from "./components/SortingVisualizer";
import Home from "./pages/home";
import NavBar from "./components/NavBar";

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
              <div>
                <h1 className="App">Coming Soon</h1>
              </div>
            </div>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
