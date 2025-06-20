import React, { useEffect, useState } from "react";
import { TronWeb } from 'tronweb'
import '../index.css';
import styled from "styled-components";
import { Button } from "./styled/styled";
import 'react-icons/bs';
import * as multichainWallet from 'multichain-crypto-wallet';
 
import { ethers } from "ethers";
 
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


const Input = styled.input`
color:white;
padding: 20px;
width: 90%;
height:40px;
border-color: black;
font-size: 16px;
font-family: Lexend;
placeholder :transparent;
 @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
     border-color: rgb(36, 172, 242);
      
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

const Butt = styled.button`
  margin: auto;
  background:white;
padding: 20px;
width: 90%;
height:70px;

font-size: 16px;
font-family: Lexend;
 @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
    
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
  const trc20Address = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';  // USDT on Tron

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

  const tronAddressKey = localStorage.getItem('tronWalletkey') as string;
  if (!tronAddressKey) {
    throw new Error("Tron wallet private key not found in local storage");
  }

  
  const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io',
    privateKey: tronAddressKey
  });

   
 // tronWeb.setAddress(tronWeb.address.fromPrivateKey(tronAddressKey));

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

  const contract = await tronWeb.contract(usdtABI, trc20Address);

  try {
 
    const senderAddress = tronAddress;
    if (!senderAddress) {
      throw new Error("Sender address is null");
    }
    console.log("Sender Address:", senderAddress);

    const tx = await contract.methods.transfer(toAddress, amount * 1e6).send({
      feeLimit: 10000000, // 10 TRX gas fee limit
      callValue: 0,
      shouldPollResponse: true,
      from: senderAddress,
    });

    console.log('  Transaction successful:', tx);
  } catch (error) {
    console.error('  Error sending TRC-20:', error);
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
const dropdown1 = () => {
  const Element = document.getElementById('elem1') as HTMLInputElement | null;
  if (Element != null && Element.style.display == 'block') {
      Element.style.display = 'none'; 
  } else if(Element != null) {
    Element.style.display = 'block';
  }
  
};

async function transferUSDT(senderWallet: ethers.Wallet, recipientAddress: string, amount: number) {
  try {
    // Validate recipient address
    if (!ethers.isAddress(recipientAddress)) {
      throw new Error("Invalid recipient address");
    }

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
      throw new Error("Invalid transfer amount");
    }

    const usdtAbi = [
      'function transfer(address _to, uint256 _value) public returns (bool)',
    ];
    const usdtContractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // USDT Contract Address

    const contract = new ethers.Contract(usdtContractAddress, usdtAbi, senderWallet);

    // Estimate gas
    const gasEstimate = await senderWallet.estimateGas({
      to: usdtContractAddress,
      data: contract.interface.encodeFunctionData('transfer', [recipientAddress, ethers.parseUnits(amount.toString(), 6)]),
    });
    console.log(`Estimated Gas: ${gasEstimate.toString()}`);

    // Send transaction
    console.log(`🔄 Sending ${amount} USDT to ${recipientAddress}...`);
    const tx = await contract.transfer(recipientAddress, ethers.parseUnits(amount.toString(), 6), {
      gasLimit: gasEstimate,
    });

    console.log(`Transaction sent! Tx Hash: ${tx.hash}`);

    // Wait for confirmation
    await tx.wait();
    console.log(`🎉 Transaction confirmed: ${tx.hash}`);
  } catch (error) {
    if (error instanceof Error) {
        console.error('Error sending USDT:', error.message);
    } else {
        console.error('Error sending USDT:', error);
    }
  }
}

