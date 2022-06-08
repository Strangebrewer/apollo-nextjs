import styled from "styled-components";

const Dashboard = () => {  
  return (
    <Main>
      <h1>Hi from the Dashboard!</h1>
    </Main>
  )
};

export default Dashboard;

const Main = styled.main`
  display: flex;
  
  > h1 {
    margin: auto;
  }
`;
