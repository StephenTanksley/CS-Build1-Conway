import styled from "styled-components";

export const Cell = styled.div`
  width: 20;
  height: 20;
  backgroundColor: grid[i][j] ? "black" : undefined;
  border: "1px solid black";
  borderRadius: ".1rem";
`;
