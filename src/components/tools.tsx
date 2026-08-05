
import styled from "styled-components";
import { Button } from "./styled/styled";
import '../index.css';
import { BsApp, BsArrowLeftCircle, BsCashStack, BsHouse, BsLightningCharge, BsWallet2 } from "react-icons/bs";
import { ArrowLeft } from "lucide-react";

const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  margin:0;
font-family: 'Sora', sans-serif;
  
   @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
      color: white ;
  }
  min-height: 100% ;
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
const AppContainer = styled.div`
   width: 100%;
  height:fit-content;
  margin: 0;
  font-family: 'Sora', sans-serif ;
`;

function tools(){
return(
    <StyledApp>
        <AppContainer> 
            <button style={{background:'transparent', border:'none'}} onClick={() => window.location.href = '#/home'}><ArrowLeft size={18} /></button> 
        <br/><br/>

            <div style={{  justifyContent:'space-around',   borderRadius:'10px'}}>
            <a href='#/settings' style={{ textDecoration:'none'}}><div style={{display: 'flex'  , gap:'17px',padding:'20px', borderColor:'whitesmoke', borderBottomStyle:'solid', borderWidth:'1px'}}>
              <div><img src='https://i.imgur.com/xFizwPR.png' height='20px' width='20px'/></div>
                <div style={{lineHeight:'16px', color:'grey'}}>Settings</div>
                </div></a>

                <a href='#/security' style={{ textDecoration:'none'}}><div style={{display: 'flex'  , gap:'17px', padding:'20px', borderColor:'whitesmoke', borderBottomStyle:'solid', borderWidth:'1px'}}>
                <div><img src='https://i.imgur.com/LdWdpsV.png' height='20px' width='20px'/></div>
                <div style={{lineHeight:'16px', color:'grey'}}>Security</div>
                </div></a>

              <a href='#/contact' style={{ textDecoration:'none'}}>  <div style={{display: 'flex'  , gap:'17px', padding:'20px', borderColor:'whitesmoke', borderBottomStyle:'solid', borderWidth:'1px'}}>
                <div><img src='https://i.imgur.com/pPd4oOS.png' height='20px' width='20px'/></div>
                <div style={{lineHeight:'16px', color:'grey'}}>Contact us</div>
                </div></a>

              <a href='#/agenda' style={{ textDecoration:'none'}}>  <div style={{display: 'flex'  , gap:'17px', padding:'20px',borderColor:'whitesmoke', borderBottomStyle:'solid', borderWidth:'1px'}}>
                <div ><img src='https://i.imgur.com/6YJJ2fI.png' height='20px' width='20px'/></div>
                <div style={{lineHeight:'16px', color:'grey'}}>Agenda</div>
                </div></a>
                <a href='#/organizer' style={{ textDecoration:'none'}}>  <div style={{display: 'flex'  , gap:'17px', padding:'20px'}}>
                <div ><img src='https://i.imgur.com/33uAtB4.png' height='20px' width='20px'/></div>
                <div style={{lineHeight:'16px', color:'grey'}}>Airdrop organizer</div>
                </div></a>
            </div>

             
        </AppContainer>
    </StyledApp>
)
}

export default tools;