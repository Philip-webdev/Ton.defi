
import styled from "styled-components";
import { Button } from "./styled/styled";
import '../index.css';
import { useEffect, useState } from "react";

const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  border-radius: 17px;
    position:  ;
    font-family: Lexend ;
  @media (prefers-color-scheme: dark) {
    background-color:  #F9F9F9;
    
  }
  min-height: 170vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
   width: 100%;
  height:fit-content;
  margin: 0;
  font-family: Lexend ;
`;
function discover() {

  
   

    const [cryptoBlogs, setBlogs] = useState('');
      
    useEffect(() => {
           const fetchData = async () => {
               try {
                   const response = await fetch('https://twa-backend-g83o.onrender.com/api/cryptoblogs');
                   const result = await response.json();
                   console.log(result);
   
                   const blogCryptos = result.data.slice(0, 5);
                   setBlogs(blogCryptos);
               } catch (error) {
                   console.error('Error fetching data:', error);
               }
           };
   
           fetchData();
       }, []);
  
return(
    <StyledApp>
    <AppContainer>
      <h1>Discover best blogs on Crypto</h1>
   <div id="blog_container" style={{display:'inline', margin:'auto', width:'50%'}}>
   <a href="https://coinbound.io/best-crypto-blogs">
     <div style={{background :'white', height:'300px', width:'370px',borderRadius:'10px'}}>
       <img src ='https://i.imgur.com/p53cFyS.jpeg' height='300px' width='320px' style={{borderRadius:'20px'}}/>
</div></a>
     <p style={{fontSize:'medium',color:'grey'}}>Best crypto blogs</p><br/><br/>
 
<a href="https://www.cryptoblogs.io/crypto-etf-what-is-it-types-and-working/">
  <div style={{background :'white', height:'300px', width:'300px',borderRadius:'10px'}}>
  <img src = 'https://i.imgur.com/p53cFyS.jpeg' height='300px' width='320px' style={{borderRadius:'20px'}}/>
</div></a>
      <p style={{fontSize:'medium',color:'grey'}}>Crypto ETF</p> <br/><br/>
<a href="https://www.cryptoblogs.io/cex-vs-dex">
  <div style={{background :'white', height:'300px', width:'300px',borderRadius:'10px'}}> 
<img src = 'https://i.imgur.com/p53cFyS.jpeg' height='300px' width='320px' style={{borderRadius:'20px'}}/></div></a>
     <p style={{fontSize:'medium',color:'grey'}}>CEX vs DEX</p><br/><br/>
<a href="https://www.cryptoblogs.io/crypto-coins-vs-tokens/">
  <div style={{background :'white', height:'300px', width:'320px',borderRadius:'10px'}}></div></a>
     <p style={{fontSize:'medium',color:'grey'}}>Coin vs Token</p><br/><br/>
<a href="https://www.cryptoblogs.io/fundamental-analysis-in-cryptocurrencies/"><div style={{background :'white', height:'300px', width:'300px',borderRadius:'10px'}}><img src="https://i.imgur.com/5CB2a87.jpeg" height='300px' width='370px' style={{borderRadius:'20px'}}/> </div></a>
     <p  style={{fontSize:'medium',color:'grey'}}>Fundamental Analysis in Cryptocurrency</p><br/><br/><br/>

   </div>
    <div style={{right:'0.1%', bottom:'0%', display:'flex',justifyContent:'space-evenly' ,height:'fit-content',background:'white', width:'100%', paddingBottom:'10px', paddingRight:'10px',position:'fixed', borderRadius:'7px'}}>
            <a href='#/' style={{color:'black', textDecoration:'none'}}> 
            <Button  style={{  fontFamily: 'Lexend' ,  marginLeft:'20px',bottom:'0%', marginRight:'20px', background:'none', color:"black"}}><img src='https://i.imgur.com/uxozY7V.png' height='14px' width='14px' />
            <p style={{zoom:'80%'}}>Home</p> </Button></a>
            <a href='#/send' style={{color:'black', textDecoration:'none'}}> <Button  style={{  fontFamily: 'Lexend' ,bottom:'0%', marginRight:'20px', background:'none', color:"black"}}><img src="https://i.imgur.com/hCrmXO1.png" height='14px' width='14px'/>
            <p style={{zoom:'80%'}}>Wallet</p></Button></a>
            <a href='#/market' style={{color:'black', textDecoration:'none'}}>  <Button style={{  fontFamily: 'Lexend' ,bottom:'0%', marginRight:'20px', background:'none', color:"black"}}> <img src="https://i.imgur.com/loOhRv0.png" height='14px' width='14px' /> 
              <p style={{zoom:'80%'}}>Market</p></Button></a>
               <a href='#/discover' style={{color:'black', textDecoration:'none'}}><Button  style={{ fontFamily: 'Lexend' ,bottom:'0%', background:'none', color:"black"}}><img src='https://i.imgur.com/S444rBc.png'height='14px' width='14px'/>
              <p style={{zoom:'80%'}}>Discover</p> </Button></a>
            </div>
    </AppContainer>
  </StyledApp>
);
}
export default discover;
