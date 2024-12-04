import { useEffect } from "react";
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
  max-width: 900px;
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
            slideContents.style.transform = 'translateX(' + (currentIndex * -innerWidth) + 'px)';
            
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
                    <div  id="header" style={{display:'flex', justifyContent:'space-between'}}><div>Settings</div><div>Home</div><div>Scan</div></div>
                    <div id="showcase" style={{height:'100px', width: '50%', margin:'auto', marginTop:'5%',marginBottom:'5%', background :'white', borderRadius:'7px'}}>This the panel that displays the balance</div>

                <div style={{display:'flex',background :'white', justifyContent:'space-between'}}><div style={{borderRadius:'100%'}}></div>
                <div style={{borderRadius:'100%'}}>Send</div>
                <div style={{borderRadius:'100%'}}>Buy</div>
                <div style={{borderRadius:'100%'}}>Swap</div></div>
                   <br/>

                <div style={{margin:'auto', width:'50%', justifyContent:'center'}}>
    <div  id='slideContainer' style={{zIndex:'0',marginLeft:'19px' , width:'auto', height:'fit-content', overflow:'hidden',  border:'none', borderRadius:'7px', justifySelf:'center'}}>
        <div id='slideContents' style={{height:'fit-content', width:'auto', display:'flex', transition:'1s ease'}}>
{/* <img src='src/components/WhatsApp_Image_2024-11-29_at_07.00.35_1f4f8a03-removebg-preview.png' height='500px' width='auto'/> */}

<img src='https://i.imgur.com/BbaNXnn.png' height='auto' width='auto' style={{borderRadius:'7px'}}/>
<img src='https://i.imgur.com/UBMXOLK.png' height='auto' width='auto' style={{marginLeft:'7px',borderRadius:'7px'}}/>
        </div></div>
    
</div> 

<div>
    <div style={{display :'flex',  alignContent:'center'}}><div style={{background:"white"}}>Tokens</div><div style={{background:"bisque"}}>NFTs</div></div>
</div>
                </div>
            </AppContainer>
        </StyledApp>
    )
}

export default home;