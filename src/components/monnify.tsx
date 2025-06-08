import React, { useState } from "react";
import styled from "styled-components";


const Input = styled.input`
background-color: white;
padding: 10px;
width: 100%;
placeholder :transparent;
 @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
    
      color: gray ;
  }
`;

const WalletForm = () => {
  const [form, setForm] = useState({
    walletReference: "Enter any peculiar word or number to you",
    walletName: "Desired Wallet Name",
    customerName: "Your Name",
    bvn: "bvn",
    bvnDateOfBirth: "yyyy-mm-dd",
    customerEmail: "Email",
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
      console.log(data.responseBody.accountnumber);
        setMessage("Your account number is " + data.responseBody.accountnumber);
        localStorage.setItem("monnifyAccountNumber", data.accountnumber);
      } else {
        setMessage(data.error || "Registration failed.");
      }
    } catch (err) {
      setMessage("An error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{maxWidth:400,margin:"auto",padding:"2rem",border:"1px solid #eee",borderRadius:7,background:"transparent"}}>
      <h2 style={{textAlign:"center"}}>Wallet Registration</h2>
         
      <Input
        type="text"
        name="walletReference"
        value={form.walletReference}
        onChange={handleChange}
        required
        style={{width:"100%",padding:8,marginBottom:12}}
      />

         
      <Input
        type="text"
        name="walletName"
        value={form.walletName}
        onChange={handleChange}
        required
        style={{width:"100%",padding:8,marginBottom:12}}
      />

  
      <Input
        type="text"
        name="customerName"
        value={form.customerName}
        onChange={handleChange}
        required
        style={{width:"100%",padding:8,marginBottom:12}}
      />
 
      <Input
        type="text"
        name="bvn"
        value={form.bvn}
        onChange={handleChange}
        required
        style={{width:"100%",padding:8,marginBottom:12}}
      />
 
      <Input
        type="text"
        name="bvnDateOfBirth"
        value={form.bvnDateOfBirth}
        onChange={handleChange}
        required
        style={{width:"100%",padding:8,marginBottom:12}}
      />
  
      <Input
        type="email"
        name="customerEmail"
        value={form.customerEmail}
        onChange={handleChange}
        required
        style={{width:"100%",padding:8,marginBottom:16}}
      />

      <button type="submit" style={{width:"100%",padding:10,background:"#007bff",color:"#fff",border:"none",borderRadius:4,fontSize:"1rem"}}>Submit</button>
      {message && <p style={{marginTop:16, textAlign:"center"}}>{message}</p>}
    </form>
  );
};

export default WalletForm;