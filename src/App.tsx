 import Home from "./components/home";
 import styled from "styled-components";
 import send from "./components/Send";
 import tools from "./components/tools";
 import "./App.css";
 
import Register from "./components/AccountRegistration";
 import "@twa-dev/sdk";
 import { BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import swap from "./components/swap";
import Welcome from "./components/Frontier";
import market from "./components/finance";
import discover from "./components/discover";
import tokenomics from "./components/tokenomics";
import tontools from "./components/tontools";
import buy from "./components/Buy";
import settings from "./components/settings";
import security from "./components/security";
import agenda from "./components/Agenda";
import contact from "./components/contact";
import organizer from "./components/organizer";
import { useEffect, useState } from "react";

import usdt from "./components/USDT";
import UserLogin from "./components/loginPage";
import PIN from "./components/PIN";
import stake from "./components/stake";
import RWA from "./components/RWA";


 const StyledApp = styled.div`
  
  color: black;
font-family: Lexend ;
     position: fixed;
     width:100%;
 @media (prefers-color-scheme: dark) {
     
      color: white ;
  }
  min-height: 90vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  width: 100%;
  height:fit-content;
  margin: 0;
`;
 
function App() {

 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const timer = setTimeout(() => {
          setLoading(false);
      }, 5000);
      return () => clearTimeout(timer);
  }, []);

 if (loading) {
     return <Welcome/>;

   }
  
    const goToPage = (path: string) => {
      window.location.href = path;  
    };
      goToPage('#/user');        
 
   



  return (
    <div style={{left: '0%',  right: '0%', top: '0%', bottom: '0%', position: 'fixed', overflow:'auto'}}>
  
  <HashRouter>
    <Routes>
    <Route path="/user" Component={UserLogin}/>
     <Route path="/home" Component={Home}/>
      <Route path="/send" Component={send}/>
      <Route path="/swap" Component={swap}/>
      <Route path="/register" Component={Register}/>
      <Route path="/tools" Component={tools}/>
      <Route path="/market" Component={market}/>
      <Route path="/discover" Component={discover}/>
      <Route path="/tokenomics" Component={tokenomics}/>
      <Route path="/tontools" Component={tontools}/>
      <Route path="/buy" Component={buy}/>
      <Route path="/contact" Component={contact}/>
      <Route path="/agenda" Component={agenda}/>
      <Route path="/security" Component={security}/>
      <Route path="/settings" Component={settings}/>
      <Route path="/organizer" Component={settings}/>
      <Route path="/stake" Component={stake}/>
      <Route path="/rwa" Component={RWA}/>
      <Route path="/pin" Component={PIN}/>
      <Route path="usdt" Component={usdt}/>
    </Routes>
  </HashRouter>


  
</div>
  );
}

export default App;
