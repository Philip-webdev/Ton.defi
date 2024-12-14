
import 'react-icons/bs';
import styled from "styled-components";
 

 

const StyledApp = styled.div`
  background-color: #87CEEB;
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

function Welcome(){
  const Loading = () => {
    return (
        <div className="loading">
            <h2>Loading...</h2>
            <div className="spinner"></div> {/* Optional spinner */}
        </div>
    );
};
    return(
    
        <StyledApp>

          <p style={{textAlign: 'center',marginTop:'0%'}}>TON.DEFI</p>
            
          <div  style={{textAlign: 'center', marginTop:'50%'}}>{Loading()}</div>
        </StyledApp>
        
    )
}

export default Welcome;