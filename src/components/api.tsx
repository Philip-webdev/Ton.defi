 
import axios from "axios";
import Axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";


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
  max-width: fit-content;
  margin: 0;
`;
function Api() {
    // Setting up the initial states using
    // react hook 'useState'
    const [search, setSearch] = useState("");
   // const [crypto, setCrypto] = useState([]);
    const [rank, GetRank] = useState(' ');
    const [name, GetName] = useState(' ');
    const [symbol, GetSymbol] = useState(' ');
    const [price, GetPrice] = useState(' ');
     

    // Fetching crypto data from the API only
    // once when the component is mounted
    useEffect(() => {
        fetch(
             'https://twa-backend-g83o.onrender.com/api/cryptocurrency'
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                GetRank(result.data[0].cmc_rank);
                GetName(result.data[0].name);
                GetSymbol(result.data[0].symbol);
                GetPrice(result.data[0].quote.USD.price); // Assuming you're fetching the first cryptocurrency name
            })
            .catch((error) => console.log(error));
    }, []);
    
    return (
        <div className="App">
          <AppContainer>
          
            <input id='Finder'
                type="text"
                placeholder="Search..."
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            <table>
                <thead>
                    <tr>
                        <td>Rank</td>
                        <td>Name</td>
                        <td>Symbol</td>
                        <td>Price</td>
                
                    </tr>
                </thead>
                {/* Mapping all the cryptos */}
                <tbody>
                    {/* Filtering to check for the searched crypto */}
                 <tr> <td>{name}</td>
                 <td>{name}</td>
                 <td>{name}</td>
                 <td>{name}</td></tr>
                                 
                </tbody>
            </table></AppContainer> 
        </div>
    );
}

export default Api;