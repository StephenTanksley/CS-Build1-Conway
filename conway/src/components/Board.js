import React, { useEffect, useCallback, useRef } from "react";
import { useStore } from "../state/store";
import {
  ACTIONS,
  index_filter,
  get_grid_items,
  randomCellBoard,
} from "../helpers/helpers";
import { neighbors } from "../helpers/neighbors";
import { Cell } from "./Cell";
import { ButtonContainer, Container } from "../styles/styled";
import produce from "immer";
import "./Board.css";

// This is our gameboard component. The gameboard creates the pattern of cells for our simulation.
const Board = () => {
  const state = useStore();
  const { size, running, generations, grid } = state.state;
  const { dispatch } = state;
  const width = Math.round((window.innerWidth * 0.36) / size);
  const {
    RUNNING,
    STOP_RUNNING,
    NEXT_GEN,
    RANDOM_BOARD,
    UPDATE_BOARD,
    CLEAR,
  } = ACTIONS;

  const generationsRef = useRef(generations);
  generationsRef.current = generations;

  const gridRef = useRef(grid);
  gridRef.current = grid;

  const runningRef = useRef(running);
  runningRef.current = running;

  useEffect(() => {
    console.log("current grid ref: ", gridRef.current);
  }, [grid]);

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
            border: "1px solid LightGray",
            gridTemplateColumns: `repeat(${size}, ${width}px)`,
          }}
        >
          {grid.map((cell, i) => {
            return (
              <Cell
                dimensions={width}
                size={size}
                key={`${cell.row}-${cell.col}`}
                className={cell.alive ? "alive" : "dead"}
                alive={cell.alive}
                active={cell.active}
                onClick={() => {
                  const newCell = produce(grid, (draft) => {
                    draft[i]["alive"] = grid[i]["alive"] ? 0 : 1;
                  });
                  if (newCell) {
                    dispatch({ type: UPDATE_BOARD, payload: newCell });
                    console.log(grid);
                    console.log(cell);
                  }
                }}
              />
            );
          })}
        </div>
      </Container>

      <ButtonContainer>
        {/* Start button */}
        <button
          onClick={() => {
            dispatch({ type: RUNNING });
            console.log("Is the sim running? ", runningRef.current);
          }}
        >
          {running ? "Stop" : "Start"}
        </button>

        {/* Clear button */}
        <button
          onClick={() => {
            dispatch({ type: CLEAR });
            // console.log("show me the cleared board: ", grid);
          }}
        >
          Clear
        </button>

        {/* Random container */}
        <button
          onClick={() => {
            dispatch({ type: RANDOM_BOARD });
            // console.log("show me the random board: ", grid);
          }}
        >
          Random
        </button>
      </ButtonContainer>
    </>
  );
};

export default Board;
