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

// update function

// export const updateBoard = (props) => {};

/* 
----UPDATE FUNCTION ----

U - The update function needs to run at a specified interval. It needs to check to ensure that the program is conforming to the rules of Conway's Game of Life. It then needs to spread in a copy of the current state and update it in accordance with those rules and then set the new state to be equal to the updated version.

P - 


*/

// const update = useCallback((grid) => {
//     if (!runningRef.current) {
//       return;
//     }
//       return produce(grid, (gridCopy) => {
//         for (let i = 0; i < size; i++) {
//           for (let j = 0; j < size; j++) {
//             // this is the total number of neighbors each cell has currently.
//             let neighborsCount = 0;
//             neighbors.forEach(([x, y]) => {
//               // We want to set the value of our indexes based on the current position in the grid AND our place in the loop.
//               const current_I = i + x;
//               const current_J = j + y;

//               // if the new index is more than 0 (contained within the array) and is less than the total length of the array
//               if (
//                 current_I >= 0 &&
//                 current_I < size &&
//                 current_J >= 0 &&
//                 current_J < size
//               ) {
//                 neighborsCount += grid[current_I][current_J];
//               }
//             });

//             // setting the conditions for cells dying.
//             if (neighborsCount < 2 || neighborsCount > 3) {
//               gridCopy[i][j] = 0;
//             }

//             // setting the conditions for cells being born
//             else if (grid[i][j] === 0 && neighborsCount === 3) {
//               gridCopy[i][j] = 1;
//             }
//           }
//         }
//       });
//     });
//     setTimeout(update, 60);
//   }, [])

// };

// actions for the reducer
export const ACTIONS = {
  RUNNING: "RUNNING",
  STOP_RUNNING: "STOP_RUNNING",
  NEXT_GEN: "NEXT_GEN",
  RANDOM_BOARD: "RANDOM_BOARD",
  UPDATE_BOARD: "UPDATE_BOARD",
  CLEAR: "CLEAR",
};
