import { useEffect, useState } from "react";
import styled from "styled-components";
import Moralis from 'moralis';
 
 

const AppContainer = styled.div`
  width: 100%;
   
  font-size: 15px;
 
`;
const API = styled.div`
background-color: white;
 
 @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
       color:white;
  }
`;

function WalletHistoryApi() {
   const [walletHistory, setWalletHistory] = useState(<div>No transactions yet</div>);

    useEffect(() => {
        const fetchData = async () => {
           

try {
    await Moralis.start({
      apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6Ijk1OWZkODlmLWUwNmEtNGYxYi05YzJmLTUwYmI1YzhjMTUxYSIsIm9yZ0lkIjoiNDQ2NzI0IiwidXNlcklkIjoiNDU5NjIwIiwidHlwZUlkIjoiNzFiYjRiODAtYjA5ZS00ZTk1LThiNmItNmIxMDA3ZWU3MWQ2IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NDcwODQ2ODQsImV4cCI6NDkwMjg0NDY4NH0.b3gtSE9QpCwe8EMHqGJCBXWm2vlHBEL-cWY8P2WKn6s"
    });
  
    const response = await Moralis.EvmApi.wallets.getWalletHistory({
      "chain": "0x1",
          "order": "DESC",
    "address": "0xcB1C1FdE09f811B294172696404e88E658659905"
    });
  setWalletHistory(
    <div>
      {response.result.map((history: any, index: number) => (
        <div key={index}>
         
          
        </div>
      ))}
    </div>
  );
    console.log(response.raw);
  } catch (e) {
    console.error(e);
  }
  
        };

        fetchData();
    }, []);
 

  

 return (
        <AppContainer >
            <API>
          {walletHistory}
          </API>
         
    
                
         
        </AppContainer>
    );
}

export default WalletHistoryApi;
 
