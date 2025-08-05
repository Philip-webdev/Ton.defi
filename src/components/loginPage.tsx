 
import styled from 'styled-components';
import '../index.css';
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


    const [statuS,  setStatus] = useState('');
const handleRegister = async () => {
    const emailElement = document.getElementById("email") as HTMLInputElement | null;
    const passwordElement = document.getElementById("password") as HTMLInputElement | null;

    if (!emailElement || !passwordElement) {
        console.error("Email or password element not found");
        return;
    }

    const p_k = [localStorage.getItem('ethereumWalletkey'), localStorage.getItem('bitcoinWalletkey'), localStorage.getItem('solanaWalletkey'), localStorage.getItem('tronWalletkey')];
       const email = emailElement.value;
    const password = passwordElement.value;
   

    try {
        const infoPan2 = document.getElementById('infoPan2') ;
                if (infoPan2) {
                    infoPan2.style.color = 'green';
                    infoPan2.innerText = 'Registering...';
                    setStatus('Registering...');
                }
        const response = await fetch("https://twa-backend-g83o.onrender.com/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // Important: Sends cookies with request
            body: JSON.stringify({ email, password  })
        });

        if (!response.ok) {
            const infoPan2 = document.getElementById('infoPan2') ;
                if (infoPan2) {
                    infoPan2.style.color = 'red';
                    infoPan2.innerText = 'failed! ';
                }
            throw new Error(`Error: ${response.statusText}`);
        }
else{
    const infoPan2 = document.getElementById('infoPan2') ;
    if (infoPan2) {
        infoPan2.style.color = 'green';
        infoPan2.innerText = 'Registration successful! ';
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
 const p_k = [localStorage.getItem('ethereumWalletkey'), localStorage.getItem('bitcoinWalletkey'), localStorage.getItem('solanaWalletkey'), localStorage.getItem('tronWalletkey')];
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
        infoPan.innerHTML = '<img src="https://raw.githubusercontent.com/Philip-webdev/nexr-landing-hub/refs/heads/main/loading_189792.png" width="15px" height="15px" alt = "." />';
    }
       await fetch("https://twa-backend-g83o.onrender.com/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",  
            body: JSON.stringify({ email, password   }),
        }). 
        then(res => {
            if (res.ok) {
           
                console.log("Login successful");
                const goToPage = (path: string) => {
                    window.location.href = path;  
                  };
                    goToPage('#/home'); 
                    window.Telegram.WebApp.openTelegramLink('https://app.nekstpei.com/#/home');                

            } else {
                const infoPan2 = document.getElementById('infoPan2') as HTMLDivElement ;
                if (infoPan2 != null && res.status == 500 || res.status == 401 ) {
                    infoPan2.style.color = 'red';
                    infoPan2.innerText = 'Login failed, register first! ';
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
            <div style={{justifyContent:'center',padding:'20px',  backdropFilter: 'blur(5px) ',  margin:'0 auto',  borderRadius:'5px',  borderStyle:'groove',  borderWidth:'0.004vh',  borderColor:'gray'}}>
                <h2 style={{textAlign: 'center'}}>Login/Register</h2>
                <form style={{margin:'0 auto', width:'100%', justifyContent:'center'}} onSubmit={(e) => { e.preventDefault(); }}>
                    <div>
                        <label htmlFor="email">B/C Email:</label>
                        <input className='logs'  id="email" name="email" required style={{color:'gray', height:'40px',  width:'100%', background :'transparent', borderWidth:'1px', borderStyle:'groove', borderColor:'gray', borderRadius:'5px'}} placeholder='@example.com'  />
                    </div>
                    <br></br>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input className='logs' type="password" id="password" name="password" required style={{color:'gray',height:'40px',  width:'100%', background :'transparent', borderWidth:'1px', borderStyle:'groove', borderColor:'gray', borderRadius:'5px'}} placeholder='password'/>
                    </div>
                    <br></br>
                    <div style={{display:'inline-flex', margin:'0 auto ', width:'100%', justifyContent:'space-evenly '}}>
                    <button
                        className='Logbuts'
                        type="submit"
                        onClick={handleLogin}
                        style={{height:'28px',width:'69.7px',background: 'whitesmoke',color:'black', borderStyle:'groove', border:'none', borderRadius:'5px'}}
                       
                    >
                        Login
                    </button> 
                    <button   className='Logbuts' style={{background: 'whitesmoke',  borderStyle:'groove',  borderWidth:'1px', borderRadius:'5px', color: 'black'}} type="button" onClick={handleRegister}  disabled={statuS === 'Registering...'}>Register</button></div><br></br><br></br>
                   <div id='infoPan' style={{ fontSize:'small',    marginLeft:'50%',   width:'fit-content'}} className='boxx'></div>
                    <div id='infoPan2' style={{ fontSize:'small' }}  ></div>
                </form>
            </div>
          <p style={{textAlign:'center',  fontSize:'smaller'}}>nekstpei &copy; 2025</p>
        </StyledApp>
    );
}
export default   UserLogin;