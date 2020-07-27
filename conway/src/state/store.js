import React, { createContext, useContext, useReducer } from "react";
import { newCellBoard, randomCellBoard } from "../helpers/helpers";
import { ACTIONS } from "../helpers/helpers";

const {
  RUNNING,
  STOP_RUNNING,
  NEXT_GEN,
  RANDOM_BOARD,
  CLEAR,
  UPDATE_BOARD,
} = ACTIONS;

const StoreContext = createContext();

const initialState = {
  size: 15,
  speed: 1000,
  generations: 0,
  grid: newCellBoard(15),
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

    case CLEAR:
      return {
        ...state,
        grid: newCellBoard(state.size),
        generations: 0,
      };

    case NEXT_GEN:
      return {
        ...state,
        generations: state.generations + 1,
      };

    case RANDOM_BOARD:
      return {
        ...state,
        generations: 0,
        running: false,
        grid: randomCellBoard(state.size),
      };

    case UPDATE_BOARD:
      return {
        ...state,
        grid: payload,
        generations: state.generations + 1,
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
