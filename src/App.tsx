 import home from "./components/home";
 import styled from "styled-components";
 import "./App.css";
 import "@twa-dev/sdk";
 import { HashRouter, Route, Routes} from "react-router-dom";


 const StyledApp = styled.div`
  background-color: whitesmoke;
  color: black;
  border-radius: 17px;
    position: fixed;
  @media (prefers-color-scheme: dark) {
    background-color: rgb(29, 40, 58);
    color: white;
  }
  min-height: 90vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;
const Home = home;
function App() {
 
  return (
    <div >
   
  
    <HashRouter>
    <Routes>
    <Route path="/" Component={Home}/>
     
    </Routes>
  </HashRouter>
  <StyledApp >

    <Home/>
 
  </StyledApp>
    </div>
  );
}

export default App;
