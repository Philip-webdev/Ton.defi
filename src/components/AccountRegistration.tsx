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
    position:  ;
    font-family: Lexend ;
   @media (prefers-color-scheme: dark) {
     background-color: rgb(33,33,33);
      color: white ;
  }
  min-height: 100vh;
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
const AppContainer = styled.div`
   width: 100%;
  height:fit-content;
  margin: 0;
  font-family: Lexend ;
`;

const Icon = styled.div`
background-color: white;
   
  
 @media (prefers-color-scheme: dark) {
     background-color: rgb(33,33,33);
        color:grey;
  }
`;
  function Register() {
   
//     const [customerName, setCustomerName] = useState('Customer Name');
//   const [walletName, setWalletname] = useState(' Wallet Name');
//   const [customerEmail, setEmail] = useState('Your Email');
//   const [bvn, setBvn] = useState('Your Bvn Number');
//   const [bvnDateOfBirth, setBvnDateOfBirth] = useState('Your Bvn dob');
// const [walletReference, setWalletreference] = useState("ref563464855848565");
// // const bvnDetail=  {bvn:bvn, bvnDateOfBirth:bvnDateOfBirth }
// // const customer = document.getElementById('customerName')?.nodeValue;
// // const walletN = document.getElementById('walletName')?.nodeValue;
// // const Email = document.getElementById('customerEmail')?.nodeValue;
// // const bvndetails = document.getElementById(' bvnDetails')?.nodeValue;

//    const AccountData = {
//         customerName:customerName,
//         walletName: walletName,
//         customerEmail:  customerEmail,
//         bvnDetails: {bvn:bvn, bvnDateOfBirth:bvnDateOfBirth },
//         walletReference: walletReference
//     };
//     const handleSubmit = async (e: { preventDefault: () => void; }) => {
//         e.preventDefault(); // Prevent the default form submission
  
      
  
//         try {
//             const response = await fetch('https://twa-backend-g83o.onrender.com/api/monnify', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(AccountData), // Convert the data to JSON
//             });
  
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
  
//             const result = await response.json();
//             console.log('Profile saved:', result); // Handle the response as needed
//         } catch (error) {
//             console.error('Error saving profile:', error);
//         }
//     };
   
    // Creating an Ethereum wallet.
const EthereumWallet =  multichainWallet.createWallet({
    network: "ethereum",
});
  
  // Creating a Solana wallet.
  const solanaWallet = multichainWallet.createWallet({
      network: "solana",
  });   
  const [EthereumWalletAddress, setEthereumWalletAddress] = useState('****');
  //setEthereumWalletAddress(EthereumWallet.address);
 
const [SolanaWalletAddress, setSolanaWalletAddress] = useState('****');
//setSolanaWalletAddress(solanaWallet.address);
const chainArray = [solanaWallet,EthereumWallet];


//trials on using the array method
const Address = chainArray.forEach((chain)=>{chain.address});
const privateKey = chainArray.forEach((chain)=>{chain.privateKey});


//renders only onmount and never again to keep addresses immutable
function cleaner(){
    useEffect(()=>{
    Register() ;} ,[{}])
} 
return(
    <StyledApp onLoad={cleaner}> 
    <AppContainer>
        <div >
    <ExPanel onClick={() => setEthereumWalletAddress(EthereumWallet.address)} style={{display: 'flex',   padding:'10px',borderRadius: '7px' }}>
    <div><img src='https://i.imgur.com/dhJjQcO.png' alt=' ' style={{ width: '40px', height: '40px' }} /></div>
     <div style={{display:'inline', pointerEvents:'painted'}}>
        
    <div style={{zoom:'90%', marginLeft:'7px'}}>Ethereum wallet </div> 
        <div style={{zoom:'70%', marginLeft:'8px'}}>{EthereumWalletAddress}</div></div></ExPanel>
<br/> 
    <ExPanel onClick={() => setSolanaWalletAddress(solanaWallet.address)} style={{display: 'flex',     padding:'10px',borderRadius: '7px'}}>
    <div><img src='https://i.imgur.com/rjWW55s.png' alt=' ' style={{ width: '40px', height: '40px' }} /></div> <div style={{display:'inline'}}>  
        <div style={{zoom:'90%',marginLeft:'7px'}}>Solana wallet  </div>
        <div style={{zoom:'70%', marginLeft:'8px'}}>{SolanaWalletAddress}</div></div>
         </ExPanel> 
    {/* <div style={{margin:'auto', width:'fit-content', justifyContent:'center', background:'white', borderRadius:'7px', padding:'10px'}}>
    <div><h1 >Fiat way</h1></div>
<form>
<div className="input-group">
        <input type="text" id="customerName" placeholder={customerName} value={customerName}
             onChange={(e) => setCustomerName(e.target.value)}/>
</div>
    <div className="input-group">
     
        <input type="text" id="walletName" placeholder={walletName} value={walletName}
             onChange={(e) => setWalletname(e.target.value)}/>
    </div>
    <div className="input-group">
        
        <input type="number"  placeholder={bvn} value={bvn}
             onChange={(e) => setBvn(e.target.value)}/>
    </div>
    <div className="input-group">
        
        <input type="text"  placeholder={bvnDateOfBirth} value={bvnDateOfBirth}
             onChange={(e) => setBvnDateOfBirth(e.target.value)}/>
    </div>
    <div className="input-group">
        
        <input type="text"   value={walletReference}
             onFocus={(e) => setWalletreference(e.target.value)}/>
    </div>
    <div className="input-group">
        
        <input type="email"  placeholder={customerEmail} value={customerEmail}
             onChange={(e) => setEmail(e.target.value)}/>
    </div>
    <div className="input-group">
    <div style={{margin:'auto', width:'50%'}}><button  type="button" onClick={handleSubmit}>Open Account</button></div>
    </div>
    </form>
    </div> */}
    
   <Icon className="nav" style={{right:'0.1%', bottom:'0%', display:'flex',justifyContent:'space-evenly' ,height:'fit-content',  width:'100%', paddingBottom:'10px', paddingRight:'10px',position:'fixed' }}>
               <a href='#/' style={{color:'grey', textDecoration:'none'}}> 
               <Button  style={{  fontFamily: 'Lexend' ,  marginLeft:'20px',bottom:'0%', marginRight:'20px', background:'none', color:"grey"}}><BsHouse/>{/*<img src='https://i.imgur.com/uxozY7V.png' height='14px' width='14px' />*/}
               <p style={{zoom:'80%'}}>Home</p> </Button></a>
                <a href='#/send' style={{color:'grey', textDecoration:'none'}}> <Button  style={{  fontFamily: 'Lexend' ,bottom:'0%', marginRight:'20px', background:'none', color:"grey"}}><BsWallet2/>{/*<img src="https://i.imgur.com/hCrmXO1.png" height='14px' width='14px'/> */}
               <p style={{zoom:'80%'}}>Wallet</p></Button></a>
               <a href='#/market' style={{color:'grey', textDecoration:'none'}}>  <Button style={{  fontFamily: 'Lexend' ,bottom:'0%', marginRight:'20px', background:'none', color:"grey"}}><BsShop/> {/*<img src="https://i.imgur.com/loOhRv0.png" height='14px' width='14px' /> */}
                 <p style={{zoom:'80%'}}>Market</p></Button></a> 
                 <a href='#/discover' style={{color:'grey', textDecoration:'none'}}>
                 <Button  style={{ fontFamily: 'Lexend' ,bottom:'0%', background:'none', color:"grey"}}><BsLightningCharge/>{/*<img src='https://i.imgur.com/S444rBc.png'height='14px' width='14px'/>*/}
                 <p style={{zoom:'80%'}}>Discover</p> </Button></a>
               </Icon> </div>
    </AppContainer></StyledApp>
)
}
export default Register;
