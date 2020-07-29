import React, { createContext, useContext, useReducer } from "react";
import { newCellBoard, randomCellBoard } from "../helpers/helpers";
import { ACTIONS } from "../helpers/helpers";

// destructuring ACTIONS
const {
  RUNNING,
  STOP_RUNNING,
  NEXT_GEN,
  RANDOM_BOARD,
  CLEAR,
  UPDATE_BOARD,
} = ACTIONS;

// setting up the context for our global store.
const StoreContext = createContext();

const initialState = {
  size: 5,
  speed: 1000,
  generations: 0,
  grid: newCellBoard(5),
  // grid: randomCellBoard(15),
  running: false,
};

const reducer = (state, action, payload) => {
  switch (action.type) {
    case RUNNING:
      return {
        ...state,
        // return the opposite of whatever the current state of running is.
        running: !state.running,
      };

    case STOP_RUNNING:
      return {
        ...state,
        // returns the state of running as false.
        running: false,
      };

    case NEXT_GEN:
      return {
        ...state,
        generations: state.generations + 1,
      };

    case CLEAR:
      return {
        ...state,
        grid: newCellBoard(state.size),
        generations: 0,
      };

    case RANDOM_BOARD:
      return {
        ...state,
        generations: 0,
        running: false,
        // we get a board as a result of calling a function.
        grid: randomCellBoard(state.size),
      };

    case UPDATE_BOARD:
      return {
        ...state,
        // we get a board as a result of our changes to the board.
        // This should theoretically update our state and then force a re-render of our board.
        // The goal here is to push changes to global state and then to have that determine the view we see.
        grid: state.grid,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
