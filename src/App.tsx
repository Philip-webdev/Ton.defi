import { useEffect, useState } from "react";
import { HashRouter, Route, Routes, useNavigate } from "react-router-dom";
import "@twa-dev/sdk";
import "./App.css";

// Components
import Home from "./components/home";
import Send from "./components/Send";
import Tools from "./components/tools";
import Register from "./components/AccountRegistration";
import Swap from "./components/swap";
import Welcome from "./components/Frontier";
import Market from "./components/finance";
import Discover from "./components/discover";
import Tokenomics from "./components/tokenomics";
import Tontools from "./components/tontools";
import Buy from "./components/Buy";
import Settings from "./components/settings";
import Security from "./components/security";
import Agenda from "./components/Agenda";
import Contact from "./components/contact";
import Organizer from "./components/organizer";
import Usdt from "./components/USDT";
import UserLogin from "./components/loginPage";
import PIN from "./components/PIN";
import Stake from "./components/stake";
import RWA from "./components/RWA";
import Latest from "./components/latest";
import Scan from "./components/scan";
import AgroApp from "./components/agro";
import Marketplace from "./components/marketplace";
import SuiWallet from "./components/sui";
import RemindMarket from "./components/Reminder";

function AppWrapper() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    },7000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) {
      navigate("/welcome"); // ✔ Correct way to navigate
    } else {
      navigate("/home"); // ✔ Navigate after loading
    }
  }, [loading]);

  return (
    <div
      style={{
        left: "0%",
        right: "0%",
        top: "0%",
        bottom: "0%",
        position: "fixed",
        overflow: "auto",
      }}
    >
      <Routes>
      
        <Route path="/user" element={<UserLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/send" element={<Send />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/market" element={<Market />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/tokenomics" element={<Tokenomics />} />
        <Route path="/tontools" element={<Tontools />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/latest" element={<Latest />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/security" element={<Security />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/organizer" element={<Organizer />} />
        <Route path="/stake" element={<Stake />} />
        <Route path="/rwa" element={<RWA />} />
        <Route path="/pin" element={<PIN />} />
        <Route path="/usdt" element={<Usdt />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/Agro" element={<AgroApp />} />
         <Route path="/sui" element={<SuiWallet />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/reminders" element={<RemindMarket/>}/>
          <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </div>
  );
}

export default AppWrapper;
