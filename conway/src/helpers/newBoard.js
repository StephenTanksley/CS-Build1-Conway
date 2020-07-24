// pass size in to newBoard
export const newBoard = (props) => {
  const numCols = props;
  const rows = [];
  for (let i = 0; i < props; i++) {
    // we're pushing arrays of columns into our rows. Each individual item is
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};
