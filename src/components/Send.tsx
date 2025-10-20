import "../App.css";
import "../index.css";
import { useLocation } from "react-router-dom";
import { TonConnectButton } from "@tonconnect/ui-react";
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

const StyledApp = styled.div`
  background-color: #f9f9f9;
  color: black;
  font-family: Lexend;
  @media (prefers-color-scheme: dark) {
    background-color: rgb(33, 33, 33);
    color: white;
  }
  min-height: 250vh;
  padding: 40px 40px;
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
  const { state } = useLocation();
  const [list, setList] = useState<string>(""); 
  //setList(state.quann + state.listt) 
  const { network } = useTonConnect();

  
  useEffect(() => {
    if (state && Array.isArray(state)) {
      const formatted = state
        .map((item: any) => {
          // if state is {name, quantity}
          if (typeof item === "object") {
            return `${item.quantity} × ${item.name}`;
          }
    
          return String(item);
        })
        .join("\n");

      setList(formatted);
    }
  }, [state]);

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
            <Icon style={{ borderRadius: "7px", width: "90%", padding: "20px", margin: "7px" }}>
              <img src="https://i.imgur.com/JlK5oxR.png" height="15" width="15" /> TON
            </Icon>
          </div>
          <div id="ton" style={{ display: "none" }}>
            <TransferTon />
          </div>

        
          <div onClick={() => toggleDropdown("btc")} style={{ cursor: "pointer" }}>
            <Icon style={{ borderRadius: "7px", width: "90%", padding: "20px", margin: "7px" }}>
              <img src="https://i.imgur.com/sSYmdfQ.png" height="15" width="15" /> BTC
            </Icon>
          </div>
          <div id="btc" style={{ display: "none" }}>
            <TransferBTC />
          </div>
  
          <div onClick={() => toggleDropdown("sol")} style={{ cursor: "pointer" }}>
            <Icon style={{ borderRadius: "7px", width: "90%", padding: "20px", margin: "7px" }}>
              <img src="https://i.imgur.com/rjWW55s.png" height="15" width="15" /> SOL
            </Icon>
          </div>
          <div id="sol" style={{ display: "none" }}>
            <TransferSOL />
          </div>

    
          <div onClick={() => toggleDropdown("eth")} style={{ cursor: "pointer" }}>
            <Icon style={{ borderRadius: "7px", width: "90%", padding: "20px", margin: "7px" }}>
              <img src="https://i.imgur.com/dhJjQcO.png" height="15" width="15" /> ETH
            </Icon>
          </div>
          <div id="eth" style={{ display: "none" }}>
            <TransferETH />
          </div>
 
          <div>
            <Usdt />
          </div>

          <br />

           
          <textarea
            placeholder="cart summary..."
            value={list}
            readOnly
            style={{
              marginLeft: "9px",
              width: "100%",
              height: "100px",
              background: "none",
              outline: "none",
              border: "none",
              color: "white",
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
