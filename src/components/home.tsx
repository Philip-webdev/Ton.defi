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
    background-color: #F9F9F9;
    
  }
  min-height: fit-content ;
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
       const [AccountBalance, setAccountBalance] = useState('0.00 USD');
       const [Nohide, hide] = useState(<img src="https://i.imgur.com/5mz3gKD.png" height='20px' width='20px'/>);

       function Hide(){
        hide(<div style={{marginBottom:'4px' }}><img src="https://i.imgur.com/ex7JGsm.png" height='20px' width='20px'/></div>);
        setAccountBalance('* * *');
       
      
       }
       function removeHide(){
      //  This is a prototype, original is actually gotten from the toncenter API
          setAccountBalance('0.00 USD');
          hide(<img src="https://i.imgur.com/5mz3gKD.png" height='20px' width='20px'/>)
        
       }
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
                  <div >
                      <a href='#/tools' style={{color:'black', textDecoration:'none'}}>
                       <img src='https://i.imgur.com/xFizwPR.png' height='20px' width='20px' style={{borderRadius:'100%', padding:'4px', background:'white',height:'fit-content'}}/></a>
                       </div><div style={{fontFamily: 'Lexend'}}> 
                        
                        <a href='#/register' style={{color:'black', textDecoration:'none'}}> My Account </a>
                        </div><div><a href="https://deebest22.github.io/Code-Ninjas/Video%20Copy/Website%20Design/">
                        <img src="https://i.imgur.com/ErnGd8q.png" height='20px' width='20px' style={{borderRadius:'100%', padding:'4px', background:'white',height:'fit-content'}}/></a>
                    </div>
                    </div><br/>
                    <div id="showcase" style={{ color: 'black', height:'100px', width: '100%', margin:'auto',justifyContent:'center', marginTop:'5%',marginBottom:'5%',fontFamily: 'Lexend',  borderRadius:'10px'}}>
                      <p style={{margin:'7px',textAlign:'center', color:'grey'}}>Wallet Balance</p>  
                     
                    <div style={{margin:'auto',justifyContent:'center',textAlign:'center', fontWeight:'500', display:'flex', fontSize:'27px'}} onDoubleClick={removeHide} onClick={Hide}>{AccountBalance} <div style={{margin:'2px' }}>{Nohide}</div>
                    </div></div>

                <div style={{fontFamily: 'Lexend',display:'flex',background :'', justifyContent:'space-around', borderRadius:'7px' }}>
                    
                <div style={{borderRadius:'100%',  padding:'10px'}}><a style={{textDecoration:'none'}} href='#/send'>
                <img src="https://i.imgur.com/JwKhVnM.png" height='24px' width='24px'style={{marginLeft:'7px'}} /></a>
                <br/>send</div>
                <div style={{borderRadius:'100%',  padding:'10px'}}><a style={{textDecoration:'none'}} href='#/buy'>
                <img src="https://i.imgur.com/gayUD73.png" height='24px' width='24px' style={{marginLeft:'5px'}}/></a>
                <br/>buy</div>
                <div style={{borderRadius:'100%',  padding:'10px'}}><a style={{textDecoration:'none'}} href='#/swap'>
                <img src="https://i.imgur.com/ajZ5VgY.png" height='24px' width='24px' style={{marginLeft:'7px'}}/></a>
                <br/>swap</div></div>
                   <br/>

                <div style={{ margin:'0', width:'100%', justifyContent:'center'}}>
    <div  id='slideContainer' style={{zIndex:'0',marginLeft:'10px' , width:'100%', height:'fit-content', overflow:'hidden',  border:'none', borderRadius:'7px', justifySelf:'center'}}>
        <div id='slideContents' style={{height:'fit-content', width:'auto', display:'flex',  transition:'1s ease'}}>
 
 <a href ='#/tokenomics' ><img src='https://i.imgur.com/EfcPkCp.png' height='170px' width='350px' style={{borderRadius:'7px'}}/> </a> 
 <a href ='#/tontools' ><img src='https://i.imgur.com/RONC6cl.png' height='170px' width='350px' style={{marginLeft:'7px',borderRadius:'7px'}}/> </a> 
        </div></div>
    
