import { useState } from "react";
import styled from "styled-components";
import { Button } from "./styled/styled";
import { ChevronDown, ChevronUp, Dock, ListTodo, Store} from "lucide-react"; 
import '../index.css';
import { useNavigate } from "react-router-dom";

const Wrap = styled.div`
border-topLeft-radius: 10px;
padding: 20px;
margin: auto;
background-color: white;
 @media (prefers-color-scheme: dark) {
 border-radius: 10px;
     background-color: rgb(1,1,1) ;
   
       color:white;
   
  }
`;
const Announcement = styled.div`
background-color: white;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
padding: 20px;
 color:black;
 @media (prefers-color-scheme: dark) {
     background-color:rgb(1,1,1) ;
       color: white;
           &:hover {
         box-shadow: 0 0 10px rgb(36,172,242);
       }
  }

`;
const Wrapper = styled.div`
padding: 20px;
margin: auto;
background-color: white;
 @media (prefers-color-scheme: dark) {
 border-radius: 10px;
     background-color: rgb(1,1,1) ;
   
       color:white;
   
  }
`;
const remindMarket = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [clicked , setClicked] = useState(false);
    const [listClicked , setListClicked] = useState(false);
    const [visible, setVisible] = useState(true);
const [listt, setListt] = useState('');

const navigate = useNavigate();
const [quann, setQuan] = useState('');
    const [cartList, setCartList] = useState<string[]>(['No items in cart']);
    const Item = 
     cartList.map((items) => ({cartList} ))
   

    if (!visible) return null; 

const toggleVisibility: () => void = () => {
      var coupon = document.getElementById('coupon');
      if(coupon){
        if(coupon.style.display === 'none'){
          coupon.style.display = 'block';
        }
      }
    };
    
    const [link, setLink] = useState<any>(toggleVisibility);
    const [label, setLabel] = useState('Use coupon');
    
const storeItems = ()=>{
  var list = document.getElementById('groclist') as HTMLInputElement | null;
  var quan = document.getElementById('grocquan') as HTMLInputElement | null;
  if(list && quan){
    const item = list.value;
    const quant = quan.value;
    setListt(item)
    setQuan(quant)
    if(item.trim() !== ''){
     const stored = localStorage.setItem('groceryList', item);
     const fetchList = localStorage.getItem('groceryList');
     if(fetchList){
      const theFetch = fetchList;
      setCartList(theFetch.split('\n'));
     }
     
    }
  }
}

// const paymentSuccessPop = ()=>{
//   const element = document.createElement('div');
//   element.innerHTML = `
//     <div style={{
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'whitesmoke',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 50,
//     backdropFilter: 'blur(4px)'
//   }}>
      
//         <p>
//           Payment Successful! 
//         </p>
//     </div>
//   `;
//   document.body.appendChild(element);
// }

// paymentSuccessPop();

const switchButton = ()=>{
  setLabel('Pay')
  

}

