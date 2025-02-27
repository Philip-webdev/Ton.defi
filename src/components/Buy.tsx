
import styled from "styled-components";
import '../index.css';
import { BsArrowLeftCircle, BsCashStack, BsHouse, BsLightningCharge, BsShop, BsWallet2 } from "react-icons/bs";
import { Button } from "./styled/styled";
const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  border-radius: 17px;
    position:  ;
    font-family: Lexend ;
   @media (prefers-color-scheme: dark) {
     background-color: rgb(33,33,33);
      color: white ;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;
const ExPanel = styled.div`
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

const Icon = styled.div`
background-color: white;
   border-radius:7px; 
  
 @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
        color:grey;
  }
`;

function buy(){
return(
    <StyledApp>
        <AppContainer>


        <a href='#/' style={{ textDecoration:'none'}}><BsArrowLeftCircle style={{color:'#4B96FF', height:'20px', width:'20px'}}/> </a>
        <br/>
<h3>Buy & Sell crypto</h3>
        <div style={{  justifyContent:'space-around',    borderRadius:'10px'}}>
<ExPanel style={{display: 'flex'  , gap:'17px',padding:'20px', borderColor:'whitesmoke', borderBottomStyle:'groove', borderWidth:'1px', borderRadius:'10px'}}><img src='https://i.imgur.com/k5hxjjq.png' height='20px' width='20px' style={{borderRadius:'100%'}} /><div style={{marginLeft:'7px'}}><a href="https://exchange.mercuryo.io/" style={{color:'grey', textDecoration:'none'}}>Mercuryo</a></div></ExPanel>
  <ExPanel  style={{display: 'flex'  , gap:'17px',padding:'20px', borderColor:'whitesmoke', borderBottomStyle:'groove', borderWidth:'1px', borderRadius:'10px'}}><img src='https://i.imgur.com/d5IDxCo.jpeg' height='20px' width='20px' style={{borderRadius:'100%'}} /><div  style={{marginLeft:'7px'}}><a href="https://global.transak.com/" style={{color:'grey', textDecoration:'none'}}>Transak</a></div></ExPanel>
  <ExPanel  style={{display: 'flex'  , gap:'17px',padding:'20px', borderColor:'whitesmoke', borderBottomStyle:'groove', borderWidth:'1px', borderRadius:'10px'}}><img src='https://i.imgur.com/lP16Nne.png' height='20px' width='20px' style={{borderRadius:'100%'}} /><div  style={{marginLeft:'7px'}}><a href="https://ramp.alchemypay.org/#/index" style={{color:'grey', textDecoration:'none'}}>Alchemypay</a></div></ExPanel>
  </div>

          <Icon className="nav" style={{left:'0', right:'0', bottom:'0%', display:'flex',justifyContent:'space-evenly' ,height:'fit-content',  width:'100%', paddingBottom:'10px', paddingRight:'10px',position:'fixed' }}>
                                               <a href='#/home' style={{color:'grey', textDecoration:'none'}}> 
                                               <Button  style={{  fontFamily: 'Lexend' , bottom:'0%',  background:'none', color:"grey"}}><BsHouse/>{/*<img src='https://i.imgur.com/uxozY7V.png' height='14px' width='14px' />*/}
                                               <p style={{zoom:'100%'}}>Home</p> </Button></a>
                                                <a href='#/send' style={{color:'grey', textDecoration:'none'}}> <Button  style={{  fontFamily: 'Lexend' ,bottom:'0%',  background:'none', color:"grey"}}><BsWallet2/>{/*<img src="https://i.imgur.com/hCrmXO1.png" height='14px' width='14px'/> */}
                                               <p style={{zoom:'100%'}}>Wallet</p></Button></a>
                                               <a href='#/market' style={{color:'grey', textDecoration:'none'}}>  <Button style={{  fontFamily: 'Lexend' ,bottom:'0%',  background:'none', color:"grey"}}><BsCashStack/> {/*<img src="https://i.imgur.com/loOhRv0.png" height='14px' width='14px' /> */}
                                                 <p style={{zoom:'100%'}}>Finance</p></Button></a> 
                                                 <a href='#/discover' style={{color:'grey', textDecoration:'none'}}>
                                                 <Button  style={{ fontFamily: 'Lexend' ,bottom:'0%', background:'none', color:"grey"}}><BsLightningCharge/>{/*<img src='https://i.imgur.com/S444rBc.png'height='14px' width='14px'/>*/}
                                                 <p style={{zoom:'100%'}}>Discover</p> </Button></a>
                                               </Icon> 
        
        </AppContainer>
    </StyledApp>
)
}

export default buy;