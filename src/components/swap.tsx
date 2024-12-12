 
  import { useState } from 'react';
 
import '../index.css';
import styled from "styled-components";
import { Button } from "./styled/styled";
import 'react-icons/bs';
import 'react-icons/fa';
import { Helmet } from 'react-helmet';
 
import   { Web3 } from 'web3';

const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
    border-radius: 17px;
font-family: Lexend ;
  
  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  width: 100%;
  height:fit-content;
  margin: 0;
  font-family: Lexend ;
`;

function swap(){
   const [Count, setCountcalculated] = useState('');



let currentPrice: '2'; 

function ondatainput(){

    const inputElement = document.getElementById('input-number') as HTMLInputElement; // Cast to HTMLInputElement
    if (inputElement) {
        const inputValue = inputElement.value; 
 
        setCountcalculated(inputValue );
         
    } else {
        console.error('Input element not found');
    }
    
}
async function swapTokens(){

    const fromToken = document.getElementById('fromToken') as HTMLInputElement;
    var fromTokenn = fromToken.value;
    const toToken = document.getElementById('toToken') as HTMLInputElement;
    var toTokenn = toToken.value;
    const amount = document.getElementById('amount') as HTMLInputElement;
const ABI = [
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [{ "name": "", "type": "uint256" }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        { "name": "_to", "type": "address" },
        { "name": "_value", "type": "uint256" }
      ],
      "name": "transfer",
      "outputs": [{ "name": "", "type": "bool" }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  var routerAddress = 'routeraddresstffjfjfjeh';
    var amountt = amount.value;

    const web3 = new Web3(window.ethereum);
    if (window.ethereum) {
        console.log('Ethereum provider detected:', window.ethereum);
      } else {
        console.error('No Ethereum provider found. Install MetaMask!');
      }
      
    const accounts = await web3.eth.getAccounts();

    if (!fromToken || !toToken || !amount ) {
        var A= document.getElementById('result');
        if (A != null){
        A.innerText = 'Please fill in all fields.';
        return;}
    }

    try {
        var B = document.getElementById('loader');
        if(B != null)
            B.classList.remove('hidden');
        const fromTokenContract = new web3.eth.Contract(ABI, fromTokenn);
        const toTokenContract = new web3.eth.Contract(ABI, toTokenn);
        await fromTokenContract.methods.approve(routerAddress, amountt).send({from: accounts[0]});
        await toTokenContract.methods.swapExactTokensForTokens(amountt, 0, [fromTokenn, toTokenn], accounts[0], Date.now() + 1000 * 60 * 10).send({from: accounts[0]});
       var alertS = document.getElementById('result')
       if(alertS !=null)
        alertS.innerText = 'Swap successful!';
    } catch (error) {
        var alertE = document.getElementById('result')
        if(alertE != null)
            alertE.innerText = 'Swap failed. Please try again.';
    } finally {
        var fin = document.getElementById('loader')
        if (fin != null)
            fin.classList.add('hidden');
    }
}
    return(
        <StyledApp><Helmet><script src="https://cdn.jsdelivr.net/npm/web3@1.6.0/dist/web3.min.js"></script></Helmet>
            <AppContainer>

<div style={{margin:'auto', width:'fit-content', justifyContent:'center', borderRadius:'7px', background:'white', padding:'10px'}}>
<div><h1>Token Swap</h1></div>
  <form>
<div className="input-group" >
        <label htmlFor="fromToken">From Token:</label>
        <input type="text" id="fromToken" placeholder="Token Address"/>
    </div>
    <div className="input-group">
        <label htmlFor="toToken">To Token:</label>
        <input type="text" id="toToken" placeholder="Token Address"/>
    </div>
    <div className="input-group">
        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" placeholder="Amount"/>
    </div>
    <div style={{margin:'auto', width:'50%'}}> <button id='swapper' type="button" onClick={swapTokens}>Swap Tokens</button></div>
    </form>
    <div id="result"></div>
    <div id="loader" className="hidden"></div>
    </div>
            
                
    <div style={{right:'0.1%', bottom:'0%', display:'flex',justifyContent:'space-evenly' ,height:'fit-content',background:'white', width:'100%', paddingBottom:'10px', paddingRight:'10px',position:'fixed', borderRadius:'7px'}}>
            <a href='#/home' style={{color:'black', textDecoration:'none'}}> 
            <Button  style={{  fontFamily: 'Lexend' ,  marginLeft:'20px',bottom:'0%', marginRight:'27px', background:'none', color:"black"}}><img src='https://i.imgur.com/uxozY7V.png' height='14px' width='14px' />
            <p style={{zoom:'80%'}}>Home</p> </Button></a>
            <a href='#/send' style={{color:'black', textDecoration:'none'}}> <Button  style={{  fontFamily: 'Lexend' ,bottom:'0%', marginRight:'30px', background:'none', color:"black"}}><img src="https://i.imgur.com/hCrmXO1.png" height='14px' width='14px'/>
            <p style={{zoom:'80%'}}>wallet</p></Button></a>
            <a href='#/market' style={{color:'black', textDecoration:'none'}}>  <Button style={{  fontFamily: 'Lexend' ,bottom:'0%', marginRight:'27px', background:'none', color:"black"}}> <img src="https://i.imgur.com/loOhRv0.png" height='14px' width='14px' /> 
              <p style={{zoom:'80%'}}>market</p></Button></a> 
              <a href='#/discover' style={{color:'black', textDecoration:'none'}}>
              <Button  style={{ fontFamily: 'Lexend' ,bottom:'0%', background:'none', color:"black"}}><img src='https://i.imgur.com/S444rBc.png'height='14px' width='14px'/>
              <p style={{zoom:'80%'}}>Discover</p> </Button></a>
            </div>
            </AppContainer>
        </StyledApp>
    )
}

export default swap;

