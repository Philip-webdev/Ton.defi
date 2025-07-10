
import styled from "styled-components";
import '../index.css';
import { BsApp, BsArrowLeftCircle, BsHouse, BsLightningCharge, BsWallet2 } from "react-icons/bs";
import { Button } from "./styled/styled";
import { useState } from "react";
import FootNavig from './footnavig';
const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  border-radius: 17px;
    zoom :90%;
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
const Icon = styled.div`
  background-color: white;
border-radius:7px; 
  @media (prefers-color-scheme: dark) {
    background-color: rgb(15,15,15);
    color: grey;
  }
`;
function agenda(){
  const[color,  setColor] = useState('grey');

   const styles = {
        color: 'rgb(36, 172, 242)'
       }
      const current = () =>{
      
       setColor(styles.color)
      }
return(
    <StyledApp>
        <AppContainer>
        <a href='#/tools' style={{ textDecoration:'none'}}> <BsArrowLeftCircle style={{color:'#4B96FF', height:'20px', width:'20px'}}/> </a>
       
        <Icon className="nav" style={{left:'0',  bottom:'0%', display:'flex',justifyContent:'space-evenly' ,height:'fit-content',  width:'100%', paddingBottom:'10px', paddingRight:'10px',position:'fixed' }}>
                                            <a href='#/home' style={{color:'grey', textDecoration:'none'}}> 
                                            <Button  style={{  fontFamily: 'Lexend' , bottom:'0%',  background:'none', color:color}} onClick={current}><BsHouse />{/*<img src='https://i.imgur.com/uxozY7V.png' height='14px' width='14px' />*/}
                                            <p style={{zoom:'100%'}}>Home</p> </Button></a>
                                             <a href='#/send' style={{color:'grey', textDecoration:'none'}}> <Button  style={{  fontFamily: 'Lexend' ,bottom:'0%',  background:'none', color:color}} onClick={current}><BsWallet2 />{/*<img src="https://i.imgur.com/hCrmXO1.png" height='14px' width='14px'/> */}
                                            <p style={{zoom:'100%'}}>Wallet</p></Button></a>
                                            <a href='#/market' style={{color:'grey', textDecoration:'none'}}>  <Button style={{  fontFamily: 'Lexend' ,bottom:'0%',  background:'none', color:color}} onClick={current}><BsApp/> {/*<img src="https://i.imgur.com/loOhRv0.png" height='14px' width='14px' /> */}
                                              <p style={{zoom:'100%'}}>Apps</p></Button></a> 
                                              <a href='#/discover' style={{color:'grey', textDecoration:'none'}}>
                                              <Button  style={{ fontFamily: 'Lexend' ,bottom:'0%', background:'none', color:color}} onClick={current}><BsLightningCharge />{/*<img src='https://i.imgur.com/S444rBc.png'height='14px' width='14px'/>*/}
                                              <p style={{zoom:'100%'}}>Discover</p> </Button></a>
                                            </Icon>
        </AppContainer><div><FootNavig/></div> 
    </StyledApp>
)
}

export default agenda;