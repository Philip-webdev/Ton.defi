import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "./styled/styled";
import '../index.css';
import { BsHouse, BsWallet2, BsShop, BsLightningCharge, BsCashStack, BsCashCoin, BsCash, BsApp } from "react-icons/bs";
import  Growtree from  "./Growfront";
import FootNavig from "./footnavig";

const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  margin:0;
font-family: Lexend;
 zoom :100%;
   @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
      color: white ;
  }
    min-height: 250vh;
  ;
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
const ExPanel = styled.div`
background-color: white;
 color:black;
 @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
       color:grey;
  }
`;
const AppContainer = styled.div`
   width: 100%;
  height:fit-content;
  margin: 0;
  font-family: Lexend ;
`;
function RWA() {
   const [loading, setLoading] = useState(true);
   
     useEffect(() => {
         const timer = setTimeout(() => {
             setLoading(false);
         }, 3000);
         return () => clearTimeout(timer);
     }, []);
   
    if (loading) {
        return <Growtree/>;
   
      }
  
return(
    <StyledApp>
    <AppContainer>
    <h3>Real World Assets</h3>
        <div style={{  justifyContent:'space-around',    borderRadius:'10px'}}>
<ExPanel style={{display: 'flex'  , gap:'17px',padding:'20px', borderColor:'whitesmoke', borderBottomStyle:'groove', borderWidth:'1px', borderRadius:'10px'}}><div style={{marginLeft:'7px'}}><a href='#/Agro' style={{color:'grey', textDecoration:'none'}}>Agro-tech</a></div></ExPanel>
  <ExPanel  style={{display: 'flex'  , gap:'17px',padding:'20px', borderColor:'whitesmoke', borderBottomStyle:'groove', borderWidth:'1px', borderRadius:'10px'}}><div  style={{marginLeft:'7px'}}><a href="/#" style={{color:'grey', textDecoration:'none'}}>Real Estate</a></div></ExPanel>
  <ExPanel  style={{display: 'flex'  , gap:'17px',padding:'20px', borderColor:'whitesmoke', borderBottomStyle:'groove', borderWidth:'1px', borderRadius:'10px'}}><div  style={{marginLeft:'7px'}}><a href="/#" style={{color:'grey', textDecoration:'none'}}>Machinery</a></div></ExPanel>
 
  
  </div>
           <div><FootNavig/></div>
    </AppContainer></StyledApp>
)
}
export default RWA;
