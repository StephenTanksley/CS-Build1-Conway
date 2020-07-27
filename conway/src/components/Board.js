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

  const specific_key = localGrid.filter(function (cell, i) {
    return cell["row"] === 4 && cell["col"] === 3;
  });

  console.log("specific key: ", specific_key);

  const positionInGrid = [localGrid[15]["row"], localGrid[15]["col"]];
  console.log(positionInGrid);

  const width = Math.round((window.innerWidth * 0.35) / size);
  console.log(width);

  console.log("local grid: ", localGrid[15]);

  // const updateGrid = useCallback((grid) => {
  //   if (!runningRef.current) {
  //         return;
  //   }
  //   setLocalGrid((localGrid) => {
  //     return produce(localGrid, (gridCopy) => {
  //       for (let i = 0; i < localGrid.length; i++){
  //         for (let j = 0; j < localGrid.length; j++){
  //           We look here into the current value of
  //           const current_row = localGrid[i]['row']
  //           const current_col = localGrid[i]['col']

  //           let neighborsCount = 0;
  //           localGrid.forEach(([x, y]) => {
  //             const current_i = current_row + x;
  //             const current_j = current_col + y;

  //           })
  //         }
  //       }
  //     })
  //   })
  // });

  useEffect(() => {
    if (size) {
      const rando = randomCellBoard(size);
      console.log(`random cell board of size ${size} : `, rando);
    }
  }, [size]);

  const { dispatch } = state;
  const { RUNNING, STOP_RUNNING, NEXT_GEN, RANDOM_BOARD, CLEAR } = ACTIONS;

  const generationsRef = useRef(generations);
  generationsRef.current = generations;

  const runningRef = useRef(running);
  runningRef.current = running;

  // const runSimulation = useCallback(() => {
  //   dispatch({ type: NEXT_GEN });
  //   if (!runningRef.current) {
  //     return;
  //   }

  //   setLocalGrid((g) => {
  //     return produce(g, (gridCopy) => {
  //       console.log("value of g: ", g);
  //       for (let i = 0; i < size; i++) {
  //         for (let k = 0; k < size; k++) {
  //           let neighborCount = 0;
  //           neighbors.forEach(([x, y]) => {
  //             const newI = i + x;
  //             const newK = k + y;
  //             if (newI >= 0 && newI < size && newK >= 0 && newK < size) {
  //               neighborCount += g[newI][newK];
  //             }
  //           });

  //           if (neighborCount < 2 || neighborCount > 3) {
  //             gridCopy[i][k] = 0;
  //           } else if (g[i][k] === 0 && neighborCount === 3) {
  //             gridCopy[i][k] = 1;
  //           }
  //         }
  //       }
  //     });
  //   });

  //   setTimeout(runSimulation, speed);
  // }, []);

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
        <button>Random</button>
      </ButtonContainer>
    </>
  );
};

export default Board;
