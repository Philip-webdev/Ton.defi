import { useEffect, useState } from "react";
import Api from "./api";
import '../index.css';
import styled from "styled-components";
 
import 'react-icons/bs';
import 'react-icons/fa';
import {    BsEye, BsEyeSlash, BsGear, BsHeadset      } from "react-icons/bs";
import * as multichainWallet from 'multichain-crypto-wallet';
import { IResponse } from "multichain-crypto-wallet/dist/common/utils/types";
import NftApi from "./nftApi";
import WalletHistoryApi from "./history";
import FootNavig from "./footnavig";
import { removeListener } from "process";
const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  margin:0;
font-family: Lexend;
 
   @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
     color: white ;
}
      height : 190vh;
  padding: 20px;
   zoom :100%;
   
`;

const Announcement = styled.div`
background-color: white;
 color:black;
 @media (prefers-color-scheme: dark) {
     background-color:rgb(1,1,1) ;
       color: rgb(36, 172, 242);
  }
`;


const Icon = styled.div`
background-color: white;
 border-radius:7px;  
  
 @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
        color:grey;
  }
`;
const Icn = styled.div`
background-color: white;
 border-radius:7px;  
 justify-content:center;
  padding:7px;
 @media (prefers-color-scheme: dark) {
     background-color: rgb(1,1,1);
        padding:7px;
  }
`;
 
const AppContainer = styled.div`
  width: 100%;
  height:fit-content;
  margin: 0;
