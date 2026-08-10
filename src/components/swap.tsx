import { useEffect, useState } from 'react';

import '../index.css';
import styled from "styled-components";
import { Button } from "./styled/styled";
import 'react-icons/bs';
import 'react-icons/fa';
import { Helmet } from 'react-helmet';

import { BsHouse, BsWallet2, BsLightningCharge, BsCashStack, BsApp } from 'react-icons/bs';
import FootNavig from './footnavig';

const StyledApp = styled.div`
  background-color:  #F9F9F9;
  color: black;
  font-family: 'Sora', sans-serif;
  @media (prefers-color-scheme: dark) {
     background-color: rgb(33,33,33);
      color: white ;
  }
  min-height: 100vh;
  padding: 20px;
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
  font-family: 'Sora', sans-serif ;
`;

function swap() {
  const [Count, setCountcalculated] = useState(0);
  const [coin, setCoin] = useState('TON');
  const [commodity, setCommodity] = useState<number | string>(''); // State for input value

  const handleCalculation = () => {
    let result = 0;
    const ton = 4.2;  
    if (coin === 'TON') {
      result = Number(commodity) * ton;
    } else if (coin === 'BTC') {
      const btc = 4.2;  
      result = Number(commodity) * btc;
    } else if (coin === 'SOL') {
      const sol = 4.2;  
      result = Number(commodity) * sol;
    } else if (coin === 'ETH') {
      const eth = 4.2;  
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
          <div style={{ display: 'flex', gap: '16px', padding: '16px', borderRadius: '12px', alignItems: 'center' }}>
            <img src='https://i.imgur.com/w8vihMp.png' height='20' width='20' style={{ borderRadius: '50%' }} />
            <div>
              <a href='https://app.zap.africa/' style={{ color: 'gray', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>Zap Exchange</a>
            </div>
          </div>
        </ExPanel>

        <div style={{ height: '12px' }} />

        <ExPanel>
          <div style={{ display: 'flex', gap: '16px', padding: '16px', borderRadius: '12px', alignItems: 'center' }}>
            <img src='https://i.imgur.com/gvqiAg0.png' height='20' width='20' style={{ borderRadius: '50%' }} />
            <div>
              <a href='#/ethEx' style={{ color: 'gray', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>NekstPei Exchange</a>
            </div>
          </div>
        </ExPanel>

        <div style={{ height: '16px' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
          <div style={{ fontSize: '14px', fontWeight: 500 }}>Swapping {coin}</div>
          <select style={{ background: 'none', color: 'gray', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, outline: 'none' }} onChange={(e) => setCoin(e.target.value)}>
            <option value={"TON"}>TON</option>
            <option value={"BTC"}>BTC</option>
            <option value={"SOL"}>SOL</option>
            <option value={"ETH"}>ETH</option>
          </select>
        </div>

        <div style={{ height: '12px' }} />

        <ExPanel style={{ background: 'none' }}>
          <input
            style={{ width: '100%', height: '44px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: 'white', padding: '0 14px', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
          />
        </ExPanel>

        <div style={{ height: '16px' }} />

        <div style={{ display: 'flex', fontFamily: "'Sora', sans-serif", color: 'gray', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
          <div style={{ fontSize: '14px', fontWeight: 500 }}>You get ${Count}</div>
          <div><Button onClick={() => alert("Swap feature coming soon!")}>Swap</Button></div>
        </div>

        <div style={{ height: '24px' }} />

        <div><FootNavig/></div>
      </AppContainer>
    </StyledApp>
  );
}

export default swap;

