
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

 
            
          <div  style={{translate:'-50% -50%', top:'50%', left:'50%', position:'absolute', textAlign:'center', color:'white', fontSize:'20px'}}>
            <img src='https://i.imgur.com/ySoWviB.png' style={{ zoom:'70%' }}/>{Loading()}</div>
         
        </StyledApp>
        
    )
}

export default Welcome;