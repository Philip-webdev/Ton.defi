import "../App.css";
import '../index.css';
import { TonConnectButton } from "@tonconnect/ui-react";
import { Jetton } from "../components/Jetton";
import { TransferTon } from "../components/TransferTon";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow, Input, Card} from "../components/styled/styled";
import { useTonConnect } from "../hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import { BsHouse, BsWallet2, BsShop, BsLightningCharge, BsCashStack } from "react-icons/bs";
import { TransferBTC } from "./transferBTC";
import { TransferETH } from "./transferETH";
import { TransferSOL } from "./transferSOL";
import Usdt from "./USDT";    

const StyledApp = styled.div`
  background-color:  #F9F9F9;
  color: black;
  font-family: Lexend;
  @media (prefers-color-scheme: dark) {
     background-color: rgb(33,33,33);
      color: white ;
  }
  min-height: 250vh;
  padding: 20px 20px;
  margin:0;
  left:0;
`;

const AppContainer = styled.div`
  max-width: 900px;
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
          </FlexBoxRow>
          <div style={{justifyContent:"space-evenly"}}>
         <div onClick={dropdown} style={{cursor:'pointer', left:'0'}}><Icon style={{borderRadius:'7px', width:'85.9%', padding:'20px',  lineHeight:'17px', margin:'7px', fontSize:'larger'}}><img src="https://i.imgur.com/JlK5oxR.png" height='15px' width='15px'/> TON</Icon></div> 
          <div id='ton' style={{display:'none'}}>
          <TransferTon />
          </div>
          <div onClick={dropdown3} style={{cursor:'pointer'}}><Icon style={{borderRadius:'7px', width:'85.9%', padding:'20px',  lineHeight:'17px',  margin:'7px',fontSize:'larger'}}><img src="https://i.imgur.com/sSYmdfQ.png" height='15px' width='15px'/> BTC</Icon></div> 
          <div id='btc' style={{display:'none'}}>
          <TransferBTC />
          </div>
          <div onClick={dropdown4} style={{cursor:'pointer'}}><Icon style={{borderRadius:'7px', width:'85.9%', padding:'20px',  lineHeight:'17px',  margin:'7px',fontSize:'larger'}}><img src="https://i.imgur.com/rjWW55s.png" height='15px' width='15px'/> SOL</Icon></div> 
          <div id='sol' style={{display:'none'}}>
          <TransferSOL />
          </div>
          <div onClick={dropdown5} style={{cursor:'pointer'}}><Icon style={{borderRadius:'7px', width:'85.9%', padding:'20px',  lineHeight:'17px',  margin:'7px',fontSize:'larger'}}><img src="https://i.imgur.com/dhJjQcO.png" height='15px' width='15px'/> ETH</Icon></div> 
          <div id='eth' style={{display:'none'}}>
          <TransferETH />
          </div>
          <div onClick={dropdown2} style={{cursor:'pointer'}}><Icon style={{borderRadius:'7px', margin:'7px', width:'85.9%', padding:'20px',  fontSize:'larger'}} ><img src="https://i.imgur.com/JlK5oxR.png" height='15px' width='15px'/> Jetton</Icon></div>
          <div id='jetton' style={{display:'none'}}>
          <Jetton />
          </div>
          <div>
          <Usdt/>
          </div>
          </div>
        </FlexBoxCol>
          
    
  

        <Icon className="nav" style={{left:'0',right:'0',  bottom:'0%', display:'flex',justifyContent:'space-evenly' ,height:'fit-content',  width:'100%', paddingBottom:'10px', paddingRight:'10px',position:'fixed' }}>
                                             <a href='#/' style={{color:'grey', textDecoration:'none'}}> 
                                             <Button  style={{  fontFamily: 'Lexend' , bottom:'0%',  background:'none', color:"grey"}}><BsHouse/>{/*<img src='https://i.imgur.com/uxozY7V.png' height='14px' width='14px' />*/}
                                             <p style={{zoom:'100%'}}>Home</p> </Button></a>
                                              <a href='#/send' style={{color:'grey', textDecoration:'none'}}> <Button  style={{  fontFamily: 'Lexend' ,bottom:'0%',  background:'none', color:"grey"}}><BsWallet2/>{/*<img src="https://i.imgur.com/hCrmXO1.png" height='14px' width='14px'/> */}
                                             <p style={{zoom:'100%'}}>Wallet</p></Button></a>
                                             <a href='#/market' style={{color:'grey', textDecoration:'none'}}>  <Button style={{  fontFamily: 'Lexend' ,bottom:'0%',  background:'none', color:"grey"}}><BsCashStack/>{/*<img src="https://i.imgur.com/loOhRv0.png" height='14px' width='14px' /> */}
                                               <p style={{zoom:'100%'}}>Finance</p></Button></a> 
                                               <a href='#/discover' style={{color:'grey', textDecoration:'none'}}>
                                               <Button  style={{ fontFamily: 'Lexend' ,bottom:'0%', background:'none', color:"grey"}}><BsLightningCharge/>{/*<img src='https://i.imgur.com/S444rBc.png'height='14px' width='14px'/>*/}
                                               <p style={{zoom:'100%'}}>Discover</p> </Button></a>
                                             </Icon> 
      </AppContainer>
    </StyledApp>
  );
}

export default sendCoin;
