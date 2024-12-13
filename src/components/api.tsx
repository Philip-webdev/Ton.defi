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
    id: string;
    cmc_rank: number;
    name: string;
    symbol: string;
    quote: {
        USD: {
            price: number;
            percent_change_24h:number;
        };
    };
}

const CryptoRow = ({ crypto, logo }: { crypto: CryptoData; logo: string }) => (
    <tr style={{ borderRadius: '7px' }}>
            
            <td style={{display:'flex'}}> <img src={logo} alt={`${crypto.name} logo`} style={{ width: '20px', height: '20px' }} />{crypto.name}</td>
            <td style={{ paddingRight: '17px' }}>{crypto.symbol}</td>
            <td style={{ paddingLeft: '20px' }}>${crypto.quote.USD.price.toFixed(2)}</td>
            <td style={{ paddingLeft: '10px' }}>{crypto.quote.USD.percent_change_24h.toFixed(2)}%</td>
        </tr>
);



function Api() {
    const [cryptos, setCryptos] = useState<CryptoData[]>([]);
    
    // Array of logos corresponding to the first five cryptocurrencies
    const logos = [
        'https://i.imgur.com/sSYmdfQ.png',
        'https://i.imgur.com/dhJjQcO.png',
        'https://i.imgur.com/WaJtG67.png', 
        'https://i.imgur.com/qfO2YuU.png',
        'https://i.imgur.com/rjWW55s.png'
    ];
    

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
            <table style={{ margin: 'auto', justifyContent: 'center' }}>
            <thead style={{zoom:'70%',color:'grey'}}>
                        <tr>
                            
                            <th>Name</th>
                            <th>Symbol</th>
                            <th>Price</th>
                            <th>change/price-24h</th>
                        </tr>
                    </thead>
                <tbody>
                    {cryptos.map((crypto, index) => (
                        <CryptoRow key={crypto.id} crypto={crypto} logo={logos[index]} />
                    ))}
                </tbody>
            </table>
        </AppContainer>
    );
}

export default Api;
