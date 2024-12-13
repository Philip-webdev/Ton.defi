
import 'react-icons/bs';
import styled from "styled-components";
 

 

const StyledApp = styled.div`
  background-color: #4B96FF;
  color: white;
font-family: Lexend ;
  border-radius:7px;
 margin: 0;
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

function Welcome2(){
  
    return(
    
        <StyledApp>

          
            
          <a href='#/' style={{ textDecoration:'none'}}> <div  style={{textAlign: 'center', marginTop:'50%'}}>Open</div></a>
        </StyledApp>
        
    )
}

export default Welcome2;