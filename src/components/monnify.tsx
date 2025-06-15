import React, { useState } from "react";
import styled from "styled-components";


const Input = styled.input`
color:white;
padding: 20px;
width: 90%;
height: 40px;
border-color: black;
font-size: 16px;
font-family: Lexend;
placeholder :transparent;
 @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
     border-color: rgb(36, 172, 242);
      
  }
`;

const WalletForm = () => {
  const [form, setForm] = useState({
    walletReference: "",
    walletName: "",
    customerName: "",
    bvn: "",
    bvnDateOfBirth: "",
    customerEmail: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: { target: { name: any; value: any; }; }  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
     
    try {
      const res = await fetch("https://twa-backend-g83o.onrender.com/api/monnify", {
        method: "POST",
        headers: { "Content-Type": "application/json"   },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
      console.log(data.responseBody.accountNumber);
        setMessage("Your account number is " + data.responseBody.accountNumber);
        localStorage.setItem("monnifyAccountNumber",data.responseBody.accountNumber);
      } else {
        setMessage(data.error || "Registration failed.");
      }
    } catch (err) {
      setMessage("An error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{maxWidth:800,margin:"auto",padding:"2rem",border:"1px solid #eee",borderRadius:7,background:"transparent"}}>
      <h2 style={{textAlign:"center"}}>Wallet Registration</h2>
         
      <Input
        type="text"
        name="walletReference"
        placeholder="Enter any peculiar word or number to you"
        value={form.walletReference}
        onChange={handleChange}
        required
        style={{width:"95%",padding:8,marginBottom:12}}
      />

         
      <Input
        type="text"
        name="walletName"
        placeholder="Desired Wallet Name"
        value={form.walletName}
        onChange={handleChange}
        required
        style={{width:"95%",padding:8,marginBottom:12}}
      />

  
      <Input
        type="text"
        name="customerName"
        placeholder="Your Name"
        value={form.customerName}
        onChange={handleChange}
        required
        style={{width:"95%",padding:8,marginBottom:12}}
      />
 
      <Input
        type="text"
        name="bvn"
        placeholder="bvn"
        value={form.bvn}
        onChange={handleChange}
        required
        style={{width:"95%",padding:8,marginBottom:12}}
      />
 
      <Input
        type="text"
        placeholder="yyyy-mm-dd"
        name="bvnDateOfBirth"
        value={form.bvnDateOfBirth}
        onChange={handleChange}
        required
        style={{width:"95%",padding:8,marginBottom:12}}
      />
  
      <Input
        type="email"
        placeholder="Email"
        name="customerEmail"
        value={form.customerEmail}
        onChange={handleChange}
        required
        style={{width:"95%",padding:8,marginBottom:16}}
      />

      <button type="submit" style={{width:"100%",padding:10,background:"#007bff",color:"#fff",border:"none",borderRadius:4,fontSize:"1rem"}}>Submit</button>
      {message && <p style={{marginTop:16, textAlign:"center"}}>{message}</p>}
    </form>
  );
};

export default WalletForm;