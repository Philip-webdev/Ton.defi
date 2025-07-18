
import styled from "styled-components";
import '../index.css';
import { BsApp, BsArrowLeftCircle, BsCashStack, BsHouse, BsLightningCharge, BsShop, BsWallet2 } from "react-icons/bs";
import { Button } from "./styled/styled";
import FootNavig from "./footnavig";
 

const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
   zoom :100%;
    font-family: Lexend ;
  @media (prefers-color-scheme: dark) {
    background-color:  #F9F9F9;
   
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
   width: 100%;
  height:fit-content;
  margin: 0;
  font-family: Lexend ;
`;
const Icon = styled.div`
background-color: white;
   border-radius:7px; 
  
 @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
        color:grey;
  }
`;

function security(){
return(
    <StyledApp>
        <AppContainer>
        <a href='#/tools' style={{ textDecoration:'none'}}> <BsArrowLeftCircle style={{color:'#4B96FF', height:'20px', width:'20px'}}/> </a>
       
       <div><FootNavig/></div>
        </AppContainer>
    </StyledApp>
)
}

export default security;