import "../App.css";
import '../index.css';
import { TonConnectButton } from "@tonconnect/ui-react";
import { Jetton } from "../components/Jetton";
import { TransferTon } from "../components/TransferTon";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "../components/styled/styled";
import { useTonConnect } from "../hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import { BsHouse, BsWallet2,  BsLightningCharge, BsCashStack, BsQrCodeScan, BsCopy, BsApp } from "react-icons/bs";
import { TransferBTC } from "./transferBTC";
import { TransferETH } from "./transferETH";
import { TransferSOL } from "./transferSOL";
import Usdt from "./USDT";    
import   { useState } from 'react';
import { TupleReader } from "ton-core";
import QRScanner from "./QRcode";
import FootNavig from "./footnavig";

const StyledApp = styled.div`
  background-color:  #F9F9F9;
  color: black;
  font-family: Lexend;
  @media (prefers-color-scheme: dark) {
     background-color: rgb(33,33,33);
      color: white ;
  }
  min-height: 250vh;
  padding:40px 40px;
  margin:0;
  
   zoom :100%;
`;

const AppContainer = styled.div`
  
  margin: 0;
`;
const Icon = styled.div`
background-color: white;
   
  
 @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
        color:grey;
  }
`;
 


const dropdown = () => {
   
  const section = document.getElementById('ton') as HTMLElement | null;

  if (section != null && section.style.display == 'block') {
      section.style.display = 'none'; 
  } else if(section != null) {
    section.style.display = 'block';
  }
};
 
const dropdown2 = () => {
   
  const section = document.getElementById('jetton') as HTMLElement | null;

  if (section != null && section.style.display == 'block') {
      section.style.display = 'none'; 
  } else if(section != null) {
    section.style.display = 'block';
  }
};

const dropdown3 = () => {
   
  const section = document.getElementById('btc') as HTMLElement | null;

  if (section != null && section.style.display == 'block') {
      section.style.display = 'none'; 
  } else if(section != null) {
    section.style.display = 'block';
  }
};

const dropdown4 = () => {
   
  const section = document.getElementById('sol') as HTMLElement | null;

  if (section != null && section.style.display == 'block') {
      section.style.display = 'none'; 
  } else if(section != null) {
    section.style.display = 'block';
  }
};

const dropdown5 = () => {
   
  const section = document.getElementById('eth') as HTMLElement | null;

  if (section != null && section.style.display == 'block') {
      section.style.display = 'none'; 
  } else if(section != null) {
    section.style.display = 'block';
  }
};

 function sendCoin() {
  

  const { network } = useTonConnect();

  return (
    <StyledApp >

      <AppContainer>
      
        <FlexBoxCol>
          <FlexBoxRow>
            
            <Button>
              {network
                ? network === CHAIN.MAINNET
                  ? "mainnet"
                  : "testnet"
                : "N/A"}
            </Button>
            <TonConnectButton />
            <Button  ><a href="#/scan" style={{color:'white'}}><BsQrCodeScan/></a></Button>
          </FlexBoxRow>
          <div style={{justifyContent:"space-evenly"}}>
         <div onClick={dropdown} style={{cursor:'pointer', left:'0'}}><Icon style={{borderRadius:'7px', width:'90%', padding:'20px',  lineHeight:'17px', margin:'7px', fontSize:'larger'}}><img src="https://i.imgur.com/JlK5oxR.png" height='15px' width='15px'/> TON</Icon></div> 
          <div id='ton' style={{display:'none'}}>
          <TransferTon />
          </div>
          <div onClick={dropdown3} style={{cursor:'pointer'}}><Icon style={{borderRadius:'7px', width:'90%', padding:'20px',  lineHeight:'17px',  margin:'7px',fontSize:'larger'}}><img src="https://i.imgur.com/sSYmdfQ.png" height='15px' width='15px'/> BTC</Icon></div> 
          <div id='btc' style={{display:'none'}}>
          <TransferBTC />
          </div>
          <div onClick={dropdown4} style={{cursor:'pointer'}}><Icon style={{borderRadius:'7px', width:'90%', padding:'20px',  lineHeight:'17px',  margin:'7px',fontSize:'larger'}}><img src="https://i.imgur.com/rjWW55s.png" height='15px' width='15px'/> SOL</Icon></div> 
          <div id='sol' style={{display:'none'}}>
          <TransferSOL />
          </div>
          <div onClick={dropdown5} style={{cursor:'pointer'}}><Icon style={{borderRadius:'7px', width:'90%', padding:'20px',  lineHeight:'17px',  margin:'7px',fontSize:'larger'}}><img src="https://i.imgur.com/dhJjQcO.png" height='15px' width='15px'/> ETH</Icon></div> 
          <div id='eth' style={{display:'none'}}>
          <TransferETH />
          </div>
          <div onClick={dropdown2} style={{cursor:'pointer'}}><Icon style={{borderRadius:'7px', margin:'7px', width:'90%', padding:'20px',  fontSize:'larger'}} ><img src="https://i.imgur.com/JlK5oxR.png" height='15px' width='15px'/> Jetton</Icon></div>
          <div id='jetton' style={{display:'none'}}>
          <Jetton />
          </div>
          <div>
          <Usdt/>
          </div>
          </div>
        </FlexBoxCol>
          
    
  

        <div><FootNavig/></div>
      </AppContainer>
    </StyledApp>
  );
}

export default sendCoin;
