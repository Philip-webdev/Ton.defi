import axios from "axios";
import Axios from "axios";
import { useEffect, useState } from "react";

function Api() {
    // Setting up the initial states using
    // react hook 'useState'
    const [search, setSearch] = useState("");
    const [crypto, setCrypto] = useState([]);
    const [name, GetName] = useState('Dummy');

    // Fetching crypto data from the API only
    // once when the component is mounted
    let response = null;
    useEffect(() => {
     response =  axios.get(
            `https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=4a218c19-80f5-4eb9-828e-f3e4dd8b05f1`
        ).then((res) => {
            var result = res.data;
            console.log(result);
            GetName(result[0].name);

        });
    }, []);

    return (
        <div className="App">
            <h1>All Cryptocurrencies</h1>
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
                  {name} 
                                 
                </tbody>
            </table>
        </div>
    );
}

export default Api;