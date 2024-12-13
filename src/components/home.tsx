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
  margin:0;
font-family: Lexend;
  border-radius:7px;
  @media (prefers-color-scheme: dark) {
    background-color: #1B1B1B;
    color: white;
  }
  min-height: 150vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  width: 100%;
  height:fit-content;
  margin: 0;
`;
function Home(){
    const slide = ()=>{
        const slideContents = document.getElementById('slideContents');
        const slideContainer = document.getElementById('slideContainer');
        var currentIndex = 0;
        function changeSlide(){
            const slidex = ['1', '2'];
            currentIndex = (currentIndex + 1) % slidex.length;
            if (slideContents != null){
            slideContents.style.transform = 'translateX(' + (currentIndex * -280.0) + 'px)';
    
            }
        }
        setInterval(changeSlide, 2000);

        const InfoContents = document.getElementById('InfoContents');
        const InfoContainer = document.getElementById('InfoContainer');
        var currentIndex = 0;
        function swipeInfo(){
            const slider = ['1', '2'];
            currentIndex = (currentIndex + 1) % slider.length;
            if (InfoContents != null){
            InfoContents.style.transform = 'translateY(' + (currentIndex * -57.0) + 'px)';
    
            }
        }
        setInterval(swipeInfo, 1000);
       }
    useEffect(()=>{
       slide();} ,[])

       const [AccountName, setAccountName] = useState('Jolah Jemima');
       const [AccountBalance, setAccountBalance] = useState('5,570.45 USD');
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
                      <a href='#/tools' style={{color:'black', textDecoration:'none'}}> <img src='https://i.imgur.com/xFizwPR.png' height='20px' width='20px'/></a></div><div style={{fontFamily: 'Lexend'}}> <a href='#/register' style={{color:'black', textDecoration:'none'}}> My Account </a></div><div><img src="https://i.imgur.com/ErnGd8q.png" height='20px' width='20px'/>
                    </div>
                    </div><br/>
                    <div id="showcase"
                     style={{ color: 'white', height:'90px', width: '100%', margin:'auto', marginTop:'5%',marginBottom:'5%',fontFamily: 'Lexend', background:'#87CEEB', borderRadius:'10px'}}>
                      {/* <p style={{paddingLeft:'7px',paddingTop:'7px',zoom:'90%'}}>Wallet Balance</p>#87CEEB #4B96FF*/}
                    <div style={{paddingLeft:'7px',color:'white' ,fontWeight:'500'}}>{AccountName}</div><br/>
                    <div style={{paddingLeft:'7px', fontWeight:'500'}}>{AccountBalance}</div></div>

                <div style={{fontFamily: 'Lexend',display:'flex',background :'', justifyContent:'space-around', borderRadius:'7px' }}>
                    
                <div style={{borderRadius:'100%',  padding:'10px'}}><a style={{textDecoration:'none'}} href='#/send'><img src="https://i.imgur.com/JwKhVnM.png" height='24px' width='24px'style={{marginLeft:'7px'}}/></a><br/>send</div>
                <div style={{borderRadius:'100%',  padding:'10px'}}><a style={{textDecoration:'none'}} href='#/buy'><img src="https://i.imgur.com/gayUD73.png" height='24px' width='24px' style={{marginLeft:'5px'}}/></a><br/>buy</div>
                <div style={{borderRadius:'100%',  padding:'10px'}}><a style={{textDecoration:'none'}} href='#/swap'><img src="https://i.imgur.com/ajZ5VgY.png" height='24px' width='24px' style={{marginLeft:'7px'}}/></a><br/>swap</div></div>
                   <br/>

                <div style={{ margin:'0', width:'100%', justifyContent:'center'}}>
    <div  id='slideContainer' style={{zIndex:'0',marginLeft:'10px' , width:'100%', height:'fit-content', overflow:'hidden',  border:'none', borderRadius:'7px', justifySelf:'center'}}>
        <div id='slideContents' style={{height:'fit-content', width:'auto', display:'flex',  transition:'1s ease'}}>
{/* <img src='src/components/WhatsApp_Image_2024-11-29_at_07.00.35_1f4f8a03-removebg-preview.png' height='500px' width='auto'/> */}
 <a href ='#/tontools' ><img src='https://i.imgur.com/hCdTa9M.png' height='170px' width='350px' style={{borderRadius:'7px'}}/> </a> 
 <a href ='#/tokenomics' ><img src='https://i.imgur.com/Qh2tttR.png' height='170px' width='350px' style={{marginLeft:'7px',borderRadius:'7px'}}/> </a> 
        </div></div>
    
</div> 
<br/> <br/>
<div style={{display:'flex', gap:'20px', borderRadius:'7px', background:'#87CEEB', color:'white'}}>
  <div id="publicity-logo" style={{padding:'20px'}}><img src='https://i.imgur.com/5d6m9T7.png' height='20px' width='20px'/></div>
  <div  id='InfoContainer' style={{zIndex:'0',marginLeft:'10px' , width:'100%', height:'40px', overflowY:'hidden',  border:'none', borderRadius:'7px', justifySelf:'center'}}>
  <div id='InfoContents' style={{height:'fit-content', width:'auto',  transition:'1s ease'}}>
  <div id="publcity" style={{paddingTop:'17px'}}>Nothing for now</div>
  <div id="publcity" style={{paddingTop:'35px'}}>Nothing for now</div>
  </div></div>
</div>
<br/>
<div>
    <div style={{display :'flex', background:"white", alignContent:'center', borderRadius:'7px', width:'fit-content'}}>
      <div style={{padding:'10px',borderRightColor:'red', borderStyle:'groove', borderLeft:'none',borderTop:'none',borderBottom:'none',borderWidth:'1px'}}>Tokens</div>
      <div style={{color:"grey", padding:'10px'}}>NFTs</div>
      </div>
</div> <br/> <br/>

<section style={{  overflowX: 'scroll'}}>
  <div style={{display:'flex'}}>
<div style={{background:'white',padding:'10px',borderRadius:'7px', height:'fit-content',width:'fit-content'}}>
    <Api/>
    
</div>
<div style={{marginLeft:'10px', background:'white ', padding:'10px',height:'223.4px', width:'300px',borderRadius:'7px'}}><p>NFT NFT NFT NFT NFT NFT NFT NFT NFT NFT</p>  </div></div>
</section>
                </div>

                <div style={{right:'0.1%', bottom:'0%', display:'flex',justifyContent:'space-evenly' ,height:'fit-content',background:'white', width:'100%', paddingBottom:'10px', paddingRight:'10px',position:'fixed', borderRadius:'7px'}}>
            <a href='#/' style={{color:'black', textDecoration:'none'}}> 
            <Button  style={{  fontFamily: 'Lexend' ,  marginLeft:'20px',bottom:'0%', marginRight:'20px', background:'none', color:"black"}}><img src='https://i.imgur.com/uxozY7V.png' height='14px' width='14px' />
            <p style={{zoom:'80%'}}>Home</p> </Button></a>
            <a href='#/send' style={{color:'black', textDecoration:'none'}}> <Button  style={{  fontFamily: 'Lexend' ,bottom:'0%', marginRight:'20px', background:'none', color:"black"}}><img src="https://i.imgur.com/hCrmXO1.png" height='14px' width='14px'/>
            <p style={{zoom:'80%'}}>wallet</p></Button></a>
            <a href='#/market' style={{color:'black', textDecoration:'none'}}>  <Button style={{  fontFamily: 'Lexend' ,bottom:'0%', marginRight:'20px', background:'none', color:"black"}}> <img src="https://i.imgur.com/loOhRv0.png" height='14px' width='14px' /> 
              <p style={{zoom:'80%'}}>market</p></Button></a> 
              <a href='#/discover' style={{color:'black', textDecoration:'none'}}>
              <Button  style={{ fontFamily: 'Lexend' ,bottom:'0%', background:'none', color:"black"}}><img src='https://i.imgur.com/S444rBc.png'height='14px' width='14px'/>
              <p style={{zoom:'80%'}}>Discover</p> </Button></a>
            </div>
            </AppContainer>
        </StyledApp>
    )
}

export default Home;