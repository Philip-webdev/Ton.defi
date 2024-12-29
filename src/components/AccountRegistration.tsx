import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "./styled/styled";
import '../index.css';
import * as multichainWallet from 'multichain-crypto-wallet';
import { BsHouse, BsWallet2, BsShop, BsLightningCharge } from "react-icons/bs";
import { useCloudStorage } from '@vkruglikov/react-telegram-web-app'; // Importing the hook

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
    const storage = useCloudStorage(); // Initialize cloud storage hook
    const [EthereumWalletAddress, setEthereumWalletAddress] = useState('');
    const [SolanaWalletAddress, setSolanaWalletAddress] = useState('');

    // Function to create wallets
    const createWallets = () => {
        const ethereumWallet = multichainWallet.createWallet({ network: "ethereum" });
        const solanaWallet = multichainWallet.createWallet({ network: "solana" });

        // Save wallet addresses to Telegram Cloud Storage
        storage.setItem('ethereumWallet', ethereumWallet.address);
        storage.setItem('solanaWallet', solanaWallet.address);

        // Set the state with the new addresses
        setEthereumWalletAddress(ethereumWallet.address);
        setSolanaWalletAddress(solanaWallet.address);
    };

    // Load wallet addresses from Telegram Cloud Storage on mount
    useEffect(() => {
        const loadWallets = async () => {
            const ethAddress = await storage.getItem('ethereumWallet');
            const solAddress = await storage.getItem('solanaWallet');

            if (ethAddress) {
                setEthereumWalletAddress(ethAddress);
            } else {
                // Create wallets only if they do not exist in storage
                createWallets();
            }

            if (solAddress) {
                setSolanaWalletAddress(solAddress);
            } else {
                // Create wallets only if they do not exist in storage
                createWallets();
            }
        };

        loadWallets();
    }, [storage]); // Run this effect only once

    return (
        <StyledApp>
            <AppContainer>
                <ExPanel style={{ display: 'flex', padding:'10px', borderRadius: '7px' }}>
                    <div>
                        <img src='https://i.imgur.com/dhJjQcO.png' alt='Ethereum' style={{ width: '40px', height: '40px' }} />
                    </div>
                    <div style={{ display:'inline', pointerEvents:'painted' }}>
                        <div style={{ zoom:'90%', marginLeft:'7px' }}>Ethereum wallet</div> 
                        <div style={{ zoom:'70%', marginLeft:'8px' }}>{EthereumWalletAddress}</div>
                    </div>
                </ExPanel>
                <br/> 
                <ExPanel style={{ display: 'flex', padding:'10px', borderRadius: '7px' }}>
                    <div>
                        <img src='https://i.imgur.com/rjWW55s.png' alt='Solana' style={{ width: '40px', height: '40px' }} />
                    </div> 
                    <div style={{ display:'inline' }}>  
                        <div style={{ zoom:'90%', marginLeft:'7px' }}>Solana wallet</div>
                        <div style={{ zoom:'70%', marginLeft:'8px' }}>{SolanaWalletAddress}</div>
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
