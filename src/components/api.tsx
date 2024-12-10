import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledApp = styled.div`
  background-color: whitesmoke;
  color: black;
  border-radius: 17px;
  position: fixed;
  height: fit-content;
  padding: 20px;

  @media (prefers-color-scheme: dark) {
    background-color: rgb(29, 40, 58);
    color: white;
  }
`;

const AppContainer = styled.div`
  width: fit-content;
  margin: 0;
`;

interface CryptoData {
    logo: string;
    id:  string;
    cmc_rank: number;
    name: string;
    symbol: string;
    quote: {
        USD: {
            price: number;
        };
    };
}

const CryptoRow = ({ crypto }: { crypto: CryptoData }) => (
    <tr style={{ borderRadius: '7px' }}>
        <td> 
        {crypto.logo}
        </td>
        <td style={{ padding: '7px' }}>{crypto.name}</td>
        <td style={{ paddingRight: '17px' }}>{crypto.symbol}</td>
        <td style={{ paddingLeft: '20px' }}>${crypto.quote.USD.price.toFixed(2)}</td>
    </tr>
);


function Api() {
    const [cryptos, setCryptos] = useState<CryptoData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://twa-backend-g83o.onrender.com/api/cryptocurrency');
                const result = await response.json();
                console.log(result);

          
                const topCryptos = result.data.slice(0, 5);
                setCryptos(topCryptos);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run once on mount

    return (
      
            <AppContainer>
                <table>
                    <thead>
                        <tr>
                            <th>Logo</th>
                            <th>Name</th>
                            <th>Symbol</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cryptos.map((crypto) => (
                            <CryptoRow key={crypto.id} crypto={crypto} />
                        ))}
                    </tbody>
                </table>
            </AppContainer>
    
    );
}

export default Api;