const navig = ()=> {
  navigate('/send')
}
  return (
    <div className="backdrop-blur-sm border-border/90 shadow-lg" >
       { clicked && ( <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
    backdropFilter: 'blur(4px)'
  }}>
           <div className="bg-white rounded-lg p-8 text-center flex flex-col items-center">
                     
                     <div style={{display:'flex', justifyContent:'space-evenly', alignItems:'center', width:'100%', }}> 
                      <div>
                        <h2>Your cart items</h2>
                      </div><div><Button style={{background:'red', marginLeft:'70px', width:'fit-content'}} id="order-button" onClick={() => setClicked(false)}>Close</Button></div>
                    </div> 
                    <div>
                      {cartList.map((items) => (
                        <div>
                          <ul>
                            <li>{items}</li>
                            </ul>
                        </div> ))}
                        </div>
                        <div id="coupon" style={{display:'none'}}><input placeholder="coupon here" type="tel" style={{background:'transparent', border:'none', color:'white'}} onFocus={switchButton}/></div>
                        <div style={{display:'flex', justifyContent:'space-between'}}><div style={{marginTop:'20px'}} className="flex gap-3"><Button style={{background:'green'}} id="order-button" onClick={() => { navig() }}>Send Crypto</Button></div>
                        <div style={{marginTop:'20px'}} className="flex gap-3"> <Button style={{background:'green'}} id="order-button" onClick={() => {toggleVisibility(); }}>{label}</Button> </div></div>
                        </div>
                        
                    
    
    </div>)}
    {/* the list of prices */}

        { listClicked && ( <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
    backdropFilter: 'blur(4px)'
  }}>
           <div className="bg-none  p-8 text-center flex flex-col items-center">
                     
                     <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}}> 
                      <div className="text-gray-700 text-lg font-medium">
                       <h2>Prices of commodities</h2>
                      </div><div><Button style={{background:'red', marginLeft:'70px', width:'fit-content'}} id="order-button" onClick={() =>  setListClicked(false)}>Close</Button></div>
                    </div>
                    <ul>
                      <li>Yam - NGN 2000</li>
                         <li>Egg - NGN 2000</li>
                            <li>Sugar - NGN 2000</li>
                               <li>Rice - NGN 2000</li>
                                  <li>Beans - NGN 2000</li>
                                     <li>Wheat - NGN 2000</li>
                                        <li>Bread - NGN 2000</li>
                                           <li>Tin tomato - NGN 2000</li>
                                              <li>Spaghetti - NGN 2000</li>
                                                 <li>Ramen - NGN 2000</li>
                                                    <li>Butter - NGN 2000</li>
                                                       <li>Tooth Paste - NGN 2000</li>
                                                       <li>Potatoes - NGN 2000</li>
                                                          <li>Palm oil & Groundnut oil - NGN 2000</li>
                      </ul> 
                   </div>
                    
    
    </div>)}

      <div
        className="cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Wrap>
          
            {/* <div className="flex items-center justify-between p-2 m-2 hover:shadow-[0_0_20px_rgb(36, 172, 242)] hover:shadow-lg transition-all duration-300 bg-red"> */}
          <span style={{ display: 'flex', alignItems: 'center',width:'inherit' }} className="">
            <Store style={{padding: '10px'}} className="animate-[color-changing_1s_ease-out_infinite]" />Next Market Stats 
                 {isOpen ? (
            <ChevronUp className="w-5 h-5 text-primary" />
          ) : (
            <ChevronDown className="w-5 h-5 text-primary" />
          )}
          </span>
      </Wrap>
      </div>
      
      {isOpen && (
        <div
          style={{
            transition: 'all 0.5s ease-in-out',
            overflow: 'hidden',
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? 'auto' : 'none'
          }}
        >
          <Wrapper>
            <div className="space-y-4 p-2 m-2" style={{margin:'10px', padding:'20px'}}>
              <div className="flex items-start gap-3">
                <p >Market : Osiele</p>
              </div>
              <div className="flex gap-3">
                <p>Opens: 06:00 hours</p>
              </div>
              <div className="flex gap-3">
                <label>Grocery List:</label>
                <textarea id='groclist' placeholder=" e.g. case of rice, apples, tubers of yam" style={{ height: '40px', width: '100%', background:'transparent', color:'gray', border:'none', borderRadius:'5px', outline:'none'}} />
                 <textarea id='grocquan' placeholder=" the quantity here" style={{ height: '40px', width: '100%', background:'transparent', color:'gray', border:'none', borderRadius:'5px', outline:'none'}} />
              </div>
              <div className="flex gap-3" style={{display:'flex', justifyContent:'space-between'}}><Button id="order-button" onClick={() => { setClicked(true); storeItems(); }}>Order</Button>
              <Button id="order-button" onClick={() => { setListClicked(true); }}>Price List</Button></div>
            </div>
          </Wrapper>
        </div>
      )}
    </div>
  );
};

export default remindMarket;