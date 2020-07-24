import React, { createContext, useContext, useReducer } from "react";
import { newBoard } from "../helpers/newBoard";

const StoreContext = createContext();

const initialState = {
  generations: 0,
  grid: [newBoard()],
  running: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "RUNNING":
      return {
        ...state,
        // return the opposite of whatever the current state of running is.
        running: !state.running,
      };

    case "CLEAR":
      return {
        ...state,
        grid: newBoard(),
        generations: 0,
      };

    case "NEXT_GEN":
      return {
        ...state,
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
