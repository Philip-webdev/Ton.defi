import { useEffect, useState } from "react";
import { createRoot } from 'react-dom/client';
import {QRCodeCanvas} from 'qrcode.react';
import styled from "styled-components";
import { Button } from "./styled/styled";
import '../index.css';
import { TronWeb } from 'tronweb';
import * as multichainWallet from 'multichain-crypto-wallet';
import { BsHouse, BsWallet2, BsShop, BsLightningCharge, BsCashStack, BsCopy, BsQrCode, BsApp } from "react-icons/bs";
import WalletForm from "./monnify";
import FootNavig from "./footnavig";

const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  
  font-family: Lexend;
   min-height: 250vh;
  padding: 20px;
 zoom :100%;
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
const[color,  setColor] = useState('grey');

    var ethAddress = localStorage.getItem('ethereumWallet') as string;
        var bitAddress = localStorage.getItem('bitcoinWallet') as string;
        var solAddress = localStorage.getItem('solanaWallet')as string;
        var tronAddress = localStorage.getItem('tronWallet') as string;

      //wallet creation
    const createWallets = async () => {
      const bitcoinWallet = multichainWallet.createWallet({ network: 'bitcoin' });
        const ethereumWallet = multichainWallet.createWallet({ network: "ethereum" });
        const solanaWallet = multichainWallet.createWallet({ network: "solana" });
        const tronWeb = new TronWeb({
          fullHost: 'https://api.trongrid.io',
          });
      
        
          const tronWallet = await tronWeb.createAccount();

        // Save wallet addresses to local storage as a fallback
        localStorage.setItem('ethereumWallet', ethereumWallet.address);
        localStorage.setItem('bitcoinWallet', bitcoinWallet.address);
        localStorage.setItem('solanaWallet', solanaWallet.address);
        localStorage.setItem('tronWallet', tronWallet.address.base58);

        const ethAddress = localStorage.getItem('ethereumWallet') as string;
        const bitAddress = localStorage.getItem('bitcoinWallet')as string;
        const solAddress = localStorage.getItem('solanaWallet')as string;
        const tronAddress = localStorage.getItem('tronWallet')as string;

        setBitcoinWalletAddress( bitAddress );
        setEthereumWalletAddress(ethAddress);
        setSolanaWalletAddress(solAddress );
        setTronWalletAddress(tronAddress);
 //private keys
       localStorage.setItem('ethereumWalletkey', ethereumWallet.privateKey) ;
       localStorage.setItem('bitcoinWalletkey', bitcoinWallet.privateKey) ;
       localStorage.setItem('solanaWalletkey', solanaWallet.privateKey) ;
        localStorage.setItem('tronWalletkey', tronWallet.privateKey) ;


          //for database   
          const ethAdd =    ethereumWallet.address as string;
           const bitAdd =   bitcoinWallet.address as string;
          const solAdd =    solanaWallet.address as string;
           const tronAdd =   tronWallet.address.base58;

        const   ethk = ethereumWallet.privateKey as string;
        const    btck= bitcoinWallet.privateKey as string;
        const     solK= solanaWallet.privateKey  as string;
        const   tronK =  tronWallet.privateKey as string;


    try{
      const p_k = [ethk, btck, solK,  tronK]; 
        const Address =  [ethAdd, bitAdd, solAdd, tronAdd] ;
        const res = await   fetch("https://twa-backend-g83o.onrender.com/wallets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",  
          body: JSON.stringify({  p_k, Address }),
      })
      const responseData = await res.json();
      console.log(responseData.walletId)
      const saveWalletIdToIndexedDB = ( ) => {
        const walletId = responseData.walletId;
      
        const request = indexedDB.open('WalletDatabase', 1);
      
        request.onupgradeneeded = (event) => {
          const db = event.target ? (event.target as IDBOpenDBRequest).result : null;
          if (!db) {
            console.error('Failed to access IndexedDB result.');
            return;
          }
      
          if (!db.objectStoreNames.contains('wallets')) {
            db.createObjectStore('wallets', { keyPath: 'id' });
          }
        };
      
        request.onsuccess = (event) => {
          const db = event.target ? (event.target as IDBOpenDBRequest).result : null;
          if (!db) {
            console.error('Failed to access IndexedDB result.');
            return;
          }
          const tx = db.transaction('wallets', 'readwrite');
          const store = tx.objectStore('wallets');
      
          store.put({ id: 'latest', walletId: walletId });
      
          tx.oncomplete = () => {
            console.log(' Wallet ID saved to IndexedDB:', walletId);
          };
      
          tx.onerror = (err) => {
            console.error(' Error saving wallet ID:', err);
          };
        };
      
        request.onerror = (err) => {
          console.error(' Error opening IndexedDB:', err);
        };
        
      };
      saveWalletIdToIndexedDB();
    }
       
    catch  {
      console.error('failed to post request ');
  } 
  
    };   

    //backend req
    async function alreadyExists (){
      if (ethAddress && bitAddress && solAddress && tronAddress) {
        
        setBitcoinWalletAddress( bitAddress );
        setEthereumWalletAddress(ethAddress);
        setSolanaWalletAddress(solAddress );
        setTronWalletAddress(tronAddress);
        }
else{
        try {

          const getWalletIdFromIndexedDB = (): Promise<string | null> => {
            return new Promise((resolve, reject) => {
              const request = indexedDB.open('WalletDatabase', 1);
          
              request.onsuccess = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                const tx = db.transaction('wallets', 'readonly');
                const store = tx.objectStore('wallets');
                const getRequest = store.get('latest');
          
                getRequest.onsuccess = () => {
                  if (getRequest.result) {
                    const walletId = getRequest.result.walletId;
                    console.log('✅ Retrieved Wallet ID:', walletId);
                    resolve(walletId);
                  } else {
                    resolve(null); // Nothing saved
                  }
                };
          
                getRequest.onerror = () => reject(' Failed to retrieve wallet ID');
              };
          
              request.onerror = () => reject(' Failed to open IndexedDB');
            });
          };
          
          
  const walletId = await getWalletIdFromIndexedDB();
  if (!walletId) throw new Error('Wallet ID not found in IndexedDB');

  const response = await fetch(`https://twa-backend-g83o.onrender.com/wallets/${walletId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
 
            const data = await response.json();
            
            setBitcoinWalletAddress(data.addresses[0]);
        setEthereumWalletAddress(data.addresses[1]);
        setSolanaWalletAddress(data.addresses[2]);
        setTronWalletAddress(data.addresses[3]);

        localStorage.setItem('ethereumWallet', data.addresses[0]);
        localStorage.setItem('bitcoinWallet', data.addresses[1]);
        localStorage.setItem('solanaWallet', data.addresses[2]);
        localStorage.setItem('tronWallet', data.addresses[3]);

        } catch (err) {
            console.error("Failed to fetch wallets:", err);
        }
     } }

     useEffect(() => {
         alreadyExists();
     }, []);
   
   
     ethAddress = localStorage.getItem('ethereumWallet') as string;
     bitAddress = localStorage.getItem('bitcoinWallet')as string;
     solAddress = localStorage.getItem('solanaWallet')as string;
     tronAddress = localStorage.getItem('tronWallet')as string;

 
 
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
      const sectionQR = document.getElementById('qr') as HTMLElement | null;
      if (sectionQR != null && sectionQR.style.display == 'none') {
        sectionQR.style.display = 'block'; 
    
    } 
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
  
  } 
  };
  const styles = {
        color: 'rgb(36, 172, 242)'
       }
      const current = () =>{
      
       setColor(styles.color)
      }
      const dropdown = () => {
         
        const section = document.getElementById('fiat') as HTMLElement | null;
      
        if (section != null && section.style.display == 'block') {
            section.style.display = 'none'; 
        } else if(section != null) {
          section.style.display = 'block';
        }
      };
    return (
        <StyledApp  > 
            <AppContainer  > 
           
              <div id="qr" style={{display:'none '}}>
            <div id="QRcode1"  style={{position: 'absolute',top: '50%', left: '50%',transform: 'translate(-50%, -50%)'}}> </div>
            <div id="QRcode2"  style={{position: 'absolute',top: '50%', left: '50%',transform: 'translate(-50%, -50%)'}}> </div>
            <div id="QRcode3"  style={{position: 'absolute',top: '50%', left: '50%',transform: 'translate(-50%, -50%)'}}> </div>
            <div id="QRcode4"  style={{position: 'absolute',top: '50%', left: '50%',transform: 'translate(-50%, -50%)'}}> </div>
            </div>
              <div style={{right:'0', display:'flex'}}><Button onClick={alreadyExists} style={{fontSize:'14px'}}  >Import  wallet</Button> <Button onClick={createWallets} style={{fontSize:'14px'}} >Create new   </Button>  <Button onClick={showQR}><BsQrCode/></Button> <div   style={{  left: '85%', height:'34.5px'  }}> <select id="QRcodeChoice" style={{height:'34.5px', background:'transparent', border:'none', color:'gray', fontFamily:'Lexend'}}  onChange={showQR}   >
              <option  value="eth">eth</option>
              <option  value="btc">btc</option>
              <option value="sol">sol</option>
              <option  value="trx">trx</option>
              </select></div></div>
              <br/>
            <ExPanel style={{ display: 'flex', padding:'10px', borderRadius: '7px' }} onMouseEnter={onMouseLeave}>
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
              <ExPanel style={{  padding:'10px', borderRadius: '7px' }} >
          
                    <div style={{ zoom:'90%', margin :'7px' }} onClick={dropdown}>Fiat wallet         </div> <br/> 
                    <div  id="fiat" style={{ display:'none' }}><WalletForm/> </div>
                 
                </ExPanel>
                {/* Navigation Icons */}
                   <div><FootNavig/></div>
            </AppContainer>
        </StyledApp>
    );
    
}
 
export default Register;
