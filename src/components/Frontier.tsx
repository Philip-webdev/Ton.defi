
import 'react-icons/bs';
import styled from "styled-components";

 

 

const StyledApp = styled.div`
  background: black;

    background-size:cover;
font-family: Lexend ;
  @media (prefers-color-scheme: dark) {
    
        color:white;
  }
 margin: 0;
  min-height: 100vh;
  padding: 20px 20px;
`;
const Icon = styled.div`
color:white;
 border-radius:7px;  
  
 
`;


function Welcome(){
  const Loading = () => {
    return (
        <div className="loading" >
            <Icon>Loading...</Icon>
            <div className="spinner"></div> {/* Optional spinner */}
        </div>
    );
};
  


    return(
    
        <StyledApp>

 
            
          <div  style={{textAlign: 'center', marginTop:'50%'}}><img src='https://i.imgur.com/ySoWviB.png' style={{ zoom:'50%' }}/><br></br>
          <br></br><br></br>{Loading()}</div>
         
        </StyledApp>
        
    )
}

export default Welcome;