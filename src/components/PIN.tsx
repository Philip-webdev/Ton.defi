import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "./styled/styled";
import '../index.css';
import 'react-icons/bs';
import 'react-icons/fa';
import { BsHouse, BsWallet2, BsShop, BsLightningCharge,    BsApp, BsBell, BsAlarm, BsBadge3D, BsChatLeftDots, BsInbox, BsGraphUp, BsBarChartLine, BsBarChart } from "react-icons/bs";
import Crowd from "./CrowdFront";
import { FaBullhorn } from "react-icons/fa";
import FootNavig from "./footnavig";

     
const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  margin:0;
  font-size: 17px;
font-family: Lexend;
 zoom :100%;
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

const Input = styled.input`
color:white;
border-radius: 7px;
 border-color: black;
padding: 10px;
width: 95%;
height: 40px;
font-size: 17px;
font-family: Lexend;
placeholder :transparent;
 @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
    
      border-color: rgb(36, 172, 242);
  }
`;


 const ExPanelPIN = styled.div`
 background-color: white;
  color:black;
  @media (prefers-color-scheme: dark) {
      background-color: rgb(15,15,15);
        color:white;
   }
 `;
const AppContainer = styled.div`
   width: 100%;
  height:fit-content;
  margin: 0;
  font-family: Lexend ;
`;




function PIN() {
  const [plan,  setPlan] = useState<number>();
  const [network,  setNetwork] = useState<string>();
const [Phone,  setPhone] = useState<number>();
const account = localStorage.getItem("monnifyAccountNumber") as string;
const [moniepointWallet, setMoniepointWallet] = useState<number | null>(0);

const [loading, setLoading] = useState(true);

  useEffect(() => {
      const timer = setTimeout(() => {
          setLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function fetchBalance() {
      if (account) {
        try {
          const balance = await getMonie(account);
          setMoniepointWallet(balance);
        } catch (error) {
          setMoniepointWallet(null);
        }
      }
    }
    fetchBalance();
  }, [account]);

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
        return data.responseBody.availableBalance;
    } catch (error) {
        console.error('Error fetching balance:', error);
        throw error;
    }
}

 
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
  const res = await fetch("https://twa-backend-g83o.onrender.com/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",  
    body: JSON.stringify({  moniepointWallet ,    phone: Phone ,  plan: plan, network: network }),
  });

  if (res.ok) {
    const alertBox = document.createElement('div');
    alertBox.innerHTML = "Joined! <br/>Takes some moments for package to reflect";
    alertBox.style.position = 'fixed';
    alertBox.style.bottom = '0';
   
   alertBox.style.margin = 'auto';
   alertBox.style.justifyContent = 'space-around';
    alertBox.style.height = '30%';
    alertBox.style.alignSelf = 'center';
    alertBox.style.backgroundColor = 'white';
    alertBox.style.color = 'black';
    alertBox.style.padding = '20px';
    alertBox.style.borderTopLeftRadius = '5px';
    alertBox.style.borderTopRightRadius = '5px';
    alertBox.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
    alertBox.style.fontFamily = 'Lexend';
    alertBox.style.zIndex = '1000';
    document.body.appendChild(alertBox);
    setTimeout(() => {
      document.body.removeChild(alertBox);
    }, 5000);     
  }

  const responseData = await res.json();
  const userId = responseData.userId;
  const minAmount = "1000";
  
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
          <h3 style={{textAlign: "center", display:'flex'}}><div  style={{left:'0'}}><a href="#/latest" style={{color:'gray'}}><BsBarChart/></a></div><div   style={{marginLeft:'32%'}}>CryptoFund</div></h3>

          <div  style={{ borderRadius:'10px'}} >
            
            <Input
              placeholder="Enter phone number"
              id="phone" 
              
              value={Phone ?? ''} 
              onChange={e => setPhone(Number(e.target.value))}
               
            />
          <br/><br/>
          </div>  <br/>
          <div style={{ borderRadius:'10px'}} >
            
            <Input placeholder="Plan (must not be lesser than 500)"
              id="plan" 
              value={plan} 
              onChange={e => setPlan(Number(e.target.value))} 
               
           /> <br/><br/>
                <br/><Input placeholder="network"
              id="plan" 
              value={network} 
              onChange={e => setNetwork((e.target.value))} 
               
           /> 
          </div>  <br/>
          <div style =  {{display:"flex" ,justifyContent:'space-between' }}>
          <Button onClick={joinNodeRequest} style={{ fontSize:'17px',padding: '10px',
width: '95%',height: '40px'}}>Join node</Button></div>
          <br/><br/><ExPanelPIN>Balance: {moniepointWallet} </ExPanelPIN> 
        </div>
     <div><FootNavig/></div>
      </AppContainer>
    </StyledApp>
  );
}
export default PIN;