</div> 
<br/> <br/>

{/* the announcement panel// */}
<div style={{margin:'auto',justifyContent:'center', display:'flex', gap:'20px', borderRadius:'7px', background:'#87CEEB', color:'white'}}>
  <div id="publicity-logo" style={{padding:'20px'}}><img src='https://i.imgur.com/5d6m9T7.png' height='20px' width='20px'/></div>
  <div  id='InfoContainer' style={{zIndex:'0',marginLeft:'10px' , width:'100%', height:'40px', overflowY:'hidden',  border:'none', borderRadius:'7px', justifySelf:'center'}}>
  <div id='InfoContents' style={{height:'fit-content', width:'auto',  transition:'1s ease'}}>
  <div id="publcity" style={{paddingTop:'17px'}}>Our 24/7 support is live</div>
  <div id="publcity" style={{paddingTop:'35px'}}> Our 24/7 support is live </div>
  </div></div>
</div>
<br/>
<div>
    <div style={{display :'flex', background:"white", alignContent:'center', borderRadius:'7px', width:'fit-content'}}>
      <div style={{padding:'10px',borderRightColor:'red', borderStyle:'groove', borderLeft:'none',borderTop:'none',borderBottom:'none',borderWidth:'1px'}}>Tokens</div>
      <div style={{color:"grey", padding:'10px'}}>NFTs</div>
      </div>
</div> <br/> <br/>
{/* this section loads the API */}
<section style={{  overflowX: 'scroll'}}>
  <div style={{display:'flex'}}>
<div style={{ padding:'10px',borderRadius:'7px', height:'100%',width:'100%'}}>
    <Api/>
    
</div>
{/* <div style={{marginLeft:'10px', background:'white ', marginTop:'18px',height:'300px', width:'100%',borderRadius:'7px'}}>
  <p>NFT NFT NFT NFT NFT NFT NFT NFT NFT NFT</p>  </div>*/}</div> 
</section>
                </div>

{/* 
the bottom navigation */}
                <div style={{right:'0.1%', bottom:'0%', display:'flex',justifyContent:'space-evenly' ,height:'fit-content',background:'white', width:'100%', paddingBottom:'10px', paddingRight:'10px',position:'fixed', borderRadius:'7px'}}>
            <a href='#/' style={{color:'black', textDecoration:'none'}}> 
            <Button  style={{  fontFamily: 'Lexend' ,  marginLeft:'20px',bottom:'0%', marginRight:'20px', background:'none', color:"black"}}><img src='https://i.imgur.com/uxozY7V.png' height='14px' width='14px' />
            <p style={{zoom:'80%'}}>Home</p> </Button></a>
            <a href='#/send' style={{color:'black', textDecoration:'none'}}> <Button  style={{  fontFamily: 'Lexend' ,bottom:'0%', marginRight:'20px', background:'none', color:"black"}}><img src="https://i.imgur.com/hCrmXO1.png" height='14px' width='14px'/>
            <p style={{zoom:'80%'}}>Wallet</p></Button></a>
            <a href='#/market' style={{color:'black', textDecoration:'none'}}>  <Button style={{  fontFamily: 'Lexend' ,bottom:'0%', marginRight:'20px', background:'none', color:"black"}}> <img src="https://i.imgur.com/loOhRv0.png" height='14px' width='14px' /> 
              <p style={{zoom:'80%'}}>Market</p></Button></a> 
              <a href='#/discover' style={{color:'black', textDecoration:'none'}}>
              <Button  style={{ fontFamily: 'Lexend' ,bottom:'0%', background:'none', color:"black"}}><img src='https://i.imgur.com/S444rBc.png'height='14px' width='14px'/>
              <p style={{zoom:'80%'}}>Discover</p> </Button></a>
            </div>
            </AppContainer>
        </StyledApp>
    )
}

export default Home;
