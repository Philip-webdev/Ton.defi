

import styled from "styled-components";
import '../index.css';
import { BsApp, BsArrowLeftCircle, BsCashStack, BsHouse, BsLightningCharge, BsShop, BsWallet2 } from "react-icons/bs";
import { Button } from "./styled/styled";
import { useState } from "react";
import FootNavig from './footnavig';
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

const Icon = styled.div`
  background-color: white;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: rgb(15,15,15);
    color: grey;
  }
`;

const AppContainer = styled.div`
   width: 100%;
  height:fit-content;
  margin: 0;
  font-family: Lexend ;
`;

const StyledInputWrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  font-family: Lexend;
  background: white;
  color: black;
  @media (prefers-color-scheme: dark) {
    background: rgb(15,15,15);
    color: white;
    border: 1px solid #444;
  }
`;

  

function settings(){

  const [phoneNum,  setPhone] = useState<any>();
  const [walletAddress,  setAddress] = useState('');

  const address = document.getElementById('address') as HTMLInputElement;
  if (address != null){
  setAddress(address.value);
}
const dropdown1 = () => {
   
  const section = document.getElementsByClassName('phonewrap')[0] as HTMLElement | null;

  if (section != null && section.style.display == 'block') {
      section.style.display = 'none'; 
  } else if(section != null) {
    section.style.display = 'block';
  }
};
const dropdown2 = () => {

  const section = document.getElementsByClassName('monnifywrap')[0] as HTMLElement | null;

  if (section != null && section.style.display == 'block') {
      section.style.display = 'none'; 
  } else if(section != null) {
    section.style.display = 'block';
  }
};

  const matchAddress = () => {
    const phoneElem = document.getElementById("phone")as HTMLInputElement;
    if (phoneElem != null){
      setPhone(phoneElem.value);
    }
    setPhone(phoneElem.value);

    if (phoneElem != null ){

      
      const phoneMap = new Map();
      phoneMap.set({phoneNum}, {walletAddress} );

     fetch("https://twa-backend-g83o.onrender.com/matchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",  
        body: JSON.stringify({phoneMap}),
    })
    }
  }
return(
    <StyledApp>
        <AppContainer>
          <Icon><div  onClick={dropdown1} style={{cursor:'pointer', width:'inherit', height:'inherit', borderRadius:'10px', padding:'10px 20px', marginBottom:'10px'}}>
            Set Phone number as address
          </div></Icon>
           <div className="phonewrap" style={{ display: 'none' }}><br/>
          <StyledInputWrapper  >
             
            <StyledInput
              id="phone"
              placeholder="Enter your phone number"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
            />
          </StyledInputWrapper><br/>


         <StyledInputWrapper  > <StyledInput
              id="address"
              placeholder="Enter your address"
              type="decimal"
              inputMode="text"
              autoComplete="text"
            />
            </StyledInputWrapper>
            
              <br/> 
          <div style={{justifyContent:'center', margin:'auto'}}><Button style={{padding:'10',border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px'}} onClick={matchAddress}>Match Address</Button></div>
            </div>   
        <Icon><div  onClick={dropdown2} style={{cursor:'pointer', width:'inherit', height:'inherit', borderRadius:'10px', padding:'10px 20px', marginBottom:'10px'}}>
           My Fiat Account Number
          </div></Icon><br/>
           <div className="monnifywrap" style={{ display: 'none' }}>{localStorage.getItem("monnifyAccountNumber")}</div>
        <div><FootNavig/></div> 
        </AppContainer>
    </StyledApp>
);
}

export default settings;