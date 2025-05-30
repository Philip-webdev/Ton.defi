
import styled from "styled-components";
import '../index.css';
import { Button } from "./styled/styled";
import { BsHouse, BsWallet2, BsShop, BsLightningCharge, BsCashStack, BsApp } from "react-icons/bs";

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
   
  
 @media (prefers-color-scheme: dark) {
     background-color: rgb(33,33,33);
        color:grey;
  }
`;
function tontools(){
return(
    <StyledApp>
       <Icon className="nav" style={{left:'0', right:'0',   bottom:'0%', display:'flex',justifyContent:'space-evenly' ,height:'fit-content',  width:'100%', paddingBottom:'10px', paddingRight:'10px',position:'fixed' }}>
                                            <a href='#/home' style={{color:'grey', textDecoration:'none'}}> 
                                            <Button  style={{  fontFamily: 'Lexend' , bottom:'0%',  background:'none', color:"grey"}}><BsHouse/>{/*<img src='https://i.imgur.com/uxozY7V.png' height='14px' width='14px' />*/}
                                            <p style={{zoom:'100%'}}>Home</p> </Button></a>
                                             <a href='#/send' style={{color:'grey', textDecoration:'none'}}> <Button  style={{  fontFamily: 'Lexend' ,bottom:'0%',  background:'none', color:"grey"}}><BsWallet2/>{/*<img src="https://i.imgur.com/hCrmXO1.png" height='14px' width='14px'/> */}
                                            <p style={{zoom:'100%'}}>Wallet</p></Button></a>
                                            <a href='#/market' style={{color:'grey', textDecoration:'none'}}>  <Button style={{  fontFamily: 'Lexend' ,bottom:'0%',  background:'none', color:"grey"}}><BsApp/>{/*<img src="https://i.imgur.com/loOhRv0.png" height='14px' width='14px' /> */}
                                              <p style={{zoom:'100%'}}>Apps</p></Button></a> 
                                              <a href='#/discover' style={{color:'grey', textDecoration:'none'}}>
                                              <Button  style={{ fontFamily: 'Lexend' ,bottom:'0%', background:'none', color:"grey"}}><BsLightningCharge/>{/*<img src='https://i.imgur.com/S444rBc.png'height='14px' width='14px'/>*/}
                                              <p style={{zoom:'100%'}}>Discover</p> </Button></a>
                                            </Icon> 
    </StyledApp>
)
}

export default tontools;