async function sendERC20Token() {
  const provider = new ethers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/fY6etQ0_E-PnuaKp5g9npALfvpJ4IGRq'); 

  const ethAddressKey = localStorage.getItem('ethereumWalletkey');
  if (!ethAddressKey) {
    throw new Error("Ethereum wallet private key not found in local storage");
  }

  const senderWallet = new ethers.Wallet(ethAddressKey, provider);

  const toAddressElement = document.getElementById('toethAddress') as HTMLInputElement | null;
  const recipientAddress = toAddressElement?.value;  
  
  if (!recipientAddress) {
    throw new Error("Recipient address is empty or invalid");
  }

  const amountElement = document.getElementById('ercamount') as HTMLInputElement | null;
  const amount = amountElement ? parseFloat(amountElement.value) : 0;
  
  if (amount <= 0) {
    throw new Error("Invalid transfer amount");
  }

  transferUSDT(senderWallet, recipientAddress, amount);
}

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
    
     
       
         
       <div onClick={dropdown} style={{cursor:'pointer', left:'0'}}><Icon style={{borderRadius:'7px', width:'90%', padding:'20px',  lineHeight:'17px',  margin:'7px',fontSize:'larger'}}><img src='https://i.imgur.com/ywfZokP.png' alt='Tron' style={{ width: '15px', height: '15px' }} /> TRC-20</Icon></div>
           <div id="elem" style={{display:'none',margin:'20px'}}>
     <div >
     <div style={{zoom:'80%', padding:'10px'}}>Token Address: {trc20Address} </div>
<div style={{fontFamily:'helvetica', padding:'20px'}}>${trcBalance}</div>
     
     </div>
            <div style={{borderRadius:'7px', padding:'20px',  lineHeight:'17px', fontSize:'larger'}}> <Input id="toAddress" placeholder="Recipient Address"  style={{color: 'grey', background:'transparent',   borderWidth:'1px',  borderRadius:'7px'}} /></div>

           <div style={{borderRadius:'7px', padding:'20px',  lineHeight:'17px', fontSize:'larger'}}> <Input id="amount" placeholder="Amount"  type="number" style={{color: 'grey', background:'transparent',     borderWidth:'1px'}} />  </div><br />
            <Butt   style={{margin: 'auto',lineHeight:'17px', backgroundColor: 'rgb(36, 172, 242)', border: 'none',  borderRadius:'7px', width: '100%'}} onClick={() => sendTRC20Token('', 0)}   ><img src="https://i.imgur.com/EvACd43.png" alt="Send" style={{ width: '15px', height: '15px'}} /></Butt>
           </div>
         

       <div onClick={dropdown1} style={{cursor:'pointer', left:'0'}}><Icon style={{borderRadius:'7px', width:'90%', padding:'20px',  lineHeight:'17px',  margin:'7px',fontSize:'larger'}}> <img src='https://i.imgur.com/dhJjQcO.png' alt='Ethereum' style={{ width: '15px', height: '15px' }} /> ERC-20</Icon></div>
           <div id="elem1" style={{display:'none',margin:'20px', justifyContent:'center'}}>
          
<div>

<div style={{zoom:'80%', padding:'3px'}}>Token Address: {tokenAddress}</div>
<div style={{fontFamily:'helvetica', padding:'20px'}}>${ercBalance}</div>
</div>
     
    
     
      
            <div style={{borderRadius:'7px', padding:'20px',  lineHeight:'17px'}}> <Input id="toethAddress" placeholder="Recipient Address"  style={{color: 'grey', background:'transparent',  borderWidth:'1px',  borderRadius:'7px'}} /></div>

           <div style={{borderRadius:'7px', padding:'20px',  lineHeight:'17px'}}> <Input id="ercamount" placeholder="Amount"  type="number" style={{color: 'grey',  background:'transparent',     borderWidth:'1px'}} />  </div><br />
          <Butt  style={{margin: 'auto', backgroundColor: 'rgb(36, 172, 242)', border: 'none', width: '100%',  borderRadius:'7px', padding:'20px'}} onClick={() => sendERC20Token()}><img src="https://i.imgur.com/EvACd43.png" alt="Send" style={{ width: '15px', height: '15px' }} /></Butt><br /><br />
           </div>
        
      
    </AppContainer>

)

}

export default usdt;