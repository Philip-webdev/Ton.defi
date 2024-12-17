import "../App.css";
import '../index.css';
import { TonConnectButton } from "@tonconnect/ui-react";
import { Counter } from "../components/Counter";
import { Jetton } from "../components/Jetton";
import { TransferTon } from "../components/TransferTon";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "../components/styled/styled";
import { useTonConnect } from "../hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";

const StyledApp = styled.div`
  background-color:  #F9F9F9;
  color: black;
  font-family: Lexend;
  @media (prefers-color-scheme: dark) {
    background-color:  #F9F9F9;
    
  }
  min-height: 110vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

function sendCoin() {
  const { network } = useTonConnect();

  return (
    <StyledApp>
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
          
          <TransferTon />
          <Jetton />
        </FlexBoxCol>


        <div style={{right:'0.1%', bottom:'0%', display:'flex',justifyContent:'space-evenly' ,height:'fit-content',background:'white', width:'100%', paddingBottom:'10px', paddingRight:'10px',position:'fixed', borderRadius:'7px'}}>
            <a href='#/' style={{color:'black', textDecoration:'none'}}> 
            <Button  style={{  fontFamily: 'Lexend' ,  marginLeft:'20px',bottom:'0%', marginRight:'20px', background:'none', color:"black"}}><img src='https://i.imgur.com/uxozY7V.png' height='14px' width='14px' />
            <p style={{zoom:'80%'}}>Home</p> </Button></a>
            <a href='#/send' style={{color:'black', textDecoration:'none'}}> <Button  style={{  fontFamily: 'Lexend' ,bottom:'0%', marginRight:'20px', background:'none', color:"black"}}><img src="https://i.imgur.com/hCrmXO1.png" height='14px' width='14px'/>
            <p style={{zoom:'80%'}}>Wallet</p></Button></a>
            <a href='#/market' style={{color:'black', textDecoration:'none'}}>  <Button style={{  fontFamily: 'Lexend' ,bottom:'0%', marginRight:'20px', background:'none', color:"black"}}> <img src="https://i.imgur.com/loOhRv0.png" height='14px' width='14px' /> 
              <p style={{zoom:'80%'}}>Market</p></Button></a> 
              <a href='#/discover' style={{color:'black', textDecoration:'none'}}>
              <Button  style={{ fontFamily: 'Lexend' ,bottom:'0%', background:'none', color:"black"}}><img src='https://i.imgur.com/S444rBc.png'height='14px' width='14px'/>
              <p style={{zoom:'80%'}}>Discover</p> </Button></a>
            </div>
      </AppContainer>
    </StyledApp>
  );
}

export default sendCoin;
