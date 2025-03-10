 
import styled from 'styled-components';

import { useState } from 'react';
 
 
const StyledApp = styled.div`
 background-image:url('https://i.imgur.com/GWzPhNR.jpeg');
 background-size:cover;
  
 background-repeat:no-repeat;
  color: white;
  margin:0;
font-family: Lexend;
  
   @media (prefers-color-scheme: dark) {
     background-image:url('https://i.imgur.com/GWzPhNR.jpeg');
      color: white ;
  }
  min-height:100vh ;
  padding: 20px 20px;
`;


  

function UserLogin() {


    const [status,  setStatus] = useState('logging in...');
const handleRegister = async () => {
    const emailElement = document.getElementById("email") as HTMLInputElement | null;
    const passwordElement = document.getElementById("password") as HTMLInputElement | null;

    if (!emailElement || !passwordElement) {
        console.error("Email or password element not found");
        return;
    }

      
       const email = emailElement.value;
    const password = passwordElement.value;

    try {
        const infoPan = document.getElementById('infoPan') ;
                if (infoPan) {
                    infoPan.style.color = 'green';
                    infoPan.innerText = 'Registering...  ';
                }
        const response = await fetch("https://twa-backend-g83o.onrender.com/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // Important: Sends cookies with request
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const infoPan = document.getElementById('infoPan') ;
                if (infoPan) {
                    infoPan.style.color = 'red';
                    infoPan.innerText = 'failed! ';
                }
            throw new Error(`Error: ${response.statusText}`);
        }
else{
    const infoPan = document.getElementById('infoPan') ;
    if (infoPan) {
        infoPan.style.color = 'green';
        infoPan.innerText = 'Registration successful! ';
    }
    console.log("Registration successful");
}
        const data = await response.json();
        console.log(data);

        // Optionally reset the form
        emailElement.value = "";
        passwordElement.value = "";
    } catch (error) {
        console.error("Registration failed:", error);
    }
}


    const handleLogin = async () => {
        const emailElement = document.getElementById("email") as HTMLInputElement | null;
 const passwordElement = document.getElementById("password") as HTMLInputElement | null;

 if (!emailElement || !passwordElement) {
    console.error("Email or password element not found");
    return;
} 

       const email = emailElement.value;
    const password = passwordElement.value;


 try{
    const infoPan = document.getElementById('infoPan') ;
    if (infoPan) {
        infoPan.style.color = 'green';
        infoPan.innerText = status;
    }
       await fetch("https://twa-backend-g83o.onrender.com/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",  
            body: JSON.stringify({ email, password }),
        }). 
        then(res => {
            if (res.ok) {
              
                console.log("Login successful");
                const goToPage = (path: string) => {
                    window.location.href = path;  
                  };
                    goToPage('/home'); 
                    window.Telegram.WebApp.openTelegramLink('https://nexr-pi.vercel.app/#/home');                

            } else {
                const infoPan = document.getElementById('infoPan') ;
                if (infoPan) {
                    infoPan.style.color = 'red';
                    infoPan.innerText = 'Login failed, register first! ';
                }
                console.error("Login failed:", res.statusText);
              
            }
        });
        
    }
    catch  {
        
        
        console.error("Login failed");
        
    }
    
   
};
 



    return (
        <StyledApp>
            <div style={{justifyContent:'center',padding:'20px',  backdropFilter: 'blur(5px) ',  margin:'0 auto',  borderRadius:'10px',  borderStyle:'groove',  borderWidth:'0.004vh',  borderColor:'gray'}}>
                <h2 style={{textAlign: 'center'}}>Login</h2>
                <form style={{margin:'0 auto', width:'70%', justifyContent:'center'}} onSubmit={(e) => { e.preventDefault(); }}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input className='logs'  id="email" name="email" required style={{color:'gray', height:'30px',  width:'100%', background :'transparent', borderWidth:'2px', borderStyle:'groove', borderColor:'gray', borderRadius:'3px'}} placeholder='@example.com'  />
                    </div>
                    <br></br>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input className='logs' type="password" id="password" name="password" required style={{color:'gray',height:'30px',  width:'100%', background :'transparent', borderWidth:'2px', borderStyle:'groove', borderColor:'gray', borderRadius:'3px'}} placeholder='password'/>
                    </div>
                    <br></br>
                    <div style={{display:'inline-flex', margin:'0 auto ', width:'100%', justifyContent:'space-between'}}>
                    <button className='Logbuts' type="submit" onClick={handleLogin} style={{background: 'transparent',  borderStyle:'groove',  borderWidth:'2px'}}>Login</button> <br></br><br />
                    <button   className='Logbuts' style={{background: 'transparent',  borderStyle:'groove',  borderWidth:'2px'}} type="button" onClick={handleRegister}>Register</button></div><br></br><br></br>
                   <div id='infoPan' style={{ fontSize:'small'}}></div>
                </form>
            </div>
          <p style={{textAlign:'center',  fontSize:'smaller'}}>NEXR &copy; 2025</p>
        </StyledApp>
    );
}
export default   UserLogin;