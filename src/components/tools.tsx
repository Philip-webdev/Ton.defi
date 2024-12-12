import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "./styled/styled";
import '../index.css';

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
        <AppContainer>
            <div style={{  justifyContent:'space-around', background:'white', borderRadius:'10px'}}>
              <div style={{display: 'flex'  , gap:'17px',padding:'20px', borderColor:'whitesmoke', borderBottomStyle:'groove', borderWidth:'2px'}}>
                <div><img src='https://i.imgur.com/xFizwPR.png' height='14px' width='14px'/></div>
                <div style={{lineHeight:'16px', color:'grey'}}>Settings</div>
                </div>
                <div style={{display: 'flex'  , gap:'17px', padding:'20px', borderColor:'whitesmoke', borderBottomStyle:'groove', borderWidth:'2px'}}>
                <div><img src='https://i.imgur.com/LdWdpsV.png' height='14px' width='14px'/></div>
                <div style={{lineHeight:'16px', color:'grey'}}>Security</div>
                </div>
                <div style={{display: 'flex'  , gap:'17px', padding:'20px', borderColor:'whitesmoke', borderBottomStyle:'groove', borderWidth:'2px'}}>
                <div><img src='https://i.imgur.com/pPd4oOS.png' height='14px' width='14px'/></div>
                <div style={{lineHeight:'16px', color:'grey'}}>Contact us</div>
                </div>
                <div style={{display: 'flex'  , gap:'17px', padding:'20px'}}>
                <div ><img src='https://i.imgur.com/6YJJ2fI.png' height='14px' width='14px'/></div>
                <div style={{lineHeight:'16px', color:'grey'}}>Agenda</div>
                </div>
            </div>
        </AppContainer>
    </StyledApp>
)
}

export default tools;