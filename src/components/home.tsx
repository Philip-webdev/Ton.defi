import { useEffect, useState } from "react";
import Api from "./api";
import '../index.css';
import styled from "styled-components";
import { Button } from "./styled/styled";
import 'react-icons/bs';
import 'react-icons/fa';
import { Helmet } from 'react-helmet';
 

const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
font-family: Lexend ;
  border-radius:7px;
  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 120vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  width: 100%;
  height:fit-content;
  margin: 0;
`;
function home(){
    const slide = ()=>{
        const slideContents = document.getElementById('slideContents');
        const slideContainer = document.getElementById('slideContainer');
        var currentIndex = 0;
        function changeSlide(){
            const slidex = ['1', '2'];
            currentIndex = (currentIndex + 1) % slidex.length;
            if (slideContents != null){
            slideContents.style.transform = 'translateX(' + (currentIndex * -67.5) + 'px)';
    
            }
        }
        setInterval(changeSlide, 2000);
       }
    useEffect(()=>{
       slide();} ,[])

       const [AccountName, setAccountName] = useState('Dummy name');
       const [AccountBalance, setAccountBalance] = useState('***')
       useEffect(()=>{
        fetch('https://twa-backend-g83o.onrender.com/walletdetails').then((res) => res.json())
              .then((result) => {
                console.log(result);
                setAccountName(result.walletName);
                })
                
                .catch((error) => console.log(error));
      });

      useEffect(()=>{
        fetch('https://twa-backend-g83o.onrender.com/AccBalance').then((res) => res.json())
              .then((result) => {
                console.log(result);
                setAccountBalance(result.responseBody.availableBalance);
                })
                
                .catch((error) => console.log(error));
      });
      
    return(
        <StyledApp>
            
            <AppContainer>
                <div>
                    <div  id="header" style={{display:'flex', justifyContent:'space-between', margin:'0',fontFamily: 'Lexend'}}>
                      <div>
                      <img src='https://i.imgur.com/yRr0m7B.png' height='14px' width='14px'/></div><div style={{fontFamily: 'Lexend'}}> <a href='#/register' style={{color:'black', textDecoration:'none'}}> My Account </a></div><div><img src="https://i.imgur.com/0DG5nGo.png" height='14px' width='14px'/>
                    </div>
                    </div><br/>
                    <div id="showcase" style={{ color: 'white', height:'150px', width: '100%', margin:'auto', marginTop:'5%',marginBottom:'5%',fontFamily: 'Lexend', backgroundImage :'linear-gradient(to top  right, #00178F, #4B96FF, #CBD8E8)', borderRadius:'10px'}}><p style={{paddingLeft:'7px',paddingTop:'7px',zoom:'90%'}}>Wallet Balance</p>
                    <p style={{paddingLeft:'7px',color:'white' ,fontWeight:'600'}}>{AccountName}</p><br/>
                    <p style={{paddingLeft:'7px', fontWeight:'600'}}>{AccountBalance}</p></div>

                <div style={{fontFamily: 'Lexend',display:'flex',background :'white', justifyContent:'space-around', borderRadius:'7px', borderStyle:'groove', borderColor:'white', borderWidth:'1px'}}>
                    
                <div style={{borderRadius:'100%',  padding:'10px'}}><a style={{textDecoration:'none'}} href='#/send'><img src="https://i.imgur.com/pEwpEBs.png" height='24px' width='24px'/></a></div>
                <div style={{borderRadius:'100%',  padding:'10px'}}><a style={{textDecoration:'none'}} href='#/buy'><img src="https://i.imgur.com/gayUD73.png" height='24px' width='24px'/></a></div>
                <div style={{borderRadius:'100%',  padding:'10px'}}><a style={{textDecoration:'none'}} href='#/swap'><img src="https://i.imgur.com/ajZ5VgY.png" height='24px' width='24px'/></a></div></div>
                   <br/>

                <div style={{ margin:'0', width:'100%', justifyContent:'center'}}>
    <div  id='slideContainer' style={{zIndex:'0',marginLeft:'10px' , width:'100%', height:'fit-content', overflow:'hidden',  border:'none', borderRadius:'7px', justifySelf:'center'}}>
        <div id='slideContents' style={{height:'fit-content', width:'auto', display:'flex',  transition:'1s ease'}}>
{/* <img src='src/components/WhatsApp_Image_2024-11-29_at_07.00.35_1f4f8a03-removebg-preview.png' height='500px' width='auto'/> */}
<img src='https://i.imgur.com/BbaNXnn.png' height='auto' width='auto' style={{borderRadius:'7px'}}/>
<img src='https://i.imgur.com/UBMXOLK.png' height='auto' width='auto' style={{marginLeft:'7px',borderRadius:'7px'}}/>
        </div></div>
    
</div> 
<br/> <br/>
<div>
    <div style={{display :'flex', background:"white", alignContent:'center', borderRadius:'7px', width:'fit-content'}}><div style={{padding:'10px',borderRightColor:'red', borderStyle:'groove', borderLeft:'none',borderTop:'none',borderBottom:'none',borderWidth:'1px'}}>Tokens</div><div style={{color:"grey", padding:'10px'}}>NFTs</div></div>
</div> <br/> <br/>
<div style={{background:'white',padding:'10px',borderRadius:'7px', height:'fit-content',width:'fit-content'}}>
    <Api/>
    
</div>
                </div>

                <div style={{right:'0.1%', bottom:'0%', display:'flex',justifyContent:'space-evenly' ,height:'fit-content',background:'white', width:'100%', paddingBottom:'10px', paddingRight:'10px',position:'fixed', borderRadius:'7px'}}>
            <a href='#/fav' style={{color:'black', textDecoration:'none'}}> 
            <Button  style={{  fontFamily: 'Lexend' ,  marginLeft:'20px',bottom:'0%', marginRight:'27px', background:'none', color:"black"}}><img src='https://i.imgur.com/uxozY7V.png' height='14px' width='14px' />
            <p style={{zoom:'80%'}}>Home</p> </Button></a>
            <a href='#/Checkout' style={{color:'black', textDecoration:'none'}}> <Button  style={{  fontFamily: 'Lexend' ,bottom:'0%', marginRight:'30px', background:'none', color:"black"}}><img src="https://i.imgur.com/hCrmXO1.png" height='14px' width='14px'/>
            <p style={{zoom:'80%'}}>wallet</p></Button></a>
            <a href='#/orders' style={{color:'black', textDecoration:'none'}}>  <Button style={{  fontFamily: 'Lexend' ,bottom:'0%', marginRight:'27px', background:'none', color:"black"}}> <img src="https://i.imgur.com/loOhRv0.png" height='14px' width='14px' /> 
              <p style={{zoom:'80%'}}>market</p></Button></a> <a href='#/task' style={{color:'black', textDecoration:'none'}}><Button  style={{ fontFamily: 'Lexend' ,bottom:'0%', background:'none', color:"black"}}><img src='https://i.imgur.com/S444rBc.png'height='14px' width='14px'/>
              <p style={{zoom:'80%'}}>Discover</p> </Button></a>
            </div>
            </AppContainer>
        </StyledApp>
    )
}

export default home;