`;
async function getTotalBalance() {
  const ethAddress = localStorage.getItem('ethereumWallet') ;
  const solAddress = localStorage.getItem('solanaWallet');
  const bitAddress = localStorage.getItem('bitcoinWallet');
  let accountBalanceEth = 0; // Initialize to zero
  let accountBalanceSol = 0; // Initialize to zero
  let accountBalanceBit = 0; // Initialize to zero
 

 

 const usdPrice = async (symbol: string) => {
    const response = await fetch('https://twa-backend-g83o.onrender.com/api/cryptocurrency');
    const result = await response.json();
    console.log(result);

    
        const cryptoData = result.data.find((crypto: { symbol: string }) => crypto.symbol === symbol);
        return cryptoData ? Number(cryptoData.price) : 0;
      
}

  
  if (ethAddress ) {
      try {
           
        const ethBalanceResponse: IResponse = await multichainWallet.getBalance({
          address: ethAddress,
          network: 'ethereum',
          rpcUrl: 'https://eth-mainnet.alchemyapi.io/v2/fY6etQ0_E-PnuaKp5g9npALfvpJ4IGRq',
        });
        const ethUsdPrice = Number(await usdPrice('ETH'));
        accountBalanceEth = Number(ethBalanceResponse.balance ?? 0) * ethUsdPrice;   
      } catch (error) {
        console.error('Error fetching Ethereum balance:', error);
      }
  }

  if (solAddress) {
      try {
          const solBalanceResponse = await multichainWallet.getBalance({
              address: solAddress,
              network: 'solana',
              rpcUrl: 'https://mainnet.helius-rpc.com/?api-key=5517adc0-a742-464f-8ef1-276dc13f6c78'
              ,
          });
          const solUsdPrice = Number(await usdPrice('SOL'));
          accountBalanceSol = Number(solBalanceResponse.balance ?? 0) * solUsdPrice;  
      } catch (error) {
          console.error('Error fetching Solana balance:', error);
      }
  }

  if(bitAddress){
    try {
      const bitBalanceResponse: IResponse = await multichainWallet.getBalance({
          address: bitAddress,
          network: 'bitcoin',
          rpcUrl: 'https://bitcoin-mainnet.g.alchemy.com/v2/fY6etQ0_E-PnuaKp5g9npALfvpJ4IGRq'
      });
      accountBalanceBit = Number(bitBalanceResponse.balance ?? 0) * Number(await usdPrice('BTC'));  
  } catch (error) {
      console.error('Error fetching Bitcoin balance:', error);
  }
  }

  const total = 
    Number(accountBalanceEth) || 0 + 
    Number(accountBalanceSol) || 0 + 
    Number(accountBalanceBit) || 0;
  const safeTotal = isNaN(total) ? 0 : total;
  console.log('Total Balance:', safeTotal); 
  return safeTotal;  
}



function Home(){

  const [totalBalance, setTotalBalance] = useState<number>(0); // Initialize total balance state
const [pretext, setText] = useState(<div style={{color:'gray'}}>Loading tokens...</div>);
 


const load = ()=>{
  setText(<div>
    <Api/></div>)
}
  useEffect(() => {
      const fetchTotalBalance = async () => {
          const balance = await getTotalBalance(); // Call async function to get total balance
          setTotalBalance(balance); // Update state with total balance
      };

      fetchTotalBalance(); // Fetch total balance on component mount
  }, []);


    const slide = ()=>{
        const slideContents = document.getElementById('slideContents');
        
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
       
        var currentIndex = 0;
        function swipeInfo(){
            const slider = ['1', '2' ];
            currentIndex = (currentIndex ) % slider.length;
            if (InfoContents != null){
            InfoContents.style.transform = 'translateY(' + (currentIndex * -65.0) + 'px)';
    
            }
        }
        setInterval(swipeInfo, 5000);
       }
    useEffect(()=>{
       slide();} ,[])

       function  swiper(){
        const nftElement = document.getElementById('nft');
        if (nftElement) {
            nftElement.style.color = 'black';
            nftElement.style.fontWeight = '400'
        }
       ;
       const swiperComponent = document.getElementById('swiper');
        if (swiperComponent != null)
        swiperComponent.style.transform = 'translateX(' + (-50) + '%)';
       }

       function  swipeBack(){
        const nftElement = document.getElementById('nft');
        if (nftElement) {
            nftElement.style.color = 'gray';
            nftElement.style.fontWeight = 'none';
        }
       ;
        const swiperComponent = document.getElementById('swiper');
        if (swiperComponent != null)
        swiperComponent.style.transform = 'translateX(' + (0) + '%)';
       }
      //  const [AccountBalance, setAccountBalance] = useState({totalBalance});
       const [Nohide, hide] = useState(<BsEye style={{ height:'25px', width:'25px'}}/>);

        function Hide(){
       
       const balanceArea = document.getElementById('balance') as HTMLElement | null;
       if(balanceArea != null &&  balanceArea.style.display == 'block'){
        hide( <BsEyeSlash style={{ height:'25px', width:'25px'}}/>);
        balanceArea.style.display = 'none'; 
      } else if (balanceArea != null && balanceArea.style.display == 'none') {
        hide(<BsEye style={{ height:'25px', width:'25px'}}/>);

      }
      
       }
    
       

      
       
 
      
    return(
        <StyledApp style={{fontWeight:'100', overflowX:'hidden'}} >
            
            <AppContainer onLoad={load}>
                <div>
                    <div  id="header" style={{display:'flex', justifyContent:'space-between', margin:'0',fontFamily: 'Lexend'}}>
                  <div >
                      <a href='#/tools' style={{color:'black', textDecoration:'none'}}>
                      <Icon> <BsGear style={{height: '25px',  width:'25px'}}/></Icon> </a>
                       </div><div style={{fontFamily: 'Lexend'}}> 
                        
                        <div><a href='#/register' style={{color:'grey' , textDecoration:'none'}}> My Account</a></div> 
                        </div><div><a href="/" style={{color:'black'}}>
                        <Icon><BsHeadset style={{height: '25px',  width:'25px'}}/></Icon></a>
                    </div>
                    </div><br/>
                    <div id="showcase" style={{  height:'100px', width: '100%', margin:'auto',justifyContent:'center', marginTop:'5%',marginBottom:'5%',fontFamily: 'Lexend',  borderRadius:'10px'}}>
                      <p style={{margin:'7px',textAlign:'center', color:'grey'}}>Wallet Balance</p>  
                     
                    <div style={{margin:'auto',justifyContent:'center',textAlign:'center', fontWeight:'700', display:'flex', fontSize:'40px',fontFamily:'helvetica'}}  onClick={Hide}><div id="balance"> ${totalBalance}.00  </div><div style={{margin:'2px',marginTop:'7px', zoom:'70%'}}>{Nohide}</div>
                    </div></div>

                <div style={{fontFamily: 'Lexend',display:'flex',background :'', justifyContent:'space-evenly', borderRadius:'7px' }}>
                    
                <div style={{borderRadius:'100%',  padding:'10px'}}><a style={{textDecoration:'none'}} href='#/send'>
                <Icn style={{width:'fit-content'}}><img src="https://i.imgur.com/PjKRm1R.png" height='25px' width='25px' /></Icn></a>
                <br/>send</div>
                <div style={{borderRadius:'100%',  padding:'10px',}}><Icn style={{width:'fit-content', marginLeft:'7px'}}><a style={{textDecoration:'none'}} href='#/register'>
                <img src="https://i.imgur.com/L3iZQca.png" height='25px' width='25px' /></a></Icn>
                <br/>receive</div>
                <div style={{borderRadius:'100%',  padding:'10px'}}><a style={{textDecoration:'none'}} href='#/buy'>
                <Icn style={{width:'fit-content'}}><img src="https://i.imgur.com/gayUD73.png" height='25px' width='25px'/></Icn></a>
                <br/>buy</div>
                <div style={{borderRadius:'100%',  padding:'10px'}}><a style={{textDecoration:'none'}} href='#/swap'>
                <Icn style={{width:'fit-content'}}><img src="https://i.imgur.com/FRi5bbx.png" height='25px' width='25px' /></Icn></a>
                <br/>swap</div></div>
                   <br/>

                <div style={{ margin:'0', width:'100%', justifyContent:'center'}}>
    <div  id='slideContainer' style={{zIndex:'0',marginLeft:'10px' , width:'100%', height:'fit-content', overflow:'scroll',  border:'none', borderRadius:'7px', justifySelf:'center'}}>
        <div id='slideContents' style={{height:'fit-content', width:'auto', display:'flex',  transition:'1s ease'}}>

 <a href ='#/tokenomics'  ><div style={{  position:'absolute',marginLeft:'10px',  color: 'white',  width:'70%',margin:'10px', backdropFilter: 'blur(15px)',bottom:'0'}}>Tokenomics? </div><img src='https://img.freepik.com/free-vector/blue-bitcoin-word-constructed-with-numbers_1217-2567.jpg?ga=GA1.1.92224753.1734105421&semt=ais_hybrid&w=740' height='170px' width='350px' style={{borderRadius:'7px'}}/> </a>
 <a href ='#/tontools' ><div style={{  position:'absolute',marginLeft:'10px',  color: 'white',  width:'70%',margin:'10px',  backdropFilter: 'blur(10px)',bottom:'0'}}>Nekstpei & StableCoin</div><img src='https://raw.githubusercontent.com/Philip-webdev/nexr-landing-hub/refs/heads/main/2205_w037_n003_379b_p1_379.svg' height='170px' width='350px' style={{marginLeft:'7px',borderRadius:'7px'}}/> </a>
        </div></div>
    
</div> 
<br/> <br/>

{/* the announcement panel#87CEEB// */}
<Announcement style={{margin:'auto',justifyContent:'center', display:'flex', gap:'20px', borderRadius:'7px', height:'37px'}}>
  <div id="publicity-logo" style={{padding:'10px', background:'rgb(36, 172, 242)', borderRadius:'7px'}}><img src='https://i.imgur.com/5d6m9T7.png' height='20px' width='20px'/></div>
  <div  id='InfoContainer' style={{zIndex:'0',marginLeft:'10px' , width:'100%', height:'30px', overflowY:'hidden',  border:'none', borderRadius:'7px', justifySelf:'center'}}>
  <div id='InfoContents' style={{height:'fit-content', width:'auto',  transition:'1s ease'}}>
  <div id="publcity" style={{marginTop:'7px'}}>Store on nekstpei is coming soon</div>
  <div id="publcity" style={{marginTop:'35px'}}> Buy TON USDT for now </div>
  </div></div>
</Announcement>
<br/>


<div>
    <div style={{display :'flex', background:"transparent", alignContent:'center', borderRadius:'7px', width:'fit-content'}}>
      <div style={{ padding:'10px',borderRightColor:'red', borderStyle:'groove', borderLeft:'none',borderTop:'none',borderBottom:'none',borderWidth:'1px'}} onClick={swipeBack}>Tokens</div>
      <div style={{  padding:'10px'}} onClick={swiper} id="nft">NFTs</div>
      </div>
</div> <br/>


<div id='swiper' style={{display:'flex',width: '200%'}}>
<div style={{width: '100%',overflowX: 'scroll',  justifyContent:'space-between', padding:'2px', borderRadius:'7px', height:'100%'}}>

<section  style={{width: '100%'}} >
<div style={{ padding:'2px',borderRadius:'7px', height:'100%', width:'100%'}}>
{pretext}  
</div>  
</section></div>
<section style={{marginLeft:'30px' ,padding:'2px', height:'100%', width:'100%'}}><div style={{ padding:'2px',borderRadius:'7px', height:'100%', width:'100%'}}><NftApi /></div> </section>
                </div> 

                
                <div style={{ padding:'2px',borderRadius:'7px', height:'auto', width:'auto'}}>
    <h3>Wallet History</h3>
    <div style={{ padding:'4px',borderRadius:'7px', height:'100%', width:'100%'}}>
      <WalletHistoryApi/>
    </div>
  </div>
                </div>
  
               <div><FootNavig/></div>
            </AppContainer>
        </StyledApp>
    )
}

export default Home;
