import styled from "styled-components";

export const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => `${props.dimensions}px`};
  height: ${(props) => `${props.dimensions}px`};
  background: ${(props) => (props.alive ? "black" : "white")};
  border: 1px solid black;
  border-radius: 0.1rem;
`;

// creating a cell constructor.
export function CellObj(row, col, alive, active) {
  this.row = row;
  this.col = col;
  this.alive = alive;
  this.active = active;
}
