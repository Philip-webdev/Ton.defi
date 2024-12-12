
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
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  width: 100%;
   background-color: #4B96FF;
  color: white;
font-family: Lexend ;
  border-radius:7px;
  height: 100vh;
  margin: 0;
`;

function Welcome(){

    return(
    
        <AppContainer>

          <p style={{textAlign: 'center',marginTop:'0%'}}>TON.DEFI</p>
            <p style={{textAlign: 'center', marginTop:'50%'}}><a href='#/home' style={{textDecoration:'none', color:'white'}}>Start</a></p>
          
        </AppContainer>
        
    )
}

export default Welcome;