import React, { useState, useCallback, useRef } from "react";
import { useStore } from "../state/store";
import { ACTIONS } from "../helpers/helpers";
import { newBoard } from "../helpers/helpers.js";
import { neighbors } from "../helpers/neighbors";
import { Cell } from "./Cell";
import { Container } from "../styles/styled";
import produce from "immer";

import "./Board.css";

// This is our gameboard component. The gameboard creates the pattern of cells for our simulation.
const Board = () => {
  const state = useStore();
  const { size, running, generations, speed } = state.state;

  console.log(state.state);

  const [localGrid, setLocalGrid] = useState(() => {
    return newBoard(size);
  });

  console.log(localGrid);
  const { dispatch } = state;
  const { RUNNING, STOP_RUNNING, NEXT_GEN, RANDOM_BOARD, CLEAR } = ACTIONS;

  // console.log(dispatch);
  // console.log(size);
  // console.log(grid);

  const generationsRef = useRef(generations);
  generationsRef.current = generations;
  // console.log(generationsRef);

  const runningRef = useRef(running);
  runningRef.current = running;
  // console.log(runningRef);

  const runSimulation = useCallback(() => {
    dispatch({ type: NEXT_GEN });
    if (!runningRef.current) {
      return;
    }

    setLocalGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < size; i++) {
          for (let k = 0; k < size; k++) {
            let neighborCount = 0;
            neighbors.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < size && newK >= 0 && newK < size) {
                neighborCount += g[newI][newK];
              }
            });

            if (neighborCount < 2 || neighborCount > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighborCount === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, speed);
  }, [size]);

  return (
    <>
      <Container>
        <p>Hi</p>
        <Container>
          <button
            onClick={() => {
              dispatch({ type: RUNNING });
              if (!running) {
                runningRef.current = true;
                runSimulation();
              }
            }}
          >
            {running ? "Stop" : "Start"}
          </button>
          <button
            onClick={() => {
              dispatch({ type: RANDOM_BOARD });
            }}
          >
            Random
          </button>
          <button
            onClick={() => {
              dispatch({ type: CLEAR });
            }}
          >
            Clear
          </button>
        </Container>
        {/* generations container */}
        <Container>
          <div>Generations: {generations}</div>
        </Container>
        {/* Grid container. I want to refactor this to allow dynamic sizing of cells. */}
        {/* I want to refactor this to be a styled component. */}
        <Container>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${size}, 20px)`,
            }}
          >
            {localGrid.map((rows, i) =>
              rows.map((col, j) => (
                <Cell
                  onClick={() => {
                    const updateGrid = produce(localGrid, (gridCopy) => {
                      gridCopy[i][j] = localGrid[i][j] ? 0 : 1;
                    });
                    setLocalGrid(updateGrid);
                  }}
                  key={`${i}-${j}`}
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: localGrid[i][j] ? "black" : undefined,
                    border: "1px solid black",
                    borderRadius: ".1rem",
                  }}
                />
              ))
            )}
          </div>
        </Container>
      </Container>
    </>
  );
};

export default Board;
