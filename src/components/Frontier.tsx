
import { useEffect, useState } from 'react';
import 'react-icons/bs';
import styled from "styled-components";
import UserLogin from './loginPage';
import Home from './home';
 

 

const StyledApp = styled.div`
  background-color: black;
   
font-family: Lexend ;
  border-radius:7px;
 margin: 0;
  min-height: 100vh;
  padding: 20px 20px;
`;
const Icon = styled.div`
color:black;
 border-radius:7px;  
  
 @media (prefers-color-scheme: dark) {
    
        color:white;
  }
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
  const Loading = () => {
    return (
        <div className="loading">
            <Icon>Loading...</Icon>
            <div className="spinner"></div> {/* Optional spinner */}
        </div>
    );
};
   const [processing, setProcessing] = useState(true);

  //  useEffect(() => {

  //      const timer = setTimeout(() => {
  //          setProcessing(false);
  //      }, 5000);

  //      return () => clearTimeout(timer); 
  //  }, []);

   if (!processing) {
     return <Home/>;
   }


    return(
    
        <StyledApp>

 
            
          <div  style={{textAlign: 'center', marginTop:'70%'}}><img src='https://i.imgur.com/PZlLQcl.png' style={{ zoom:'100%' }}/><br></br>
          <br></br><br></br>{Loading()}</div>
         
        </StyledApp>
        
    )
}

export default Welcome;