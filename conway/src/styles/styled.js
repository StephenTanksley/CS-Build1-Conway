import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

export const GridContainer = styled.div`
  display: flex;
  width: "75vw,
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: grid;
  border: 1px solid green;
  grid-template-columns: ${(props) =>
    `repeat(${props.size}, (${props.width} + px))`};
`;

export const ButtonContainer = styled(Container)`
  flex-direction: row;
  padding: 1rem;
`;
