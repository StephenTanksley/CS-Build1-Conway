import { CellObj } from "../components/Cell";

// Creating a new blank board.
export const newCellBoard = (size) => {
  const rows = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const newCell = new CellObj(i, j, 0, false);
      rows.push(newCell);
    }
  }
  return rows;
};

// Creating a new random board.
export const randomCellBoard = (size) => {
  let rows = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const newCell = new CellObj(i, j, Math.random() > 0.5 ? 1 : 0, false);
      rows.push(newCell);
    }
  }
  return rows;
};

// This helper function can check a grid to see if an item exists
export const key_filter = (grid, i, j) => {
  let item_array = [];
  grid.filter(function (cell) {
    if (cell["row"] === i && cell["col"] === j) {
      item_array.push(cell);
    }
    return item_array;
  });
  console.log(item_array[0]);
};

// This provides us with an approach to grabbing all of the items and having access to props.
export const get_grid_items = (grid) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      key_filter(grid, i, j);
    }
  }
};

// actions for the reducer
export const ACTIONS = {
  RUNNING: "RUNNING",
  STOP_RUNNING: "STOP_RUNNING",
  NEXT_GEN: "NEXT_GEN",
  RANDOM_BOARD: "RANDOM_BOARD",
  UPDATE_BOARD: "UPDATE_BOARD",
  CLEAR: "CLEAR",
};
