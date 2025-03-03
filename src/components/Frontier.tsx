
import {   useState } from 'react';
import 'react-icons/bs';
import styled from "styled-components";

 

 

const StyledApp = styled.div`
  background-color: black;
   
font-family: Lexend ;
  
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


function Welcome(){
  const Loading = () => {
    return (
        <div className="loading">
            <Icon>Loading...</Icon>
            <div className="spinner"></div> {/* Optional spinner */}
        </div>
    );
};
  


    return(
    
        <StyledApp>

 
            
          <div  style={{textAlign: 'center', marginTop:'70%'}}><img src='https://i.imgur.com/PZlLQcl.png' style={{ zoom:'100%' }}/><br></br>
          <br></br><br></br>{Loading()}</div>
         
        </StyledApp>
        
    )
}

export default Welcome;