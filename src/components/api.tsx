import { useEffect, useState } from "react";
import styled from "styled-components";

 

const AppContainer = styled.div`
  width: 100%;
  margin-bottom : 70px;

 
`;
const API = styled.div`


background-color: white;
 @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
       color:white;
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

const CryptoRow = ({ crypto  }: { crypto: CryptoData;   }) => {
    const percentChangeColor = crypto.quote.USD.percent_change_24h < 0 ? 'red' : 'green';
    const getCryptoImage = (symbol: string) => {
        return symbol === 'BTC'
          ? 'https://i.imgur.com/sSYmdfQ.png'
          : symbol === 'ETH'
          ? 'https://i.imgur.com/dhJjQcO.png'
          : symbol === 'USDT'
          ? 'https://i.imgur.com/WaJtG67.png'
          : symbol === 'XRP'
          ? 'https://i.imgur.com/qfO2YuU.png'
          : symbol === 'SOL'
          ? 'https://i.imgur.com/rjWW55s.png'
          : 'https://i.imgur.com/VXWScc9.png';
      };
    return (
        <API style={{  borderRadius: '7px' ,   margin:'7px' ,display:'flex' ,padding:'15px'  }}>
             
            <div  style={{   display:'flex' , width:innerWidth }}>
               
              <div><img src={getCryptoImage(crypto.symbol)} alt={`${crypto.name} logo`} style={{ width: '40px', height: '40px' }} /></div>
               <div style={{   margin:'10px' }}>{crypto.symbol}</div></div> 
            <div style={{marginLeft:'10px', margin:'10px', fontSize:'12px',display:'flex'}}>
           
            <div style={{  left:'7', paddingRight:'17px' }}>{crypto.quote.USD.price.toFixed(2)}</div>
            <div style={{    left:'7', color: percentChangeColor }}>
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
        <AppContainer >
            <section  style={{ margin:'0', justifyContent:'center' , display:'inline', width:innerWidth}}>
            <div style={{fontSize:'15px', color: 'grey'}}>
       {cryptos.map((crypto, index) => (
           <CryptoRow key={crypto.id} crypto={crypto}   />
       ))}
       <div style={{fontSize:'15px', color: 'grey'}}>
        
       </div>
      </div> 
                
            </section>
        </AppContainer>
    );
}

export default Api;
