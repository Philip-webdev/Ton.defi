import { useEffect, useState } from "react";
import styled from "styled-components";

 

const AppContainer = styled.div`
  width: 100%;
  margin-bottom : 70px;
  font-size: 50px;
 
`;
const API = styled.div`
background-color: white;
 @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
       
  }
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

const CryptoRow = ({ crypto, logo }: { crypto: CryptoData; logo: string }) => {
    const percentChangeColor = crypto.quote.USD.percent_change_24h < 0 ? 'red' : 'green';

    return (
        <API style={{  borderRadius: '7px' ,   margin:'7px' ,display:'flex' ,padding:'15px'  }}>
            <div  style={{   display:'flex'  }}>
              <div><img src={logo} alt={`${crypto.name} logo`} style={{ width: '40px', height: '40px' }} /></div>
               <div style={{   margin:'5px' }}>{crypto.symbol}</div></div> 
            <div style={{marginLeft:'10px', fontSize:'12px',display:'flex'}}>
           
            <div style={{    margin:'7px' }}>${crypto.quote.USD.price.toFixed(2)}</div>
            <div style={{    margin:'7px', color: percentChangeColor }}>
                {crypto.quote.USD.percent_change_24h.toFixed(2)}%
            </div>
        </div></API>
    );
};

function Api() {
    const [cryptos, setCryptos] = useState<CryptoData[]>([]);
    
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
    }, []);

    return (
        <AppContainer>
            <section  style={{ margin:'0', justifyContent:'center' , display:'inline', width:innerWidth}}>
                {/* <thead style={{ zoom:'70%', color:'grey' }}> */}
                    {/* <tr>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>Change/Price (24h)</th>
                    </tr>
                </thead> */}
                <div style={{fontSize:'15px', color: 'grey'}}>
                    {cryptos.map((crypto, index) => (
                        <CryptoRow key={crypto.id} crypto={crypto} logo={logos[index]} />
                    ))}
                </div>
            </section>
        </AppContainer>
    );
}

export default Api;
