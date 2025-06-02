import 'react-icons/bs';
import styled from "styled-components";

 

 

const StyledApp = styled.div`
  background-color:green;
   
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


function Growtree(){
  const Loading = () => {
    return (
        <div className="loading">
            <Icon>Growtree</Icon>
            <div className="spinner"></div> {/* Optional spinner */}
        </div>
    );
};
  


    return(
    
        <StyledApp>

 
            
          <div  style={{textAlign: 'center', marginTop:'70%'}}><img src='' alt='growtreelogo' style={{ zoom:'50%' }}/><br></br>
          <br></br><br></br>{Loading()}</div>
         
        </StyledApp>
        
    )
}

export default Growtree;