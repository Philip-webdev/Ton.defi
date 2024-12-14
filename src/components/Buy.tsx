
import styled from "styled-components";
import '../index.css';
import { BsArrowLeftCircle } from "react-icons/bs";
import { Button } from "./styled/styled";
const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  border-radius: 17px;
    position:  ;
    font-family: Lexend ;
  @media (prefers-color-scheme: dark) {
    background-color:  #F9F9F9;

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

function buy(){
return(
    <StyledApp>
        <AppContainer>


        <a href='#/' style={{ textDecoration:'none'}}><BsArrowLeftCircle style={{color:'#4B96FF', height:'20px', width:'20px'}}/> </a>
        <br/>
<h3>Buy & Sell crypto</h3>
        <div style={{  justifyContent:'space-around', background:'white', borderRadius:'10px'}}>
<div style={{display: 'flex'  , gap:'17px',padding:'20px', borderColor:'whitesmoke', borderBottomStyle:'groove', borderWidth:'2px'}}><img src='https://i.imgur.com/k5hxjjq.png' height='20px' width='20px' style={{borderRadius:'100%'}} /><div style={{marginLeft:'7px'}}><a href="https://exchange.mercuryo.io/" style={{color:'black', textDecoration:'none'}}>Mercuryo</a></div></div>
  <div  style={{display: 'flex'  , gap:'17px',padding:'20px', borderColor:'whitesmoke', borderBottomStyle:'groove', borderWidth:'2px'}}><img src='https://i.imgur.com/d5IDxCo.jpeg' height='20px' width='20px' style={{borderRadius:'100%'}} /><div  style={{marginLeft:'7px'}}><a href="https://global.transak.com/" style={{color:'black', textDecoration:'none'}}>Transak</a></div></div>
  <div  style={{display: 'flex'  , gap:'17px',padding:'20px', borderColor:'whitesmoke', borderBottomStyle:'groove', borderWidth:'2px'}}><img src='https://i.imgur.com/lP16Nne.png' height='20px' width='20px' style={{borderRadius:'100%'}} /><div  style={{marginLeft:'7px'}}><a href="https://ramp.alchemypay.org/#/index" style={{color:'black', textDecoration:'none'}}>Alchemypay</a></div></div>
  </div>

        <div style={{right:'0.1%', bottom:'0%', display:'flex',justifyContent:'space-evenly' ,height:'fit-content',background:'white', width:'100%', paddingBottom:'10px', paddingRight:'10px',position:'fixed', borderRadius:'7px'}}>
                    <a href='#/' style={{color:'black', textDecoration:'none'}}> 
                    <Button  style={{  fontFamily: 'Lexend' ,  marginLeft:'20px',bottom:'0%', marginRight:'20px', background:'none', color:"black"}}><img src='https://i.imgur.com/uxozY7V.png' height='14px' width='14px' />
                    <p style={{zoom:'80%'}}>Home</p> </Button></a>
                    <a href='#/send' style={{color:'black', textDecoration:'none'}}> <Button  style={{  fontFamily: 'Lexend' ,bottom:'0%', marginRight:'20px', background:'none', color:"black"}}><img src="https://i.imgur.com/hCrmXO1.png" height='14px' width='14px'/>
                    <p style={{zoom:'80%'}}>Wallet</p></Button></a>
                    <a href='#/market' style={{color:'black', textDecoration:'none'}}>  <Button style={{  fontFamily: 'Lexend' ,bottom:'0%', marginRight:'20px', background:'none', color:"black"}}> <img src="https://i.imgur.com/loOhRv0.png" height='14px' width='14px' /> 
                      <p style={{zoom:'80%'}}>Market</p></Button></a>
                       <a href='#/discover' style={{color:'black', textDecoration:'none'}}><Button  style={{ fontFamily: 'Lexend' ,bottom:'0%', background:'none', color:"black"}}><img src='https://i.imgur.com/S444rBc.png'height='14px' width='14px'/>
                      <p style={{zoom:'80%'}}>Discover</p> </Button></a>
                    </div>
        
        </AppContainer>
    </StyledApp>
)
}

export default buy;