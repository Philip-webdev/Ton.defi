 
import { BsHouse, BsWallet2, BsApp, BsLightningCharge, BsShop } from 'react-icons/bs';
import styled from "styled-components";
 


const Icon = styled.div`
  
 color: grey;
 border-radius:7px;  
  backdrop-filter: blur(35px);
 @media (prefers-color-scheme: dark) {
     backdrop-filter: blur(15px);
        color:white;
  }
`;

const FootNavig= () => {
    return (
       <Icon   style={{left:'0',  bottom:'0%', display:'flex',justifyContent:'space-evenly' ,height:'fit-content',  width:'100%', paddingBottom:'10px', paddingRight:'10px',position:'fixed' }}>
                                            <a href='#/home' style={{ textDecoration:'none'}}> 
                                                          <button  style={{  fontFamily: 'Lexend' , bottom:'0%',  background:'none' }}  ><BsHouse style={{zoom:'150%', color:'grey'}}/>{/*<img src='https://i.imgur.com/uxozY7V.png' height='14px' width='14px' />*/}
                                                          <p style={{zoom:'100%', color:'grey'}}>Home</p> </button></a>
                                      
                                            <a href='#/market' style={{  textDecoration:'none'}}> 
                                             <button style={{  fontFamily: 'Lexend' ,bottom:'0%',  background:'none', border: 'none'}}  ><BsApp style={{zoom:'150%', color:'grey'}}/> {/*<img src="https://i.imgur.com/loOhRv0.png" height='14px' width='14px' /> */}
                                              <p style={{zoom:'100%',color:'grey'}}>Apps</p></button></a> 
                                             <a href='#/marketplace' style={{color:'grey', textDecoration:'none'}}>   <button  style={{ fontFamily: 'Lexend' ,bottom:'0%', background:'none', color:'inherit', border: 'none'}}  ><BsShop style={{zoom:'150%'}}/>{/*<img src='https://i.imgur.com/S444rBc.png'height='14px' width='14px'/>*/}
                                              <p style={{zoom:'100%'}}>Store</p> </button></a>
                                              <a href='#/discover' style={{color:'grey', textDecoration:'none'}}>
                                              <button  style={{ fontFamily: 'Lexend' ,bottom:'0%', background:'none', color:'inherit', border: 'none'}}  ><BsLightningCharge style={{zoom:'150%'}}/>{/*<img src='https://i.imgur.com/S444rBc.png'height='14px' width='14px'/>*/}
                                              <p style={{zoom:'100%'}}>Discover</p> </button></a>
   </Icon>  );
};

export default FootNavig;

//
//                                                           <a href='#/send' style={{color:'grey', textDecoration:'none'}}> <Button  style={{  fontFamily: 'Lexend' ,bottom:'0%',  background:'none', color:color}} onClick={current}><BsWallet2 />{/*<img src="https://i.imgur.com/hCrmXO1.png" height='14px' width='14px'/> */}
//                                                          <p style={{zoom:'100%'}}>Wallet</p></Button></a>