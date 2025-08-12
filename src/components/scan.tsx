import "../App.css";
import '../index.css';
import styled from "styled-components";
import { Button } from "../components/styled/styled";
import "@twa-dev/sdk";
import {   BsCopy  } from "react-icons/bs";
    import FootNavig from "./footnavig";
import   { useState } from 'react';
 
import QRScanner from "./QRcode";

const StyledApp = styled.div`
  background-color:  #F9F9F9;
  color:inherit;
  
  font-family: Lexend;
  @media (prefers-color-scheme: dark) {
     background-color: rgb(33,33,33);
      color: white ;
  }
  min-height: 250vh;
  padding: 20px 20px;
  margin:0;
  
   zoom :100%;
`;

const AppContainer = styled.div`
  
  margin: 0;
`;
 

 function scan() {
  
  const [result, setResult] = useState(<div></div>);
 
 function copy() {
   
   var copyText = document.getElementById('res') as HTMLDivElement;

  
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
  return (
    <StyledApp >

      <AppContainer>
        <h1 style={{textAlign:"center"}}>Scan</h1>
       <div id='ton-qr'  style={{display: 'flex', justifyContent:'center', marginLeft:'10px'  }}><QRScanner onRender={(address: string) =>  setResult(<div>{address}<BsCopy onClick={copy}/></div>)} />
        <div id="res"  style={{color:'blue', padding: '10px', textAlign:"center", transform: 'translate(-50%, -50%)', position:'absolute'}}>{result} </div>
       </div>     
    <br/>
  <a href="#/send" style={{textDecoration:'none', textDecorationLine:'none'}}><Button style={{display: 'flex', justifyContent:'center' , bottom:'0'}}>Back to Send</Button></a>
  <div><FootNavig/></div>
      </AppContainer>
    </StyledApp>
  );
}

export default scan;
