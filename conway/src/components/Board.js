import React from "react";
import "./Board.css";

const Board = () => {
  const cellSize = 20;
  const WIDTH = 800;
  const HEIGHT = 600;

  return (
    <div>
      <div
        className="board"
        style={{
          width: WIDTH,
          height: HEIGHT,
          backgroundSize: `${cellSize}px ${cellSize}px`,
        }}
      ></div>
    </div>
  );
};

export default Board;
