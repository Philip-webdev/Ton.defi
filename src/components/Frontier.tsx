
import 'react-icons/bs';
import styled from "styled-components";
 

 

const StyledApp = styled.div`
  background-color: white;
  color: white;
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
    return(
    
        <StyledApp>

 
            
          <div  style={{textAlign: 'center', marginTop:'30%'}}><img src='https://i.imgur.com/Iz6I3ZJ.jpeg' style={{ zoom:'20%' }}/><br></br>
          {Loading()}</div>
         
        </StyledApp>
        
    )
}

export default Welcome;