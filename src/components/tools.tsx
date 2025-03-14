import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "./styled/styled";
import '../index.css';
import { BsArrowLeftCircle, BsCashStack, BsHouse, BsLightningCharge, BsWallet2 } from "react-icons/bs";

const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  margin:0;
font-family: Lexend;
 
   @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
      color: white ;
  }
  min-height: 100% ;
  padding: 20px 20px;
  zoom : 100%;
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

function tools(){
return(
    <StyledApp>
        <AppContainer>  
        <br/><br/>
            <div style={{  justifyContent:'space-around',   borderRadius:'10px'}}>
            <a href='#/settings' style={{ textDecoration:'none'}}><div style={{display: 'flex'  , gap:'17px',padding:'20px', borderColor:'whitesmoke', borderBottomStyle:'groove', borderWidth:'1px'}}>
              <div><img src='https://i.imgur.com/xFizwPR.png' height='20px' width='20px'/></div>
                <div style={{lineHeight:'16px', color:'grey'}}>Settings</div>
                </div></a>

                <a href='#/security' style={{ textDecoration:'none'}}><div style={{display: 'flex'  , gap:'17px', padding:'20px', borderColor:'whitesmoke', borderBottomStyle:'groove', borderWidth:'1px'}}>
                <div><img src='https://i.imgur.com/LdWdpsV.png' height='20px' width='20px'/></div>
                <div style={{lineHeight:'16px', color:'grey'}}>Security</div>
                </div></a>

              <a href='#/contact' style={{ textDecoration:'none'}}>  <div style={{display: 'flex'  , gap:'17px', padding:'20px', borderColor:'whitesmoke', borderBottomStyle:'groove', borderWidth:'1px'}}>
                <div><img src='https://i.imgur.com/pPd4oOS.png' height='20px' width='20px'/></div>
                <div style={{lineHeight:'16px', color:'grey'}}>Contact us</div>
                </div></a>

              <a href='#/agenda' style={{ textDecoration:'none'}}>  <div style={{display: 'flex'  , gap:'17px', padding:'20px',borderColor:'whitesmoke', borderBottomStyle:'groove', borderWidth:'1px'}}>
                <div ><img src='https://i.imgur.com/6YJJ2fI.png' height='20px' width='20px'/></div>
                <div style={{lineHeight:'16px', color:'grey'}}>Agenda</div>
                </div></a>
                <a href='#/organizer' style={{ textDecoration:'none'}}>  <div style={{display: 'flex'  , gap:'17px', padding:'20px'}}>
                <div ><img src='https://i.imgur.com/33uAtB4.png' height='20px' width='20px'/></div>
                <div style={{lineHeight:'16px', color:'grey'}}>Airdrop organizer</div>
                </div></a>
            </div>

            <Icon className="nav" style={{left:'0',  bottom:'0%', display:'flex',justifyContent:'space-evenly' ,height:'fit-content',  width:'100%', paddingBottom:'10px', paddingRight:'10px',position:'fixed' }}>
                                                <a href='#/home' style={{color:'grey', textDecoration:'none'}}> 
                                                <Button  style={{  fontFamily: 'Lexend' , bottom:'0%',  background:'none', color:"grey"}}><BsHouse />{/*<img src='https://i.imgur.com/uxozY7V.png' height='14px' width='14px' />*/}
                                                <p style={{zoom:'100%'}}>Home</p> </Button></a>
                                                 <a href='#/send' style={{color:'grey', textDecoration:'none'}}> <Button  style={{  fontFamily: 'Lexend' ,bottom:'0%',  background:'none', color:"grey"}}><BsWallet2 />{/*<img src="https://i.imgur.com/hCrmXO1.png" height='14px' width='14px'/> */}
                                                <p style={{zoom:'100%'}}>Wallet</p></Button></a>
                                                <a href='#/market' style={{color:'grey', textDecoration:'none'}}>  <Button style={{  fontFamily: 'Lexend' ,bottom:'0%',  background:'none', color:"grey"}}><BsCashStack /> {/*<img src="https://i.imgur.com/loOhRv0.png" height='14px' width='14px' /> */}
                                                  <p style={{zoom:'100%'}}>Finance</p></Button></a> 
                                                  <a href='#/discover' style={{color:'grey', textDecoration:'none'}}>
                                                  <Button  style={{ fontFamily: 'Lexend' ,bottom:'0%', background:'none', color:"grey"}}><BsLightningCharge />{/*<img src='https://i.imgur.com/S444rBc.png'height='14px' width='14px'/>*/}
                                                  <p style={{zoom:'100%'}}>Discover</p> </Button></a>
                                                </Icon> 
        </AppContainer>
    </StyledApp>
)
}

export default tools;