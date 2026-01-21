import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import Send from "./Send";
import { CurrencyIcon, LucideDroplet, SendHorizonal, SendIcon } from "lucide-react";
import { BsCashStack, BsCurrencyExchange } from "react-icons/bs";
import { FaExchangeAlt } from "react-icons/fa";



const TypeOf = styled.div`
border-style: solid;
border-left: none;
border-top: none;
border-bottom: none;
padding: 7px;
border-width: 2px;

`;
const Icn = styled.div`
background-color: white;
 border-radius:20px;  
 justify-content:center;
  padding:40px;
  color: gray;
 @media (prefers-color-scheme: dark) {
     background-color: rgb(1, 1, 1);
     
        padding:40px;
        
  }
`;


const ctanavig = () => {
   const navigate = useNavigate();
  return (
  <div>
<div style={{fontFamily: 'Lexend',display:'flex', justifyContent:'flex-start', flexDirection:'row', gridTemplateColumns:'20px 20px', zoom:'90%', borderRadius:'7px', width:'inherit'}}>
                    
                <div style={{borderRadius:'100%',  padding:'10px'}} ><a style={{textDecoration:'none'}} href='#/send'>

                <Icn><SendIcon style={{scale:'1.5'}}/><br/><div ><small>Send</small></div></Icn></a>                
                </div>

                <div style={{borderRadius:'100%',  padding:'10px'}} ><a style={{textDecoration:'none'}} href='#/register'>

                <Icn><LucideDroplet style={{scale:'1.5'}} /><br/><div><small>Get</small></div></Icn></a>                
                </div>

                <div style={{borderRadius:'100%',  padding:'12px'}} ><a style={{textDecoration:'none'}} href='#/buy'>

                <Icn> <BsCurrencyExchange style={{scale:'1.7'}} /><br/><div><small>Change</small></div></Icn></a>                
                </div>


                {/* <div style={{borderRadius:'100%',  padding:'10px',}} > 
                  <a style={{textDecoration:'none'}} href='#/register'>
                  <Icn style={{width:'150px', height:'150px' }}>
                <LucideDroplet /> <br/><p>Receive Coin</p></Icn></a>
                </div> */}

                {/* <div style={{borderRadius:'100%',  padding:'10px'}} >
                  <a style={{textDecoration:'none'}} href='#/buy'>
                <Icn style={{width:'150px', height:'150px'}}>
                  <BsCashStack /><br/><p style={{marginTop:'30%', marginLeft:'20%'}}>Buy Tokens</p></Icn></a>
                </div> */}
                {/* <div style={{borderRadius:'100%',  padding:'10px'}} ><a style={{textDecoration:'none'}} href='#/swap'>
                <Icn style={{width:'150px', height:'150px'}}><FaExchangeAlt  />
                <br/><p style={{marginTop:'30%', marginLeft:'30%'}}>swap</p></Icn></a>
                </div> */}
                
                </div>
  </div>
  );
};

export default ctanavig;
