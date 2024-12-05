import { useEffect } from "react";
import Api from "./api";
import '../index.css';
import styled from "styled-components";
import { Button } from "./styled/styled";
import 'react-icons/bs';
import 'react-icons/fa';
 

const StyledApp = styled.div`
  background-color: white;
  color: black;
font-family: Lexend ;
  
  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
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
    return(
        <StyledApp>
            <AppContainer>
                <div>
                    <div  id="header" style={{display:'flex', justifyContent:'space-between', margin:'0',fontFamily: 'Lexend'}}><div><img src='https://i.imgur.com/yRr0m7B.png' height='14px' width='14px'/></div><div style={{fontFamily: 'Lexend'}}>My wallet</div><div><img src="https://i.imgur.com/0DG5nGo.png" height='14px' width='14px'/></div></div><br/>
                    <div id="showcase" style={{borderWidth:'1px',borderStyle:'groove', borderColor: 'white',color: 'white', height:'100px', width: '100%', margin:'auto', marginTop:'5%',marginBottom:'5%',fontFamily: 'Lexend', backgroundImage :'linear-gradient(to  right, #2C3F50, #34495E, #BEC3C7)', borderRadius:'7px'}}><p style={{paddingLeft:'7px',paddingTop:'7px',zoom:'90%'}}>Wallet Balance</p><p style={{paddingLeft:'7px', fontWeight:'600'}}>$200,000.00</p></div>

                <div style={{fontFamily: 'Lexend',display:'flex',background :'white', justifyContent:'space-around', borderRadius:'7px', borderStyle:'groove', borderColor:'white', borderWidth:'1px'}}>
                    
                <div style={{borderRadius:'100%',  padding:'10px'}}><a style={{textDecoration:'none'}} href='#/send'><img src="https://i.imgur.com/pEwpEBs.png" height='24px' width='24px'/></a></div>
                <div style={{borderRadius:'100%',  padding:'10px'}}><a style={{textDecoration:'none'}} href='#/buy'><img src="https://i.imgur.com/gayUD73.png" height='24px' width='24px'/></a></div>
                <div style={{borderRadius:'100%',  padding:'10px'}}><a style={{textDecoration:'none'}} href='#/swap'><img src="https://i.imgur.com/8TOrLnG.png" height='24px' width='24px'/></a></div></div>
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
    <div style={{display :'flex', background:"whitesmoke", alignContent:'center', borderRadius:'7px', width:'fit-content'}}><div style={{padding:'10px'}}>Tokens</div><div style={{color:"grey", padding:'10px'}}>NFTs</div></div>
</div> <br/> <br/>
<div style={{background:'whitesmoke',padding:'10px',borderRadius:'7px'}}>
    <Api/>
</div>
                </div>

                <div style={{right:'0.1%', bottom:'0%', display:'flex',justifyContent:'space-evenly' ,height:'fit-content',background:'#e8e8e8', width:'100%', paddingBottom:'10px', paddingRight:'10px',position:'fixed', borderRadius:'7px'}}>
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