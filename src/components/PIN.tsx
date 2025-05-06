import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "./styled/styled";
import '../index.css';
import { BsHouse, BsWallet2, BsShop, BsLightningCharge, BsCashStack, BsCashCoin, BsCash, BsApp } from "react-icons/bs";
  


const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  margin:0;
font-family: Lexend;
 zoom :90%;
   @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
      color: white ;
  }
    min-height: 250vh;
  ;
  padding: 20px 20px;
`;

const Icon = styled.div`
background-color: white;
   border-radius:7px; 
  
 @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
        color:grey;
  }
`;
 const ExPanelPIN = styled.div`
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




function PIN() {
  const [plan,  setPlan] = useState<string>("");
const [Phone,  setPhone] = useState<number>();
const [DurationByPlan,  setDuration] = useState<string>("");

if (plan == 'monthly'){
    setDuration('30 days')
}
else if (plan == 'weekly')
{
    setDuration('7 days')
}
else {
    setDuration('1 day')
}

return(
    <StyledApp>
    <AppContainer>
    <h3 style={{textAlign: "center"}}>Web3charge</h3>
        <div style={{  justifyContent:'space-around',    borderRadius:'10px'}}>
<div style={{width:'100px',  height: '20px', borderRadius:'10px'}}>Enter your phone number: {Phone}</div>
<div style={{width:'100px',  height: '20px', borderRadius:'10px'}} >Select plan: {plan}</div>
<Button>Pay Fee</Button>
<div style={{width:'inherit',  height: '20px', borderRadius:'10px'}} >Duration: {DurationByPlan} </div>
  </div>
         <Icon className="nav" style={{left:'0', right:'0', bottom:'0%', display:'flex',justifyContent:'space-evenly' ,height:'fit-content',  width:'100%', paddingBottom:'10px', paddingRight:'10px',position:'fixed' }}>
                                              <a href='#/home' style={{color:'grey', textDecoration:'none'}}> 
                                              <Button  style={{  fontFamily: 'Lexend' , bottom:'0%',  background:'none', color:"grey"}}><BsHouse/>{/*<img src='https://i.imgur.com/uxozY7V.png' height='14px' width='14px' />*/}
                                              <p style={{zoom:'100%'}}>Home</p> </Button></a>
                                               <a href='#/send' style={{color:'grey', textDecoration:'none'}}> <Button  style={{  fontFamily: 'Lexend' ,bottom:'0%',  background:'none', color:"grey"}}><BsWallet2/>{/*<img src="https://i.imgur.com/hCrmXO1.png" height='14px' width='14px'/> */}
                                              <p style={{zoom:'100%'}}>Wallet</p></Button></a>
                                              <a href='#/market' style={{color:'grey', textDecoration:'none'}}>  <Button style={{  fontFamily: 'Lexend' ,bottom:'0%',  background:'none', color:"grey"}}><BsApp/> {/*<img src="https://i.imgur.com/loOhRv0.png" height='14px' width='14px' /> */}
                                                <p style={{zoom:'100%'}}>Apps</p></Button></a> 
                                                <a href='#/discover' style={{color:'grey', textDecoration:'none'}}>
                                                <Button  style={{ fontFamily: 'Lexend' ,bottom:'0%', background:'none', color:"grey"}}><BsLightningCharge/>{/*<img src='https://i.imgur.com/S444rBc.png'height='14px' width='14px'/>*/}
                                                <p style={{zoom:'100%'}}>Discover</p> </Button></a>
                                              </Icon> 
    </AppContainer></StyledApp>
)
}
export default PIN;
