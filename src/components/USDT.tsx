import React, { useEffect, useState } from "react";
import { TronWeb } from 'tronweb'
import '../index.css';
import styled from "styled-components";
import { Button } from "./styled/styled";
import 'react-icons/bs';

import * as multichainWallet from 'multichain-crypto-wallet';
import { IResponse } from "multichain-crypto-wallet/dist/common/utils/types";
import { Dropdown } from "bootstrap";
  
const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  border-radius: 17px;
  font-family: Lexend;


  @media (prefers-color-scheme: dark) {
    background-color: rgb(33,33,33);
    color: white;
  }
`;



const AppContainer = styled.div`
   width: 100%;
   height: fit-content;
   margin: 0;
   font-family: Lexend;
`;



const Icon = styled.div`
background-color: white;
 border-radius:7px;  
  
 @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
        color:grey;
  }
`;
const Icn = styled.div`
background-color: white;
 border-radius:7px;  
 justify-content:center;
  padding:7px;
 @media (prefers-color-scheme: dark) {
     background-color: rgb(33,33,33);
        padding:7px;
  }
`;
 
async function getBalance() {
    const ethAddress = localStorage.getItem('ethereumWallet');

  if (!ethAddress) {
    throw new Error("Ethereum wallet address not found in local storage");
  }

const erc20balance = await multichainWallet.getBalance({
  address: ethAddress,
  network: 'ethereum',
  rpcUrl: 'https://rpc.ankr.com/eth',
  tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
});
return erc20balance 
}

async function getTrc20Balance() {
  const tronAddress = localStorage.getItem('tronWallet');
 const trc20Address = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';

  const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io',
  });
const usdtABI = [
  {
    inputs: [{ name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  }
];
  const contract = tronWeb.contract(usdtABI, trc20Address);
  const balance = await contract.balanceOf(tronAddress).call();
  return balance;
}

async function sendTRC20Token(toAddress: string, amount: number) {

  
  const tronAddress = localStorage.getItem('tronWallet');
  const trc20Address = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';

  const toAddressElement = document.getElementById('toAddress') as HTMLInputElement | null;
  if (toAddressElement) {
    toAddress = toAddressElement.value;
  } else {
    throw new Error("To address input element not found");
  }
const amountElement = document.getElementById('amount') as HTMLInputElement | null;
if (amountElement) {
  amount = parseFloat(amountElement.value);
} else {
  throw new Error("Amount input element not found");
}
  const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io',
  });
  const usdtABI = [
    {
      inputs: [{ name: 'owner', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ name: 'to', type: 'address' }, { name: 'value', type: 'uint256' }],
      name: 'transfer',
      outputs: [{ name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function',
    }
  ];
  const contract = tronWeb.contract(usdtABI, trc20Address);

  try {
    const tx = await contract.methods.transfer(toAddress, amount * 1e6).send();
    console.log('Transaction successful:', tx);
  } catch (error) {
    console.error('Error sending TRC-20:', error);
  }
}
const dropdown = () => {
  const Element = document.getElementById('elem') as HTMLInputElement | null;
  if (Element != null && Element.style.display == 'block') {
      Element.style.display = 'none'; 
  } else if(Element != null) {
    Element.style.display = 'block';
  }
  
};
function usdt() {
  const [ercBalance, setercBalance] = useState<number>(0); 
  const tokenAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';
  useEffect(() => {
      const fetchercBalance = async () => {
          const ercbalance = await getBalance(); // Call async function to get total balance
          setercBalance(ercbalance.balance); // Update state with total balance
      };

      fetchercBalance(); // Fetch total balance on component mount
  }, []);
  const [trcBalance, setTrcBalance] = useState<number>(0);

  const trc20Address = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';
  useEffect(() => {
    const fetchTrcBalance = async () => {
      const trcbalance = await getTrc20Balance(); // Call async function to get TRC20 balance
      setTrcBalance(trcbalance); // Update state with TRC20 balance
    };

    fetchTrcBalance(); // Fetch TRC20 balance on component mount
  }, []);
return(
    <AppContainer>
    <img src='https://i.imgur.com/dhJjQcO.png' alt='Ethereum' style={{ width: '15px', height: '15px' }} /> ERC 20 USDT
     <div style={{display:'inline',  justifyContent:'space-between',  margin:'10px'}}>
     
     <div style={{zoom:'50%'}}>Token Address: {tokenAddress}</div>
     <div>Balance: {ercBalance}</div>
     </div>
       <br></br>

       <img src='https://i.imgur.com/ywfZokP.png' alt='Tron' style={{ width: '15px', height: '15px' }} /> TRC 20 USDT
     <div style={{display:'inline',  justifyContent:'space-between',  margin:'10px'}}>
     
     <div style={{zoom:'50%'}}>Token Address: {trc20Address} </div>

     <div>Balance: {trcBalance}</div>
     </div>
     
      <Icon>
        <Icn>
       <div onClick={dropdown} style={{cursor:'pointer', left:'0'}}><Icon style={{borderRadius:'7px', padding:'20px',  lineHeight:'17px', margin:'7px', fontSize:'larger'}}>Send TRC-20</Icon></div>
           <div id="elem" style={{display:'none'}}>
            <Icon style={{borderRadius:'7px', padding:'20px',  lineHeight:'17px', margin:'7px', fontSize:'larger'}}> <input id="toAddress" placeholder="Recipient Address"  style={{color: 'grey',height:'40px', background:'transparent', width:'200px', borderColor:"grey",  borderWidth:'1px',  borderRadius:'7px'}} /></Icon>
<br />
           <Icon style={{borderRadius:'7px', padding:'20px',  lineHeight:'17px', margin:'7px', fontSize:'larger'}}> <input id="amount" placeholder="Amount"  type="number" style={{color: 'grey',  height:'30px', background:'transparent',  width:'185px',  borderColor:"grey",  borderWidth:'1px'}} />  </Icon><br /><br />
            <Button onClick={() => sendTRC20Token('', 0)}>Send</Button><br /><br />
           </div>
        </Icn>
         
      </Icon>
    </AppContainer>

)

}

export default usdt;