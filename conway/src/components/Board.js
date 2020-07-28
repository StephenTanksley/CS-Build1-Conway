import React, { useEffect, useState, useCallback, useRef } from "react";
import { useStore } from "../state/store";
import { ACTIONS } from "../helpers/helpers";
import { newCellBoard, randomCellBoard } from "../helpers/helpers.js";
import { neighbors } from "../helpers/neighbors";
import { Cell, CellObj } from "./Cell";
import { GridContainer, ButtonContainer, Container } from "../styles/styled";
import produce from "immer";

import "./Board.css";

// This is our gameboard component. The gameboard creates the pattern of cells for our simulation.
const Board = () => {
  const state = useStore();
  const { size, running, generations, speed, grid } = state.state;
  const [localGrid, setLocalGrid] = useState(() => {
    // return newCellBoard(size);
    return grid;
  });

  console.log("Context grid: ", grid);
  console.log("Local grid: ", localGrid);

  // const specific_key = localGrid.filter(function (cell, i) {
  //   return cell["row"] === 4 && cell["col"] === 3;
  // });
  // console.log("specific key alive: ", specific_key[0].alive);

  // const positionInGrid = [localGrid[15]["row"], localGrid[15]["col"]];
  // console.log(positionInGrid);

  const width = Math.round((window.innerWidth * 0.35) / size);

  // const findItems = () => {
  //   for (let i = 0; i < localGrid.length; i++) {
  //     const item = localGrid[i];
  //     console.log("alive or dead: ", item.alive);
  //   }
  // };

  // findItems();

  const updateGrid = useCallback((grid) => {
    if (!runningRef.current) {
      return;
    }
    setLocalGrid((localGrid) => {
      return produce(localGrid, (gridCopy) => {
        for (let i = 0; i < localGrid.length; i++) {
          console.log(localGrid[i]);
        }
      });
    });
  });

  // useEffect(() => {
  //   if (size) {
  //     const rando = randomCellBoard(size);
  //     console.log(`random cell board of size ${size} : `, rando);
  //   }
  // }, [size]);

  useEffect(() => {
    setLocalGrid(grid);
    console.log(grid);
  }, [grid]);

  const { dispatch } = state;
  const { RUNNING, STOP_RUNNING, NEXT_GEN, RANDOM_BOARD, CLEAR } = ACTIONS;

  // const dispatchAction = (action) => {
  //   dispatch({ type: action });
  // };

  const generationsRef = useRef(generations);
  generationsRef.current = generations;

  const runningRef = useRef(running);
  runningRef.current = running;

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log(e.target);
  };

  return (
    <>
      <Container>
        <div
          size={size}
          style={{
            display: "grid",
            width: "75vw",
            margin: "0 auto",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid green",
            gridTemplateColumns: `repeat(${size}, ${width}px)`,
          }}
        >
          {localGrid.map((cell, i) => {
            return (
              <Cell
                dimensions={width}
                size={size}
                key={`${cell.row}-${cell.col}`}
                className={cell.alive ? "alive" : "dead"}
                alive={cell.alive}
                active={cell.active}
                onClick={handleClick}
              />
            );
          })}
        </div>
      </Container>

      <ButtonContainer>
        <button>{running ? "Stop" : "Start"}</button>
        <button
          onClick={() => {
            dispatch({ type: CLEAR });
          }}
        >
          Clear
        </button>
        <button
          onClick={() => {
            dispatch({ type: RANDOM_BOARD });
          }}
        >
          Random
        </button>
      </ButtonContainer>
    </>
  );
};

export default Board;
