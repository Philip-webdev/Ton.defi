import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "./styled/styled";
import '../index.css';
import { BsHouse, BsWallet2, BsShop, BsLightningCharge, BsCashStack, BsCashCoin, BsCash, BsApp } from "react-icons/bs";
import FootNavig from "./footnavig";

const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  margin: 0;
  font-family: 'Sora', sans-serif;
  @media (prefers-color-scheme: dark) {
    background-color: rgb(15,15,15);
    color: white;
  }
  min-height: 100vh;
  padding: 20px;
`;

const AppContainer = styled.div`
  width: 100%;
  height: fit-content;
  margin: 0;
  font-family: 'Sora', sans-serif;
`;

function Stake() {
  return (
    <StyledApp>
      <AppContainer>
        <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', color: 'inherit' }}>Earn by Stakes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderRadius: '12px' }}>
        </div>
        <div style={{ marginTop: '24px' }}>
          <FootNavig />
        </div>
      </AppContainer>
    </StyledApp>
  );
}

export default Stake;
