import 'react-icons/bs';
import styled from "styled-components";

 

 

const StyledApp = styled.div`
  background-color: rgb(36, 172, 242);
   
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
  font-size: larger;
 
`;


function crowd(){
  const Loading = () => {
    return (
        <div className="loading">
            <Icon><h3   style={{textAlign: "center"}}>CryptoFund</h3></Icon><p style={{textAlign: "center", color:'white',fontSize:'smaller '}}>A web3 crowdfunding dApp</p>
            <div className="spinner"></div> {/* Optional spinner */}
        </div>
    );
};
  


    return(
    
        <StyledApp>

 
            
          <div  style={{textAlign: 'center', marginTop:'70%'}}><br></br>
          <br></br><br></br>{Loading()}</div>
         
        </StyledApp>
        
    )
}

export default crowd;