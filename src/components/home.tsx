import { useEffect } from "react";
import Api from "./api";
import styled from "styled-components";


const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

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
  margin: 0 auto;
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
            slideContents.style.transform = 'translateY(' + (currentIndex * -67.5) + 'px)';
    
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
                    <div  id="header" style={{display:'flex', justifyContent:'space-between', margin:'0'}}><div><img src='https://i.imgur.com/yRr0m7B.png' height='14px' width='14px'/></div><div>My wallet</div><div><img src="https://i.imgur.com/FtIlp2H.png" height='14px' width='14px'/></div></div>
                    <div id="showcase" style={{height:'100px', width: '100%', margin:'auto', marginTop:'5%',marginBottom:'5%', backgroundImage :'linear-gradient(to  right, #1FA0FF, #12DAFB, #A7FDCC)', borderRadius:'7px'}}></div>

                <div style={{display:'flex',background :'white', justifyContent:'space-around', borderRadius:'7px'}}>
                <div style={{borderRadius:'100%', padding:'10px'}}><a style={{textDecoration:'none'}} href='#/send'><img src="https://i.imgur.com/hCrmXO1.png" height='24px' width='24px'/></a></div>
                <div style={{borderRadius:'100%', padding:'10px'}}><a style={{textDecoration:'none'}} href='#/buy'><img src="https://i.imgur.com/VDoLGZY.png" height='24px' width='24px'/></a></div>
                <div style={{borderRadius:'100%', padding:'10px'}}><a style={{textDecoration:'none'}} href='#/swap'><img src="https://i.imgur.com/R8iA1Vo.png" height='24px' width='24px'/></a></div></div>
                   <br/>

                <div style={{ margin:'auto', width:'100%', justifyContent:'center'}}>
    <div  id='slideContainer' style={{zIndex:'0',marginLeft:'10px' , width:'auto', height:'fit-content', overflow:'hidden',  border:'none', borderRadius:'7px', justifySelf:'center'}}>
        <div id='slideContents' style={{height:'fit-content', width:'auto',  transition:'1s ease'}}>
{/* <img src='src/components/WhatsApp_Image_2024-11-29_at_07.00.35_1f4f8a03-removebg-preview.png' height='500px' width='auto'/> */}
<img src='https://i.imgur.com/BbaNXnn.png' height='auto' width='auto' style={{borderRadius:'7px'}}/>
<img src='https://i.imgur.com/UBMXOLK.png' height='auto' width='auto' style={{marginTop:'7px',borderRadius:'7px'}}/>
        </div></div>
    
</div> 
<br/> <br/>
<div>
    <div style={{display :'flex', background:"white", alignContent:'center', borderRadius:'7px'}}><div style={{padding:'10px'}}>Tokens</div><div style={{color:"grey", padding:'10px'}}>NFTs</div></div>
</div>
<div> <br/> <br/>
    <Api/>
</div>
                </div>
            </AppContainer>
        </StyledApp>
    )
}

export default home;