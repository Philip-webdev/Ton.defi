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

function nftApi() {
   const [resultnfts, setResponse] = useState(<div></div>);

    useEffect(() => {
        const fetchData = async () => {
           

try {
    await Moralis.start({
      apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6Ijk1OWZkODlmLWUwNmEtNGYxYi05YzJmLTUwYmI1YzhjMTUxYSIsIm9yZ0lkIjoiNDQ2NzI0IiwidXNlcklkIjoiNDU5NjIwIiwidHlwZUlkIjoiNzFiYjRiODAtYjA5ZS00ZTk1LThiNmItNmIxMDA3ZWU3MWQ2IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NDcwODQ2ODQsImV4cCI6NDkwMjg0NDY4NH0.b3gtSE9QpCwe8EMHqGJCBXWm2vlHBEL-cWY8P2WKn6s"
    });
  
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      "chain": "0x1",
      "format": "decimal",
      "normalizeMetadata": true,
      "mediaItems": true,
      "limit": 4,
      "address": "0xff3879b8a363aed92a6eaba8f61f1a96a9ec3c1e"
    });
  setResponse(
    <div>
      {response.result.map((nft: any, index: number) => (
        <div key={index}>
         
          <img src={nft.metadata?.image || ""} alt={nft.metadata?.name || "NFT"} style={{borderRadius:'7px' ,width: "100px", height: "100px" }} />
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
          { resultnfts}
          </API>
         
    
                
         
        </AppContainer>
    );
}

export default nftApi;
 

// for erc balances, special calling😝


// try {
//  await Moralis.start({
//   apiKey: "YOUR_API_KEY"
//  });
 
//  const response = await Moralis.EvmApi.token.getWalletTokenBalances({
//   "chain": "0x1",
//   "address": "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326"
//  });
 
//  console.log(response.raw);
// } catch (e) {
//  console.error(e);
 
//  //wallet history here
 
