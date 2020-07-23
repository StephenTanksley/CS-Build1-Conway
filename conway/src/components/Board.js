import React, { useState } from "react";
import "./Board.css";

const size = 20;
const cells_array = new Array(size).fill(new Array(size).fill(undefined));
const Board = () => {
  const [state, setState] = useState(cells_array);

  console.log(cells_array);

  return <div></div>;
};

export default Board;
