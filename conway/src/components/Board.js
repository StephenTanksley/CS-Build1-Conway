import React, { useEffect, useState, useCallback, useRef } from "react";
import { useStore } from "../state/store";
import {
  ACTIONS,
  key_filter,
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
  const [localGrid, setLocalGrid] = useState(() => {
    // return newCellBoard(size);
    return grid;
  });

  useEffect(() => {
    setLocalGrid(grid);
    console.log(grid);
  }, [grid]);

  const width = Math.round((window.innerWidth * 0.35) / size);
  // const toggle_life = () => {};

  // useEffect(() => {
  //   console.log("Hopefully this works: ", get_grid_items(localGrid));
  // }, []);

  key_filter(localGrid, 0, 1);
  key_filter(localGrid, 0, 2);
  key_filter(localGrid, 0, 3);
  key_filter(localGrid, 1, 1);
  key_filter(localGrid, 1, 3);
  key_filter(localGrid, 2, 1);
  key_filter(localGrid, 2, 2);
  key_filter(localGrid, 2, 3);

  // I want to iterate through the whole grid to find the living neighbors of each cell.
  const find_living_neighbors = (grid) => {
    for (let i = 0; i < grid.length; i++) {
      let neighborsCount = 0;
      let neighbors_arr = [];

      // this is the item we're looking to get all of the attributes from.
      const item = grid[i];

      const item_row = grid[i]["row"];
      const item_col = grid[i]["col"];

      console.log(item_row);
      console.log(item_col);

      // console.log(`row: ${item["row"]}, col: ${item["col"]}`);

      // if (item.alive) {

      // }

      // We want to look at this item's row and column information and then use that to find its neighbors.
      // We'll run a forEach on the grid to filter out all items which aren't within 1 of the x and y axis.
      // From that list, we'll check each item to see if it is currently alive.
      // If so, we'll add that to the neighborsCount.

      // localGrid.filter(function (cell) {
      //   neighbors.forEach(([x, y]) => {
      //     // We have to get the next values by taking our item's values and doing transformations on them.
      //     let new_x = item["row"] + x;
      //     let new_y = item["col"] + y;

      //     neighbors_arr.push(key_filter(cell, new_x, new_y));

      //     for (let i = 0; i < neighbors_arr.length; i++) {
      //       if (i.alive) {
      //         neighborsCount += 1;
      //       }
      //     }
      //   });
      // });

      // find_living_neighbors(localGrid);

      // We use this item's row and column information to search its neighbors.
      // We can probably use the key_filter function for this.
      // We want to add the results of a neighbor's "alive" attribute to neighborsCount.
      // console.log("alive ? : ", `(${item.row}, ${item.col}): ${item.alive}`);
      // neighbors.forEach(([x, y]) => {
      //   let current_x = item["row"] + x;
      //   let current_y = item["col"] + y;

      //   if (
      //     current_x >= 0 &&
      //     current_x < grid.length &&
      //     current_y >= 0 &&
      //     current_y < grid.length
      //   ) {
      //     neighborsCount += item[i].alive;
      //   }
      // });
    }
  };

  find_living_neighbors(localGrid);

  const { dispatch } = state;
  const { RUNNING, STOP_RUNNING, NEXT_GEN, RANDOM_BOARD, CLEAR } = ACTIONS;

  const generationsRef = useRef(generations);
  generationsRef.current = generations;

  const runningRef = useRef(running);
  runningRef.current = running;

  const handleCellClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log(e.currentTarget);
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
                row={cell.row}
                col={cell.col}
                onClick={() => {
                  {
                    /* this is how I will find the indexes of cells I need. */
                  }
                  console.log(localGrid.indexOf(cell));
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
          }}
        >
          {running ? "Stop" : "Start"}
        </button>

        {/* Clear button */}
        <button
          onClick={() => {
            dispatch({ type: CLEAR });
          }}
        >
          Clear
        </button>

        {/* Random container */}
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
