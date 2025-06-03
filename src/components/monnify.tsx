import React, { useState } from "react";

const WalletForm = () => {
  const [form, setForm] = useState({
    walletReference: "Enter any peculiar word or mumber to you",
    walletName: "Desired Wallet Name",
    customerName: "Your Name",
    bvn: "",
    bvnDateOfBirth: "yyyy-mm-dd",
    customerEmail: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/api/monnify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Your account number is " + data.accountnumber);
        localStorage.setItem("monnifyAccountNumber", data.accountnumber);
      } else {
        setMessage(data.error || "Registration failed.");
      }
    } catch (err) {
      setMessage("An error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{maxWidth:400,margin:"auto",padding:"2rem",border:"1px solid #eee",borderRadius:8,background:"#fafbfc"}}>
      <h2 style={{textAlign:"center"}}>Wallet Registration</h2>
      <label>Wallet Reference</label>
      <input
        type="text"
        name="walletReference"
        value={form.walletReference}
        onChange={handleChange}
        required
        style={{width:"100%",padding:8,marginBottom:12}}
      />

      <label>Wallet Name</label>
      <input
        type="text"
        name="walletName"
        value={form.walletName}
        onChange={handleChange}
        required
        style={{width:"100%",padding:8,marginBottom:12}}
      />

      <label>Customer Name</label>
      <input
        type="text"
        name="customerName"
        value={form.customerName}
        onChange={handleChange}
        required
        style={{width:"100%",padding:8,marginBottom:12}}
      />

      <label>BVN</label>
      <input
        type="text"
        name="bvn"
        value={form.bvn}
        onChange={handleChange}
        required
        style={{width:"100%",padding:8,marginBottom:12}}
      />

      <label>BVN Date of Birth</label>
      <input
        type="date"
        name="bvnDateOfBirth"
        value={form.bvnDateOfBirth}
        onChange={handleChange}
        required
        style={{width:"100%",padding:8,marginBottom:12}}
      />

      <label>Customer Email</label>
      <input
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