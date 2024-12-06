import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "./styled/styled";


const StyledApp = styled.div`
  background-color: whitesmoke;
  color: black;
  border-radius: 17px;
    position: fixed;
  @media (prefers-color-scheme: dark) {
    background-color: rgb(29, 40, 58);
    color: white;
  }
  min-height: 90vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  width: fit-content;
  margin: 0;
`;
function Register() {
   
    const [Accountname, setAccountName] = useState('Account Name');
  const [walletName, setWalletname] = useState(' Wallet Name');
  const [customerEmail, setEmail] = useState('Your Email');
  const [AccountNo, setAccountNo] = useState('Your Account Number');
  const [bvn, setBvn] = useState('Your Bvn Number');
  const [bvnDateOfBirth, setBvnDateOfBirth] = useState('Your Bvn dob');
const [walletReference, setWalletreference] = useState("ref"+ Math.floor((Math.random() * 1000000000) + 1));

    const AccountData = {
        Accountname:Accountname,
        walletNAme: walletName ,
        customerEmail: customerEmail,
        bvnDetails: {bvn:bvn, bvnDateOfBirth:bvnDateOfBirth },
        walletReference: walletReference
    };
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault(); // Prevent the default form submission
  
      
  
        try {
            const response = await fetch('https://twa-backend-g83o.onrender.com/api/monnify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(AccountData), // Convert the data to JSON
            });
  
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
  
            const result = await response.json();
            console.log('Profile saved:', result); // Handle the response as needed
        } catch (error) {
            console.error('Error saving profile:', error);
        }
    };
return(
    <AppContainer>
    <div style={{margin:'auto', width:'50%'}}><h2 style={{zoom:'90%'}}>Fiat way</h2>
<form>
<div className="input-group">
        <input type="text" id="fromToken" placeholder={Accountname} value={Accountname}
             onChange={(e) => setAccountName(e.target.value)}/>
</div>
    <div className="input-group">
     
        <input type="text" id="toToken" placeholder={walletName} value={walletName}
             onChange={(e) => setWalletname(e.target.value)}/>
    </div>
    <div className="input-group">
        
        <input type="number"  placeholder={bvn} value={bvn}
             onChange={(e) => setBvn(e.target.value)}/>
    </div>
    <div className="input-group">
        
        <input type="text"  placeholder={bvnDateOfBirth} value={bvnDateOfBirth}
             onChange={(e) => setBvnDateOfBirth(e.target.value)}/>
    </div>
    <div className="input-group">
        
        <input type="number"   value={walletReference}
             onFocus={(e) => setWalletreference(e.target.value)}/>
    </div>
    <div className="input-group">
        
        <input type="email"  placeholder={customerEmail} value={customerEmail}
             onChange={(e) => setEmail(e.target.value)}/>
    </div>
    <div className="input-group">
    <button style={{}} type="button" onClick={handleSubmit}>Open Account</button></div>
    </form>
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
)
}
export default Register;
