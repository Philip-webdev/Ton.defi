 
import styled from 'styled-components';
import {   useNavigate } from 'react-router-dom';
 
 
const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  margin:0;
font-family: Lexend;
  border-radius:7px;
   @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
      color: white ;
  }
  min-height:100vh ;
  padding: 20px 20px;
`;


  

function UserLogin() {
    const navigate = useNavigate();
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
        const response = await fetch("https://twa-backend-g83o.onrender.com/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // Important: Sends cookies with request
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
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
      //  

        const emailElement = document.getElementById("email") as HTMLInputElement | null;
 const passwordElement = document.getElementById("password") as HTMLInputElement | null;

 if (!emailElement || !passwordElement) {
    console.error("Email or password element not found");
    return;
}

       const email = emailElement.value;
    const password = passwordElement.value;


 try{
       await fetch("https://twa-backend-g83o.onrender.com/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",  
            body: JSON.stringify({ email, password }),
        }). 
        then(res => {
            if (res.ok) {
                console.log("Login successful");
                navigate("/home");

            } else {
                console.error("Login failed:", res.statusText);
              
            }
        });
        
    }
    catch (error) {
        console.error("Login failed:", error);
        return false;
    }
    
   
};
 



    return (
        <StyledApp>
            <div style={{justifyContent:'center',  margin:'70px'}}>
                <h2 style={{textAlign: 'center'}}>Login</h2>
                <form style={{margin:'auto', width:'100%'}} onSubmit={(e) => { e.preventDefault(); }}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input className='logs'  id="email" name="email" required style={{height:'30px',  width:'100%', background :'transparent', borderWidth:'1px', borderBlockStyle:'groove', borderColor:'gray', borderRadius:'3px'}} placeholder='@example.com'  />
                    </div>
                    <br></br>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input className='logs' type="password" id="password" name="password" required style={{height:'30px',  width:'100%', background :'transparent', borderWidth:'1px', borderBlockStyle:'groove', borderColor:'gray', borderRadius:'3px'}} placeholder='password'/>
                    </div>
                    <br></br>
                    <div style={{display:'inline-flex', margin:'auto ', width:'80%', justifyContent:'space-between'}}>
                    <button type="submit" onClick={handleLogin} style={{background:'greenyellow'}}>Login</button> <br></br><br />
                    <button style={{margin:'0px'}} type="button" onClick={handleRegister}>Register</button></div>
                </form>
            </div>
        </StyledApp>
    );
}
export default   UserLogin;