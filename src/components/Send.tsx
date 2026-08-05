import "../App.css";
import "../index.css";
import { TonConnectButton} from '@tonconnect/ui-react';
import { TransferTon } from "../components/TransferTon";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "../components/styled/styled";
import { useTonConnect } from "../hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import { BsQrCodeScan } from "react-icons/bs";
import { TransferBTC } from "./transferBTC";
import { TransferETH } from "./transferETH";
import { TransferSOL } from "./transferSOL";
import Usdt from "./USDT";
import { useState, useEffect } from "react";
import FootNavig from "./footnavig";
import { useLocation } from "react-router-dom";


const StyledApp = styled.div`
  background-color: #f9f9f9;
  color: black;
  font-family: 'Sora', sans-serif;
  @media (prefers-color-scheme: dark) {
    background-color: rgb(33, 33, 33);
    color: white;
  }
  min-height: 100vh;
  padding: 20px;
  margin: 0;
`;

const AppContainer = styled.div`
  margin: 0;
`;

const Icon = styled.div`
  background-color: white;
  @media (prefers-color-scheme: dark) {
    background-color: rgb(15, 15, 15);
    color: grey;
  }
`;

 
const toggleDropdown = (id: string) => {
  const section = document.getElementById(id) as HTMLElement | null;
  if (!section) return;
  section.style.display = section.style.display === "block" ? "none" : "block";
};

function SendCoin() {
 
  const [list, setList] = useState<string>(""); 
  //setList(state.quann + state.listt) 
  const { network } = useTonConnect();


  
  // useEffect(() => {
  //   if (state && Array.isArray(state)) {
  //     const formatted = state
  //       .map((item: any) => {
  //         // if state is {name, quantity}
  //         if (typeof item === "object") {
  //           return `${item.quantity} × ${item.name}`;
  //         }
    
  //         return String(item);
  //       })
  //       .join("\n");

  //     setList(formatted);
  //   }
  // }, [state]);

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
            <Button>
              <a href="#/scan" style={{ color: "white" }}>
                <BsQrCodeScan />
              </a>
            </Button>
          </FlexBoxRow>

          {/* TON */}
          <div onClick={() => toggleDropdown("ton")} style={{ cursor: "pointer" }}>
            <Icon style={{ borderRadius: "12px", width: "100%", padding: "16px", marginBottom: "10px", display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 500 }}>
              <img src="https://i.imgur.com/JlK5oxR.png" height="20" width="20" style={{ borderRadius: '50%' }} /> TON
            </Icon>
          </div>
          <div id="ton" style={{ display: "none" }}>
            <TransferTon />
          </div>

        
          <div onClick={() => toggleDropdown("btc")} style={{ cursor: "pointer" }}>
            <Icon style={{ borderRadius: "12px", width: "100%", padding: "16px", marginBottom: "10px", display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 500 }}>
              <img src="https://i.imgur.com/sSYmdfQ.png" height="20" width="20" style={{ borderRadius: '50%' }} /> BTC
            </Icon>
          </div>
          <div id="btc" style={{ display: "none" }}>
            <TransferBTC />
          </div>
  
          <div onClick={() => toggleDropdown("sol")} style={{ cursor: "pointer" }}>
            <Icon style={{ borderRadius: "12px", width: "100%", padding: "16px", marginBottom: "10px", display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 500 }}>
              <img src="https://i.imgur.com/rjWW55s.png" height="20" width="20" style={{ borderRadius: '50%' }} /> SOL
            </Icon>
          </div>
          <div id="sol" style={{ display: "none" }}>
            <TransferSOL />
          </div>

    
          <div onClick={() => toggleDropdown("eth")} style={{ cursor: "pointer" }}>
            <Icon style={{ borderRadius: "12px", width: "100%", padding: "16px", marginBottom: "10px", display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 500 }}>
              <img src="https://i.imgur.com/dhJjQcO.png" height="20" width="20" style={{ borderRadius: '50%' }} /> ETH
            </Icon>
          </div>
          <div id="eth" style={{ display: "none" }}>
            <TransferETH />
          </div>
 
          <div>
            <Usdt />
          </div>

          <div style={{ height: '16px' }} />

           
          <textarea
            placeholder="cart summary..."
            value={list}
            readOnly
            style={{
              width: "100%",
              height: "100px",
              background: "none",
              outline: "none",
              border: "none",
              color: "inherit",
              fontSize: '14px',
              resize: 'none',
            }}
          />
        </FlexBoxCol>

        <div>
          <FootNavig />
        </div>
      </AppContainer>
    </StyledApp>

  );
}

export default SendCoin;
