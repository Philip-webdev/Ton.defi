import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "./styled/styled";
import '../index.css';
import { BsArrowLeftCircle } from "react-icons/bs";

const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  border-radius: 17px;
    position:  ;
    font-family: Lexend ;
  @media (prefers-color-scheme: dark) {
    background-color: rgb(29, 40, 58);
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

function tools(){
return(
    <StyledApp>
        <AppContainer> <a href='#/home' style={{ textDecoration:'none'}}><BsArrowLeftCircle style={{color:'#4B96FF', height:'20px', width:'20px'}}/></a>
        <br/><br/>
            <div style={{  justifyContent:'space-around', background:'white', borderRadius:'10px'}}>
            <a href='#/settings' style={{ textDecoration:'none'}}><div style={{display: 'flex'  , gap:'17px',padding:'20px', borderColor:'whitesmoke', borderBottomStyle:'groove', borderWidth:'2px'}}>
              <div><img src='https://i.imgur.com/xFizwPR.png' height='20px' width='20px'/></div>
                <div style={{lineHeight:'16px', color:'grey'}}>Settings</div>
                </div></a>

                <a href='#/security' style={{ textDecoration:'none'}}><div style={{display: 'flex'  , gap:'17px', padding:'20px', borderColor:'whitesmoke', borderBottomStyle:'groove', borderWidth:'2px'}}>
                <div><img src='https://i.imgur.com/LdWdpsV.png' height='20px' width='20px'/></div>
                <div style={{lineHeight:'16px', color:'grey'}}>Security</div>
                </div></a>

              <a href='#/contact' style={{ textDecoration:'none'}}>  <div style={{display: 'flex'  , gap:'17px', padding:'20px', borderColor:'whitesmoke', borderBottomStyle:'groove', borderWidth:'2px'}}>
                <div><img src='https://i.imgur.com/pPd4oOS.png' height='20px' width='20px'/></div>
                <div style={{lineHeight:'16px', color:'grey'}}>Contact us</div>
                </div></a>

              <a href='#/agenda' style={{ textDecoration:'none'}}>  <div style={{display: 'flex'  , gap:'17px', padding:'20px'}}>
                <div ><img src='https://i.imgur.com/6YJJ2fI.png' height='20px' width='20px'/></div>
                <div style={{lineHeight:'16px', color:'grey'}}>Agenda</div>
                </div></a>
            </div>

            <div style={{right:'0.1%', bottom:'0%', display:'flex',justifyContent:'space-evenly' ,height:'fit-content',background:'white', width:'100%', paddingBottom:'10px', paddingRight:'10px',position:'fixed', borderRadius:'7px'}}>
            <a href='#/home' style={{color:'black', textDecoration:'none'}}> 
            <Button  style={{  fontFamily: 'Lexend' ,  marginLeft:'20px',bottom:'0%', marginRight:'27px', background:'none', color:"black"}}><img src='https://i.imgur.com/uxozY7V.png' height='20px' width='20px' />
            <p style={{zoom:'80%'}}>Home</p> </Button></a>
            <a href='#/send' style={{color:'black', textDecoration:'none'}}> <Button  style={{  fontFamily: 'Lexend' ,bottom:'0%', marginRight:'30px', background:'none', color:"black"}}><img src="https://i.imgur.com/hCrmXO1.png" height='20px' width='20px'/>
            <p style={{zoom:'80%'}}>wallet</p></Button></a>
            <a href='#/market' style={{color:'black', textDecoration:'none'}}>  <Button style={{  fontFamily: 'Lexend' ,bottom:'0%', marginRight:'27px', background:'none', color:"black"}}> <img src="https://i.imgur.com/loOhRv0.png" height='20px' width='20px' /> 
              <p style={{zoom:'80%'}}>market</p></Button></a> 
              <a href='#/discover' style={{color:'black', textDecoration:'none'}}>
              <Button  style={{ fontFamily: 'Lexend' ,bottom:'0%', background:'none', color:"black"}}><img src='https://i.imgur.com/S444rBc.png'height='20px' width='20px'/>
              <p style={{zoom:'80%'}}>Discover</p> </Button></a>
            </div>
        </AppContainer>
    </StyledApp>
)
}

export default tools;