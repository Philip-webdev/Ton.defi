 import Home from "./components/home";
 import styled from "styled-components";
 import send from "./components/Send";
 import tools from "./components/tools";
 import "./App.css";
  import Register from "./components/AccountRegistration";
 import "@twa-dev/sdk";
 import { HashRouter, Route, Routes} from "react-router-dom";
import swap from "./components/swap";
import Welcome from "./components/Frontier";
import market from "./components/market";
import discover from "./components/discover";
import tokenomics from "./components/tokenomics";
import tontools from "./components/tontools";
import buy from "./components/Buy";
import settings from "./components/settings";
import security from "./components/security";
import agenda from "./components/Agenda";
import contact from "./components/contact";
import organizer from "./components/organizer";
import swaps from "./components/ethEx";
import { useEffect, useState } from "react";
import Welcome2 from "./components/welcome2";
 const StyledApp = styled.div`
  background-color: #4B96FF;
  color: black;
font-family: Lexend ;
     position: fixed;
     width:100%;
  @media (prefers-color-scheme: dark) {
    background-color:  #F9F9F9;
    
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

 // const onloadwelcomeScreen = ()=>{
    window.location.href = '#/'; 
//  }
  const [loading, setLoading] = useState(true);

  useEffect(() => {

      const timer = setTimeout(() => {
          setLoading(false);
      }, 3000);

      return () => clearTimeout(timer); 
  }, []);

  if (loading) {
      return <Welcome/>;
  }

  return (
    <div>
   
  
    <HashRouter>
    <Routes>
    <Route path="/" Component={Home}/>
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
    <Route path="/ethEx" Component={swaps}/>
    </Routes>
  </HashRouter>
  
  <StyledApp  >
 
  <Welcome2/>
 
  </StyledApp>
    </div>
  );
}

export default App;
