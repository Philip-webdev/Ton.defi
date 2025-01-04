import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "./styled/styled";
import '../index.css';
import * as multichainWallet from 'multichain-crypto-wallet';
import { BsHouse, BsWallet2, BsShop, BsLightningCharge } from "react-icons/bs";

const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  border-radius: 17px;
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

  @media (prefers-color-scheme: dark) {
    background-color: rgb(33,33,33);
    color: grey;
  }
`;


function Register() {

  
    const [EthereumWalletAddress, setEthereumWalletAddress] = useState('');
    const [BitcoinWalletAddress, setBitcoinWalletAddress] = useState('');
    const [SolanaWalletAddress, setSolanaWalletAddress] = useState('');

    const createWallets = () => {
      const bitcoinWallet = multichainWallet.createWallet({ network: 'bitcoin' });
        const ethereumWallet = multichainWallet.createWallet({ network: "ethereum" });
        const solanaWallet = multichainWallet.createWallet({ network: "solana" });

        setBitcoinWalletAddress(bitcoinWallet.address);
        setEthereumWalletAddress(ethereumWallet.address);
        setSolanaWalletAddress(solanaWallet.address);

        // Save wallet addresses to local storage as a fallback
        localStorage.setItem('ethereumWallet', ethereumWallet.address);
        localStorage.setItem('bitcoinWallet', bitcoinWallet.address);
        localStorage.setItem('solanaWallet', solanaWallet.address);
    };
   


    useEffect(() => {
        // Load wallet addresses from local storage
        const ethAddress = localStorage.getItem('ethereumWallet');
        const bitAddress = localStorage.getItem('bitcoinWallet');
        const solAddress = localStorage.getItem('solanaWallet');

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
    }, []); // Run this effect only once
    
     

    return (
        <StyledApp>
            <AppContainer> 
            <ExPanel style={{ display: 'flex', padding:'10px', borderRadius: '7px' }}>
                    <div>
                        <img src='https://i.imgur.com/sSYmdfQ.png' alt='bitcoin' style={{ width: '40px', height: '40px' }} />
                    </div>
                    <div style={{ display:'inline', pointerEvents:'painted' }}>
                        <div style={{ zoom:'90%', marginLeft:'7px' }}>Bitcoin wallet</div> 
                        <div style={{ zoom:'57%', marginLeft:'8px', width:'fit-content' }}>{BitcoinWalletAddress}</div>
                    </div>
                </ExPanel>
                <br/> 
                <ExPanel style={{ display: 'flex', padding:'10px', borderRadius: '7px' }}>
                    <div>
                        <img src='https://i.imgur.com/dhJjQcO.png' alt='Ethereum' style={{ width: '40px', height: '40px' }} />
                    </div>
                    <div style={{ display:'inline', pointerEvents:'painted' }}>
                        <div style={{ zoom:'90%', marginLeft:'7px' }}>Ethereum wallet</div> 
                        <div style={{ zoom:'57%', marginLeft:'8px', width:'fit-content' }}>{EthereumWalletAddress}</div>
                    </div>
                </ExPanel>
                <br/> 
                <ExPanel style={{ display: 'flex', padding:'10px', borderRadius: '7px' }}>
                    <div>
                        <img src='https://i.imgur.com/rjWW55s.png' alt='Solana' style={{ width: '40px', height: '40px' }} />
                    </div> 
                    <div style={{ display:'inline' }}>  
                        <div style={{ zoom:'90%', marginLeft:'7px' }}>Solana wallet</div>
                        <div style={{ zoom:'57%', marginLeft:'8px', width:'fit-content' }}>{SolanaWalletAddress}</div>
                    </div>
                </ExPanel>

                {/* Navigation Icons */}
                <Icon className="nav" style={{ right:'0.1%', bottom:'0%', display:'flex', justifyContent:'space-evenly', height:'fit-content', width:'100%', paddingBottom:'10px', paddingRight:'10px', position:'fixed' }}>
                    <a href='#/' style={{ color:'grey', textDecoration:'none'}}> 
                        <Button style={{ fontFamily: 'Lexend', marginLeft:'20px', bottom:'0%', marginRight:'20px', background:'none', color:"grey" }}>
                            <BsHouse />
                            <p style={{ zoom:'80%' }}>Home</p> 
                        </Button>
                    </a>
                    <a href='#/send' style={{ color:'grey', textDecoration:'none'}}> 
                        <Button style={{ fontFamily: 'Lexend', bottom:'0%', marginRight:'20px', background:'none', color:"grey" }}>
                            <BsWallet2 />
                            <p style={{ zoom:'80%' }}>Wallet</p>
                        </Button>
                    </a>
                    <a href='#/market' style={{ color:'grey', textDecoration:'none'}}>  
                        <Button style={{ fontFamily: 'Lexend', bottom:'0%', marginRight:'20px', background:'none', color:"grey" }}>
                            <BsShop />
                            <p style={{ zoom:'80%' }}>Market</p>
                        </Button>
                    </a> 
                    <a href='#/discover' style={{ color:'grey', textDecoration:'none'}}>
                        <Button style={{ fontFamily: 'Lexend', bottom:'0%', background:'none', color:"grey" }}>
                            <BsLightningCharge />
                            <p style={{ zoom:'80%' }}>Discover</p> 
                        </Button>
                    </a>
                </Icon> 
            </AppContainer>
        </StyledApp>
    );
    
}
 
export default Register;
