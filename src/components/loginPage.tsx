 
// import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

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
//const navigate = useNavigate();

    const handleLogin = async () => {
        const emailElement = document.getElementById("email") as HTMLInputElement | null;

        if (!emailElement) {
            console.error("Email element not found");
            return;
        }

       const email = emailElement.value;
    axios.post("https://twa-backend-g83o.onrender.com/login", {
        email: email});

  const authenticate =  async () => {
       await fetch("https://twa-backend-g83o.onrender.com/login", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",  
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
              //  navigate("#/");
            } else {
               // navigate("#/login")
            }
        })
        .catch((err) => {
            console.error("Error:", err);
            
        });
    }
 authenticate();
   
};



function UserLogin() {
    return (
        <StyledApp>
            <div style={{justifyContent:'center',  margin:'20px'}}>
                <h2>Login</h2>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required style={{height:'30px',  width:'200px'}} />
                    </div>
                    <br></br>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required style={{height:'30px',  width:'215px'}}/>
                    </div>
                    <div style={{display:'inline'}}>
                    <button type="submit" onClick={handleLogin} style={{}}>Login</button> <br></br><br />
                    <button type="button" onClick={handleRegister}>Register</button></div>
                </form>
            </div>
        </StyledApp>
    );
}
export default   UserLogin;