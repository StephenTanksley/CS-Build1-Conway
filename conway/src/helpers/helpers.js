// // pass size in to newBoard
export const newBoard = (props) => {
  const numCols = props;
  const rows = [];
  for (let i = 0; i < props; i++) {
    // we're pushing arrays of columns into our rows. Each individual item is created and given a value of 0.
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

// // Essentially the same as a new board, but we're randomly assigning either a 0 or a 1 to each cell.
export const randomBoard = (props) => {
  const rows = [];
  for (let i = 0; i < props; i++) {
    rows.push(Array.from(Array(props), () => (Math.random() > 0.5 ? 1 : 0)));
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