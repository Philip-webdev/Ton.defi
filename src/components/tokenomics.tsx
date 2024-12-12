
import styled from "styled-components";
import '../index.css';

const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  border-radius: 17px;
    position:  ;
    font-family: Lexend ;
  @media (prefers-color-scheme: dark) {
    background-color: rgb(29, 40, 58);
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
   width: 100%;
  height:fit-content;
  margin: 0;
  font-family: Lexend ;
`;

function tokenomics(){
return(
    <StyledApp>
        <AppContainer>
           
        </AppContainer>
    </StyledApp>
)
}

export default tokenomics;