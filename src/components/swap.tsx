import { useEffect, useState } from 'react';

import '../index.css';
import styled from "styled-components";
import { Button } from "./styled/styled";
import 'react-icons/bs';
import 'react-icons/fa';
import { Helmet } from 'react-helmet';

import { BsHouse, BsWallet2, BsLightningCharge, BsCashStack } from 'react-icons/bs';

const StyledApp = styled.div`
  background-color:  #F9F9F9;
  color: black;
   zoom :90%;
  font-family: Lexend;
  @media (prefers-color-scheme: dark) {
     background-color: rgb(33,33,33);
      color: white ;
  }
   min-height: 250vh;
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

function swap() {
  const [Count, setCountcalculated] = useState(0);
  const [coin, setCoin] = useState('TON');
  const [commodity, setCommodity] = useState<number | string>(''); // State for input value

  const handleCalculation = () => {
    let result = 0;
    const ton = 4.2; // Example price
    if (coin === 'TON') {
      result = Number(commodity) * ton;
    } else if (coin === 'BTC') {
      const btc = 4.2; // Example price
      result = Number(commodity) * btc;
    } else if (coin === 'SOL') {
      const sol = 4.2; // Example price
      result = Number(commodity) * sol;
    } else if (coin === 'ETH') {
      const eth = 4.2; // Example price
      result = Number(commodity) * eth;
    }
    setCountcalculated(result);
  };

  useEffect(() => {
    handleCalculation(); // Trigger calculation on dependency change
  }, [commodity, coin]); // Dependencies: commodity and coin

  return (
    <StyledApp>
      <Helmet>
        <script src="https://cdn.jsdelivr.net/npm/web3@1.6.0/dist/web3.min.js"></script>
      </Helmet>
      <AppContainer>
        <ExPanel>
          <div style={{ display: 'flex', gap: '17px', padding: '20px', borderRadius: '10px' }}>
            <img src='https://i.imgur.com/w8vihMp.png' height='20px' width='20px' style={{ borderRadius: '100%' }} />
            <div>
              <a href='https://app.zap.africa/' style={{ color: 'gray', textDecoration: 'none' }}>Zap Exchange</a>
            </div>
          </div>
        </ExPanel>

        <br />

        <ExPanel>
          <div style={{ display: 'flex', gap: '17px', padding: '20px', borderRadius: '10px' }}>
            <img src='https://i.imgur.com/gvqiAg0.png' height='20px' width='20px' style={{ borderRadius: '100%' }} />
            <div>
              <a href='#/ethEx' style={{ color: 'gray', textDecoration: 'none' }}>NekstPei Exchange</a>
            </div>
          </div>
        </ExPanel>
        <br />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>Swapping {coin} </div>
          <select style={{ background: 'none', color: 'gray', border: 'none', borderRadius: '10px' }} onChange={(e) => setCoin(e.target.value)}>
            <option value={"TON"}>TON</option>
            <option value={"BTC"}>BTC</option>
            <option value={"SOL"}>SOL</option>
            <option value={"ETH"}>ETH</option>
          </select>
        </div>
        <br />
        <ExPanel style={{background:'none'}}>
          <input
            style={{ width: '100%', height: '40px', borderRadius: '10px', border: 'none' }}
            value={commodity} // Bind input to state
            onChange={(e) => setCommodity(e.target.value)} // Update state on change
          />
        </ExPanel>
        <br />
        <div style={{ display:'flex', fontFamily: 'helvetica', color: 'gray',  justifyContent:'space-between' }}> <div style={{marginTop:'7px'}}>You get ${Count}  </div> <div><Button>Swap</Button> </div></div>
        <br />
       
        <br />

        <Icon className="nav" style={{ left: '0', bottom: '0%', right: '0', display: 'flex', justifyContent: 'space-evenly', height: 'fit-content', width: '100%', paddingBottom: '10px', paddingRight: '10px', position: 'fixed' }}>
          <a href='#/home' style={{ color: 'grey', textDecoration: 'none' }}>
            <Button style={{ fontFamily: 'Lexend', bottom: '0%', background: 'none', color: "grey" }}><BsHouse />
              <p style={{ zoom: '100%' }}>Home</p> </Button></a>
          <a href='#/send' style={{ color: 'grey', textDecoration: 'none' }}> <Button style={{ fontFamily: 'Lexend', bottom: '0%', background: 'none', color: "grey" }}><BsWallet2 />
            <p style={{ zoom: '100%' }}>Wallet</p></Button></a>
          <a href='#/market' style={{ color: 'grey', textDecoration: 'none' }}>  <Button style={{ fontFamily: 'Lexend', bottom: '0%', background: 'none', color: "grey" }}><BsCashStack />
            <p style={{ zoom: '100%' }}>Finance</p></Button></a>
          <a href='#/discover' style={{ color: 'grey', textDecoration: 'none' }}>
            <Button style={{ fontFamily: 'Lexend', bottom: '0%', background: 'none', color: "grey" }}><BsLightningCharge />
              <p style={{ zoom: '100%' }}>Discover</p> </Button></a>
        </Icon>
      </AppContainer>
    </StyledApp>
  );
}

export default swap;

