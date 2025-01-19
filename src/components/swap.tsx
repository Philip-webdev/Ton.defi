 
  import { useState } from 'react';
 
import '../index.css';
import styled from "styled-components";
import { Button } from "./styled/styled";
import 'react-icons/bs';
import 'react-icons/fa';
import { Helmet } from 'react-helmet';
 
import   { Web3 } from 'web3';
import { BsHouse, BsWallet2, BsShop, BsLightningCharge } from 'react-icons/bs';

const StyledApp = styled.div`
  background-color:  #F9F9F9;
  color: black;
  font-family: Lexend;
  @media (prefers-color-scheme: dark) {
     background-color: rgb(33,33,33);
      color: white ;
  }
  min-height: 110vh;
  padding: 20px 20px;
`;
const ExPanel = styled.div`
background-color: white;
 color:black;
 @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
       color:grey;
  }
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
  font-family: Lexend ;
`;

function swap(){
   const [Count, setCountcalculated] = useState('');



let currentPrice: '2'; 

function ondatainput(){

    const inputElement = document.getElementById('input-number') as HTMLInputElement; // Cast to HTMLInputElement
    if (inputElement) {
        const inputValue = inputElement.value; 
 
        setCountcalculated(inputValue );
         
    } else {
        console.error('Input element not found');
    }
    
}
 
      
    return(
        <StyledApp><Helmet><script src="https://cdn.jsdelivr.net/npm/web3@1.6.0/dist/web3.min.js"></script></Helmet>
            <AppContainer>
<ExPanel><div style={{display: 'flex'  , gap:'17px',padding:'20px',  borderRadius:'10px'}}>
  <img src='https://i.imgur.com/w8vihMp.png'  height='20px' width='20px' style={{borderRadius:'100%'}}/><div><a href='https://app.zap.africa/' style={{ textDecoration:'none'}}>Zap Exchange</a></div></div></ExPanel>

<br/>

<ExPanel><div style={{display: 'flex'  , gap:'17px',padding:'20px',  borderRadius:'10px'}}>
  <img src='https://i.imgur.com/w8vihMp.png'  height='20px' width='20px' style={{borderRadius:'100%'}}/>
  <div><a href='#/ethEx' style={{ textDecoration:'none'}}>Ton.defi Exchange</a></div></div></ExPanel>

<br/>



 
                
   <Icon className="nav" style={{right:'0.1%', bottom:'0%', display:'flex',justifyContent:'space-evenly' ,height:'fit-content',  width:'100%', paddingBottom:'10px', paddingRight:'10px',position:'fixed' }}>
              <a href='#/' style={{color:'grey', textDecoration:'none'}}> 
              <Button  style={{  fontFamily: 'Lexend' ,  marginLeft:'20px',bottom:'0%', marginRight:'20px', background:'none', color:"grey"}}><BsHouse/>{/*<img src='https://i.imgur.com/uxozY7V.png' height='14px' width='14px' />*/}
              <p style={{zoom:'100%'}}>Home</p> </Button></a>
               <a href='#/send' style={{color:'grey', textDecoration:'none'}}> <Button  style={{  fontFamily: 'Lexend' ,bottom:'0%', marginRight:'20px', background:'none', color:"grey"}}><BsWallet2/>{/*<img src="https://i.imgur.com/hCrmXO1.png" height='14px' width='14px'/> */}
              <p style={{zoom:'100%'}}>Wallet</p></Button></a>
              <a href='#/market' style={{color:'grey', textDecoration:'none'}}>  <Button style={{  fontFamily: 'Lexend' ,bottom:'0%', marginRight:'20px', background:'none', color:"grey"}}><BsShop/> {/*<img src="https://i.imgur.com/loOhRv0.png" height='14px' width='14px' /> */}
                <p style={{zoom:'100%'}}>Market</p></Button></a> 
                <a href='#/discover' style={{color:'grey', textDecoration:'none'}}>
                <Button  style={{ fontFamily: 'Lexend' ,bottom:'0%', background:'none', color:"grey"}}><BsLightningCharge/>{/*<img src='https://i.imgur.com/S444rBc.png'height='14px' width='14px'/>*/}
                <p style={{zoom:'100%'}}>Discover</p> </Button></a>
              </Icon> 
            </AppContainer>
        </StyledApp>
    )
}

export default swap;

