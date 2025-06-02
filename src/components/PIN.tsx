import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "./styled/styled";
import '../index.css';
import { BsHouse, BsWallet2, BsShop, BsLightningCharge, BsCashStack, BsCashCoin, BsCash, BsApp } from "react-icons/bs";
import Crowd from "./CrowdFront";

     
const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  margin:0;
font-family: Lexend;
 zoom :90%;
   @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
      color: white ;
  }
    min-height: 250vh;
  ;
  padding: 20px 20px;
`;

const Icon = styled.div`
background-color: white;
   border-radius:7px; 
  
 @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
        color:grey;
  }
`;
 const ExPanelPIN = styled.div`
 background-color: white;
  color:black;
  @media (prefers-color-scheme: dark) {
      background-color: rgb(15,15,15);
        color:grey;
   }
 `;
const AppContainer = styled.div`
   width: 100%;
  height:fit-content;
  margin: 0;
  font-family: Lexend ;
`;




function PIN() {
  const [plan,  setPlan] = useState<number>(1);
const [Phone,  setPhone] = useState<number>();

 const [loading, setLoading] = useState(true);

  useEffect(() => {
      const timer = setTimeout(() => {
          setLoading(false);
      }, 5000);
      return () => clearTimeout(timer);
  }, []);

 if (loading) {
     return <Crowd />;

   }

async function getMonie(accountNumber: string) {
    const url = `https://sandbox.monnify.com/api/v1/disbursements/wallet/balance?accountNumber=${accountNumber}`;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching balance:', error);
        throw error;
    }
}
const account = ''; //document.getElementById('account') as HTMLInputElement;


const [moniepointWallet, setMoniepointWallet] = useState(getMonie(account));
 
 
 const getUsersIdFromIndexedDB = (): Promise<string | null> => {
            return new Promise((resolve, reject) => {
              const request = indexedDB.open('usersDatabase', 1);
          
              request.onsuccess = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                const tx = db.transaction('users', 'readonly');
                const store = tx.objectStore('users');
                const getRequest = store.get('latest');
          
                getRequest.onsuccess = () => {
                  if (getRequest.result) {
                    const userId = getRequest.result.userId;
                    console.log('✅ Retrieved user ID:', userId);
                    resolve(userId);
                  } else {
                    resolve(null); // Nothing saved
                  }
                };
          
                getRequest.onerror = () => reject(' Failed to retrieve user ID');
              };
          
              request.onerror = () => reject(' Failed to open IndexedDB');
            });
          };
 
async function createNodeRequest(){
  const creatorId = await getUsersIdFromIndexedDB();
  const packageCost = plan; // use state value

   fetch("https://twa-backend-g83o.onrender.com/nodes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",  
            body: JSON.stringify({  creatorId ,packageCost }),
        })
}
async function joinNodeRequest(){
  const res = await fetch("https://twa-backend-g83o.onrender.com/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",  
    body: JSON.stringify({  moniepointWallet ,    phone: Phone }),
  });
  const responseData = await res.json();
  const userId = responseData.userId;
  const minAmount = "";
  
  const saveuserIdToIndexedDB = ( ) => {
    const request = indexedDB.open('usersDatabase', 1);
  
    request.onupgradeneeded = (event) => {
      const db = event.target ? (event.target as IDBOpenDBRequest).result : null;
      if (!db) {
        console.error('Failed to access IndexedDB result.');
        return;
      }
  
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'id' });
      }
    };
  
    request.onsuccess = (event) => {
      const db = event.target ? (event.target as IDBOpenDBRequest).result : null;
      if (!db) {
        console.error('Failed to access IndexedDB result.');
        return;
      }
      const tx = db.transaction('users', 'readwrite');
      const store = tx.objectStore('users');
  
      store.put({ id: 'latest', userId: userId });
  
      tx.oncomplete = () => {
        console.log(' user ID saved to IndexedDB:', userId);
      };
  
      tx.onerror = (err) => {
        console.error(' Error saving user ID:', err);
      };
    };
  
    request.onerror = (err) => {
      console.error(' Error opening IndexedDB:', err);
    };
    
  };
  saveuserIdToIndexedDB();
  
  fetch(`https://twa-backend-g83o.onrender.com/nodes/${userId}/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",  
    body: JSON.stringify({  userId , minAmount }),
  });
}

return (
    <StyledApp>
      <AppContainer>
        <div style={{  justifyContent:'space-around',    borderRadius:'10px'}}>
          <h3 style={{textAlign: "center"}}>Web3charge</h3>
          

         
          <div >
            
            <input placeholder="Enter phone number"
              id="phone" 
              value={Phone ?? ''} 
              onChange={e => setPhone(Number(e.target.value))} 
              type="number"
            style={{ borderRadius:'1px',border:'1px solid black', padding:'10px', width:'90%'}}/>
          </div>  <br/>
          <div style={{ borderRadius:'10px'}} >
            
            <input placeholder="Enter plan in GB"
              id="plan" 
              value={plan} 
              onChange={e => setPlan(Number(e.target.value))} 
              type="number"
           style={{ borderRadius:'1px',border:'1px solid black', padding:'10px', width:'90%'}} /> 
          </div>  <br/>
          <div style =  {{display:"flex" ,justifyContent:'space-between' }}><Button onClick={createNodeRequest}>create node</Button>
          <Button onClick={joinNodeRequest}>Join node</Button></div>
          <br/>
        </div>
        <Icon className="nav" style={{left:'0', right:'0', bottom:'0%', display:'flex',justifyContent:'space-evenly' ,height:'fit-content',  width:'100%', paddingBottom:'10px', paddingRight:'10px',position:'fixed' }}>
          <a href='#/home' style={{color:'grey', textDecoration:'none'}}> 
            <Button  style={{  fontFamily: 'Lexend' , bottom:'0%',  background:'none', color:"grey"}}><BsHouse/>
              <p style={{zoom:'100%'}}>Home</p> 
            </Button>
          </a>
          <a href='#/send' style={{color:'grey', textDecoration:'none'}}> 
            <Button  style={{  fontFamily: 'Lexend' ,bottom:'0%',  background:'none', color:"grey"}}><BsWallet2/>
              <p style={{zoom:'100%'}}>Wallet</p>
            </Button>
          </a>
          <a href='#/market' style={{color:'grey', textDecoration:'none'}}>  
            <Button style={{  fontFamily: 'Lexend' ,bottom:'0%',  background:'none', color:"grey"}}><BsApp/> 
              <p style={{zoom:'100%'}}>Apps</p>
            </Button>
          </a> 
          <a href='#/discover' style={{color:'grey', textDecoration:'none'}}>
            <Button  style={{ fontFamily: 'Lexend' ,bottom:'0%', background:'none', color:"grey"}}><BsLightningCharge/>
              <p style={{zoom:'100%'}}>Discover</p> 
            </Button>
          </a>
        </Icon> 
      </AppContainer>
    </StyledApp>
  );
}
export default PIN;
