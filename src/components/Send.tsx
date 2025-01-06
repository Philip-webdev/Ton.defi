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
import { BsHouse, BsWallet2, BsShop, BsLightningCharge } from "react-icons/bs";

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

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
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
         <div onClick={dropdown} style={{cursor:'pointer'}}><Icon style={{borderRadius:'7px', width:'fit-content',padding:'10px'}}> TON</Icon></div> 
          <div id='ton' style={{display:'none'}}>
          <TransferTon />
          </div>
          <div onClick={dropdown2} style={{cursor:'pointer'}}><Icon style={{borderRadius:'7px', width:'fit-content',padding:'8px', paddingRight:'6px'}} >Jetton</Icon></div>
          <div id='jetton' style={{display:'none'}}>
          <Jetton />
          </div>
        </FlexBoxCol>
        

        <Icon className="nav" style={{right:'0.1%', bottom:'0%', display:'flex',justifyContent:'space-evenly' ,height:'fit-content',  width:'100%', paddingBottom:'10px', paddingRight:'10px',position:'fixed' }}>
                       <a href='#/' style={{color:'grey', textDecoration:'none'}}> 
                       <Button  style={{  fontFamily: 'Lexend' ,  marginLeft:'20px',bottom:'0%', marginRight:'20px', background:'none', color:"grey"}}><BsHouse/>{/*<img src='https://i.imgur.com/uxozY7V.png' height='14px' width='14px' />*/}
                       <p style={{zoom:'80%'}}>Home</p> </Button></a>
                        <a href='#/send' style={{color:'grey', textDecoration:'none'}}> <Button  style={{  fontFamily: 'Lexend' ,bottom:'0%', marginRight:'20px', background:'none', color:"grey"}}><BsWallet2/>{/*<img src="https://i.imgur.com/hCrmXO1.png" height='14px' width='14px'/> */}
                       <p style={{zoom:'80%'}}>Wallet</p></Button></a>
                       <a href='#/market' style={{color:'grey', textDecoration:'none'}}>  <Button style={{  fontFamily: 'Lexend' ,bottom:'0%', marginRight:'20px', background:'none', color:"grey"}}><BsShop/> {/*<img src="https://i.imgur.com/loOhRv0.png" height='14px' width='14px' /> */}
                         <p style={{zoom:'80%'}}>Market</p></Button></a> 
                         <a href='#/discover' style={{color:'grey', textDecoration:'none'}}>
                         <Button  style={{ fontFamily: 'Lexend' ,bottom:'0%', background:'none', color:"grey"}}><BsLightningCharge/>{/*<img src='https://i.imgur.com/S444rBc.png'height='14px' width='14px'/>*/}
                         <p style={{zoom:'80%'}}>Discover</p> </Button></a>
                       </Icon> 
      </AppContainer>
    </StyledApp>
  );
}

export default sendCoin;
