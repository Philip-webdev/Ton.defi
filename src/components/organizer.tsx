
import styled from "styled-components";
import '../index.css';
import { BsApp, BsArrowLeftCircle, BsCashStack, BsHouse, BsLightningCharge, BsShop, BsWallet2 } from "react-icons/bs";
import { Button } from "./styled/styled";
import FootNavig from "./footnavig";
 

const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  border-radius: 17px;
     
    font-family: 'Sora', sans-serif ;
  @media (prefers-color-scheme: dark) {
    background-color:  #F9F9F9;
   
  }
  min-height: 100vh;
  padding: 20px 20px;
   
`;
const Icon = styled.div`
background-color: white;
   border-radius:7px; 
  
 @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
        color:grey;
  }
`;

const AppContainer = styled.div`
   width: 100%;
  height:fit-content;
  margin: 0;
  font-family: 'Sora', sans-serif ;
`;

function organizer(){
return(
    <StyledApp>
        <AppContainer>
      
       
       <div><FootNavig/></div>
        </AppContainer>
    </StyledApp>
)
}

export default organizer;