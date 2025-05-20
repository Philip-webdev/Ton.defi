

import styled from "styled-components";
import '../index.css';
import { BsApp, BsArrowLeftCircle, BsCashStack, BsHouse, BsLightningCharge, BsShop, BsWallet2 } from "react-icons/bs";
import { Button } from "./styled/styled";
import { useState } from "react";

const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  margin:0;
font-family: Lexend;

   @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
      color: white ;
  }
  min-height: 100vh;
  padding: 20px 20px;
   zoom :90%;
`;

const Icon = styled.div`
background-color: white;
 border-radius:7px;  
  
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

const StyledLabel = styled.label`
  font-size: 14px;
  margin-bottom: 4px;
  font-family: Lexend;
  color: #333;
  @media (prefers-color-scheme: dark) {
    color: #ccc;
  }
`;

function settings(){

  const [phoneNum,  setPhone] = useState<any>();
  const [walletAddress,  setAddress] = useState('');

  const address = document.getElementById('address') as HTMLInputElement;
  if (address != null){
  setAddress(address.value);
}

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
          <div>
            Set Phone number as address
          </div><br/>
          <StyledInputWrapper>
             
            <StyledInput
              id="phone"
              placeholder="Enter your phone number"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
            />
          </StyledInputWrapper><br/>


          <div><StyledInputWrapper> <StyledInput
              id="address"
              placeholder="Enter your address"
              type="decimal"
              inputMode="text"
              autoComplete="text"
            />
            </StyledInputWrapper>
              </div>
              <br/> 
          <div style={{justifyContent:'center'}}><Button style={{border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px'}} onClick={matchAddress}>Match Address</Button></div>
       
      <Icon className="nav" style={{left:'0',  bottom:'0%', display:'flex',justifyContent:'space-evenly' ,height:'fit-content',  width:'100%', paddingBottom:'10px', paddingRight:'10px',position:'fixed' }}>
                                           <a href='#/home' style={{color:'grey', textDecoration:'none'}}> 
                                           <Button  style={{  fontFamily: 'Lexend' , bottom:'0%',  background:'none', color:"grey"}}><BsHouse />{/*<img src='https://i.imgur.com/uxozY7V.png' height='14px' width='14px' />*/}
                                           <p style={{zoom:'100%'}}>Home</p> </Button></a>
                                            <a href='#/send' style={{color:'grey', textDecoration:'none'}}> <Button  style={{  fontFamily: 'Lexend' ,bottom:'0%',  background:'none', color:"grey"}}><BsWallet2 />{/*<img src="https://i.imgur.com/hCrmXO1.png" height='14px' width='14px'/> */}
                                           <p style={{zoom:'100%'}}>Wallet</p></Button></a>
                                           <a href='#/market' style={{color:'grey', textDecoration:'none'}}>  <Button style={{  fontFamily: 'Lexend' ,bottom:'0%',  background:'none', color:"grey"}}><BsApp/> {/*<img src="https://i.imgur.com/loOhRv0.png" height='14px' width='14px' /> */}
                                             <p style={{zoom:'100%'}}>Apps</p></Button></a> 
                                             <a href='#/discover' style={{color:'grey', textDecoration:'none'}}>
                                             <Button  style={{ fontFamily: 'Lexend' ,bottom:'0%', background:'none', color:"grey"}}><BsLightningCharge />{/*<img src='https://i.imgur.com/S444rBc.png'height='14px' width='14px'/>*/}
                                             <p style={{zoom:'100%'}}>Discover</p> </Button></a>
                                           </Icon> 
        </AppContainer>
    </StyledApp>
);
}

export default settings;