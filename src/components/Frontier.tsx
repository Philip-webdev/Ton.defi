
import 'react-icons/bs';
import styled from "styled-components";
 

 

const StyledApp = styled.div`
  background-color: #4B96FF;
  color: white;
font-family: Lexend ;
  border-radius:7px;
  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 90vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  width: 100%;
   background-color: #4B96FF;
  color: white;
font-family: Lexend ;
  border-radius:7px;
  margin: 0;
`;

function Welcome(){

    return(
      <div>
        <AppContainer>
        <div>
            <div  style={{textAlign: 'center'}}>TON.DEFI</div>
            <p style={{textAlign: 'center'}}><a href='#/home' style={{textDecoration:'none', color:'white'}}>Start</a></p>
            </div>
        </AppContainer>
        </div>
    )
}

export default Welcome;