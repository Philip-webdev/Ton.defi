
import styled from "styled-components";
import { Button } from "./styled/styled";
import '../index.css';
import { useEffect, useState } from "react";
import { BsHouse, BsWallet2, BsShop, BsLightningCharge, BsCashStack, BsApp } from "react-icons/bs";
import FootNavig from "./footnavig";
const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
 zoom :100%;
    font-family: Lexend ;
  @media (prefers-color-scheme: dark) {
    background-color: rgb(15,15,15);
    
  }
  min-height: 250vh;
  padding: 10px 10px;
`;
const Icon = styled.div`
background-color: white;
   border-radius:7px; 
  
 @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
        color:grey;
  }
`;
const H1 = styled.div`
@media (prefers-color-scheme: dark) {
      
        color:white ;
  }
`;

const AppContainer = styled.div`
   width:   100%;
  height:fit-content;
  margin: auto;
  
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
      <H1 ><h1>Discover best blogs on Crypto</h1></H1>
   <div id="blog_container" style={{ margin:'2px'}}>
   
     <Icon style={{  margin:'7px', borderRadius:'10px', display:'flex', gap:'10px', padding:'7px'}}>
      <div>
     <a href="https://coinbound.io/best-crypto-blogs">
       <img src ='https://i.imgur.com/p53cFyS.jpeg' height='100px' width='100px'  />
       </a></div>

     <div style={{fontSize:'medium',color:'grey'}}>Best crypto blogs</div></Icon>
 

     <Icon style={{  margin:'7px', borderRadius:'10px', display:'flex', gap:'10px', padding:'7px'}}>
  <div  >
  <img src = 'https://i.imgur.com/p53cFyS.jpeg' height='100px' width='100px'  />
  <a href="https://www.cryptoblogs.io/crypto-etf-what-is-it-types-and-working/">
</a></div>
      <div style={{fontSize:'medium',color:'grey'}}>Crypto ETF</div> </Icon>



      <Icon style={{  margin:'7px', borderRadius:'10px', display:'flex', gap:'10px', padding:'7px'}}>
  <div> 
<img src = 'https://i.imgur.com/p53cFyS.jpeg' height='100px' width='100px'  />
<a href="https://www.cryptoblogs.io/cex-vs-dex"></a></div>
     <div style={{fontSize:'medium',color:'grey'}}>CEX vs DEX</div></Icon>


     
     <Icon style={{  borderRadius:'10px', margin:'7px', display:'flex', gap:'10px', padding:'7px'}}>
<div>
<a href="https://www.cryptoblogs.io/fundamental-analysis-in-cryptocurrencies/">
  <img src="https://i.imgur.com/5CB2a87.jpeg" height='100px' width='100px'  /></a>
   </div>
     <div  style={{fontSize:'medium',color:'grey'}}>Fundamental Analysis in Cryptocurrency</div></Icon>

   </div>
     <div><FootNavig/></div>
    </AppContainer>
  </StyledApp>
);
}
export default discover;
