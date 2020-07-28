import { CellObj } from "../components/Cell";

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

// actions for the reducer
export const ACTIONS = {
  RUNNING: "RUNNING",
  STOP_RUNNING: "STOP_RUNNING",
  NEXT_GEN: "NEXT_GEN",
  RANDOM_BOARD: "RANDOM_BOARD",
  UPDATE_BOARD: "UPDATE_BOARD",
  CLEAR: "CLEAR",
};
