import styled from "styled-components";

const Canvas = () => {  
  return (
    <Main>
      <h1>Hi from the Canvas page!</h1>
    </Main>
  )
};

export default Canvas;

const Main = styled.main`
  display: flex;
  
  > h1 {
    margin: auto;
  }
`;
