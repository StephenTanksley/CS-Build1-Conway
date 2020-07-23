import React from "react";
import Board from "./components/Board";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <h2>Conway's Game of Life</h2>
      <Board />
    </div>
  );
};

export default App;
