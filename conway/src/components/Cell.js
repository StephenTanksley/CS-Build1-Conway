import styled from "styled-components";

export const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => `${props.dimensions}px`};
  height: ${(props) => `${props.dimensions}px`};
  background: ${(props) => (props.alive ? "blue" : "white")};
  border: 1px solid #b8b8b8;
`;

// creating a cell constructor.
export function CellObj(row, col, alive, active) {
  this.row = row;
  this.col = col;
  this.alive = alive;
}
