import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "./styled/styled";
import '../index.css';
import { BsHouse, BsWallet2, BsShop, BsLightningCharge, BsCashStack, BsCashCoin, BsCash, BsApp } from "react-icons/bs";
import FootNavig from "./footnavig";


const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  margin: 0;
  font-family: 'Sora', sans-serif;
  @media (prefers-color-scheme: dark) {
    background-color: rgb(15,15,15);
    color: white;
  }
  min-height: 100vh;
  padding: 20px;
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
  font-family: 'Sora', sans-serif ;
`;
function market() {
   
  
return(
    <StyledApp>
    <AppContainer>
    <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', color: 'inherit' }}>Earn</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderRadius: '12px' }}>
<ExPanel style={{ display: 'flex', gap: '14px', padding: '16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.06)' }}><a href='#/stake' style={{ color: 'inherit', textDecoration: 'none', fontSize: '14px', fontWeight: 500, padding: '4px 0' }}>DeFi staking</a></ExPanel>
  <ExPanel style={{ display: 'flex', gap: '14px', padding: '16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.06)' }}><a href="#/pin" style={{ color: 'inherit', textDecoration: 'none', fontSize: '14px', fontWeight: 500, padding: '4px 0' }}>DePIN</a></ExPanel>
  <ExPanel style={{ display: 'flex', gap: '14px', padding: '16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.06)' }}><a href="#/rwa" style={{ color: 'inherit', textDecoration: 'none', fontSize: '14px', fontWeight: 500, padding: '4px 0' }}>RWA</a></ExPanel>
        </div>
         <div><FootNavig/></div>
    </AppContainer></StyledApp>
)
}
export default market;
