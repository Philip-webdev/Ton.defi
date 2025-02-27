import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "./styled/styled";
import '../index.css';
import { BsHouse, BsWallet2, BsShop, BsLightningCharge, BsCashStack, BsCashCoin, BsCash } from "react-icons/bs";
  


const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  margin:0;
font-family: Lexend;
  border-radius:7px;
   @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
      color: white ;
  }
   min-height: 100vh;
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
function market() {
   
  
return(
    <StyledApp>
    <AppContainer>
    <h3>Earn</h3>
        <div style={{  justifyContent:'space-around',    borderRadius:'10px'}}>
<ExPanel style={{display: 'flex'  , gap:'17px',padding:'20px', borderColor:'whitesmoke', borderBottomStyle:'groove', borderWidth:'1px', borderRadius:'10px'}}><div style={{marginLeft:'7px'}}><a href="https://exchange.mercuryo.io/" style={{color:'grey', textDecoration:'none'}}>DeFi Lending</a></div></ExPanel>
  <ExPanel  style={{display: 'flex'  , gap:'17px',padding:'20px', borderColor:'whitesmoke', borderBottomStyle:'groove', borderWidth:'1px', borderRadius:'10px'}}><div  style={{marginLeft:'7px'}}><a href="https://global.transak.com/" style={{color:'grey', textDecoration:'none'}}>Invest in RWAs</a></div></ExPanel>
  <ExPanel  style={{display: 'flex'  , gap:'17px',padding:'20px', borderColor:'whitesmoke', borderBottomStyle:'groove', borderWidth:'1px', borderRadius:'10px'}}><div  style={{marginLeft:'7px'}}><a href="https://ramp.alchemypay.org/#/index" style={{color:'grey', textDecoration:'none'}}>Invest in NEXR</a></div></ExPanel>

  
  </div>
         <Icon className="nav" style={{left:'0', right:'0', bottom:'0%', display:'flex',justifyContent:'space-evenly' ,height:'fit-content',  width:'100%', paddingBottom:'10px', paddingRight:'10px',position:'fixed' }}>
                                              <a href='#/home' style={{color:'grey', textDecoration:'none'}}> 
                                              <Button  style={{  fontFamily: 'Lexend' , bottom:'0%',  background:'none', color:"grey"}}><BsHouse/>{/*<img src='https://i.imgur.com/uxozY7V.png' height='14px' width='14px' />*/}
                                              <p style={{zoom:'100%'}}>Home</p> </Button></a>
                                               <a href='#/send' style={{color:'grey', textDecoration:'none'}}> <Button  style={{  fontFamily: 'Lexend' ,bottom:'0%',  background:'none', color:"grey"}}><BsWallet2/>{/*<img src="https://i.imgur.com/hCrmXO1.png" height='14px' width='14px'/> */}
                                              <p style={{zoom:'100%'}}>Wallet</p></Button></a>
                                              <a href='#/market' style={{color:'grey', textDecoration:'none'}}>  <Button style={{  fontFamily: 'Lexend' ,bottom:'0%',  background:'none', color:"grey"}}><BsCashStack/> {/*<img src="https://i.imgur.com/loOhRv0.png" height='14px' width='14px' /> */}
                                                <p style={{zoom:'100%'}}>Finance</p></Button></a> 
                                                <a href='#/discover' style={{color:'grey', textDecoration:'none'}}>
                                                <Button  style={{ fontFamily: 'Lexend' ,bottom:'0%', background:'none', color:"grey"}}><BsLightningCharge/>{/*<img src='https://i.imgur.com/S444rBc.png'height='14px' width='14px'/>*/}
                                                <p style={{zoom:'100%'}}>Discover</p> </Button></a>
                                              </Icon> 
    </AppContainer></StyledApp>
)
}
export default market;
