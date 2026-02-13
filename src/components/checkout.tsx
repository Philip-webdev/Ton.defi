import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Wallet, Banknote, Building2, Plus, Check, ShieldCheck, Zap, Info, ArrowRight, Coins } from 'lucide-react';
import styled from 'styled-components';

const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  font-family: Lexend;
   min-height: 250vh;
  padding: 20px;
 zoom :100%;
  @media (prefers-color-scheme: dark) {
    background-color: rgb(33,33,33);
    color: gray;
  }
`;


const SAVED_CARDS = [
  { id: '1', brand: 'mastercard', last4: '1234', bank: 'Axis Bank' },
  { id: '2', brand: 'visa', last4: '5678', bank: 'HDFC Bank' },
];

const CRYPTO_TOKENS = [
  { symbol: 'ETH', name: 'Ethereum', icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', network: 'Ethereum' },
  { symbol: 'USDC', name: 'USD Coin', icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png', network: 'Polygon' },
  { symbol: 'SOL', name: 'Solana', icon: 'https://cryptologos.cc/logos/solana-sol-logo.png', network: 'Solana' },
];

const CheckoutContainer = () => {
  const [selectedMethod, setSelectedMethod] = useState('CARD');
  const [selectedCard, setSelectedCard] = useState('1');
  const [selectedToken, setSelectedToken] = useState('ETH');
  const navigate = useNavigate();
  const { state } = useLocation();

  const initiatedPrice = state.price;
  const packageType = state.type;

  // Reusable Style Objects
  const styles = {
   
    cardBase: {
      width: '100%',
      
      borderRadius: '1rem',
      border: '1px',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      outline: 'none'
    },
    iconBox: (color: string) => ({
      width: '2.5rem',
      height: '2.5rem',
      borderRadius: '0.75rem',
      backgroundColor: color === 'blue' ? 'none' : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: color === 'blue' ? 'rgb(0, 127, 229)' : '#4f46e5'
    }),
    radioOuter: (active: any) => ({
      width: '1.25rem',
      height: '1.25rem',
      borderRadius: '50%',
      border: `2px solid ${active ? '#a855f7' : '#e5e7eb'}`,
      backgroundColor: active ? '#a855f7' : 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s'
    })
  };

  const renderMethods = () => (
    <StyledApp>
    <div style={{  display: 'flex',
    background:'none',
      flexDirection: 'column',
      gap: '1rem',
      transition: 'all 0.5s ease-in-out'}}>
      
      {/* Cash on Delivery */}
      <button 
        onClick={() => setSelectedMethod('CASH')}
        style={{
          ...styles.cardBase,
          borderColor: selectedMethod === 'CASH' ? 'rgb(0, 127, 229)' : '#ffffff',
          backgroundColor: selectedMethod === 'CASH' ? 'rgb(15,15,15)' : 'transparent',
          boxShadow: selectedMethod === 'CASH' ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={styles.iconBox('blue')}>
            <Banknote size={20} />
          </div>
          <span style={{ fontWeight: 600, color:'gray' }}>Cash on Delivery</span>
        </div>
        <ArrowRight size={18} style={{ color: '#9ca3af' }} />
      </button>

      {/* Credit/Debit Card */}
      <div style={{
        ...styles.cardBase,
        flexDirection: 'column',
        alignItems: 'stretch',
        borderRadius: '1.5rem',
        borderColor: selectedMethod === 'CARD' ? 'rgb(0, 127, 229)' : '#ffffff',
        backgroundColor: selectedMethod === 'CARD' ? 'rgb(15,15,15)' : 'transparent',
        boxShadow: selectedMethod === 'CARD' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
      }}>
        <button 
          onClick={() => setSelectedMethod('CARD')}
          style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', width: '100%' }}
        >
          <div style={{ display: 'flex', flexWrap:'wrap' ,alignItems: 'center', gap: '1rem' }}>
            <div style={styles.iconBox('blue')}>
              <CreditCard size={20} />
            </div>
            <span style={{ fontWeight: 600, color:'gray' }}>Credit/Debit Card</span>
          </div>
          <ChevronLeft size={18} style={{ 
            color: '#9ca3af', 
            transition: 'transform 0.3s',
            transform: selectedMethod === 'CARD' ? 'rotate(-90deg)' : 'rotate(180deg)'
          }} />
        </button>

        {selectedMethod === 'CARD' && (
          <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
            {SAVED_CARDS.map(card => (
              <div 
                key={card.id}
                onClick={() => setSelectedCard(card.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  backgroundColor: selectedCard === card.id ? 'transparent' : 'transparent'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '3rem', height: '2rem', backgroundColor: '#fff', borderRadius: '4px', border: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={card.brand === 'visa' ? 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg' : 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg'} alt={card.brand} style={{ width: '2rem' }} />
                  </div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'whitesmoke', margin: 0 }}>{card.bank} **** {card.last4}</p>
                </div>
                <div style={styles.radioOuter(selectedCard === card.id)}>
                  {selectedCard === card.id && <Check size={12} color="white" />}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Crypto Option */}
      <div style={{
        
        flexDirection: 'column',
        alignItems: 'stretch',
        borderRadius: '1.5rem',
        borderColor: selectedMethod === 'CRYPTO' ? 'rgb(0, 127, 229)' : '#ffffff',
        backgroundColor: selectedMethod === 'CRYPTO' ? 'rgb(15,15,15)' : 'transparent',
        boxShadow: selectedMethod === 'CRYPTO' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
      }}>
         <button 
          onClick={() =>{ setSelectedMethod('CRYPTO'); navigate('/send', {state:{ priceTosend: initiatedPrice}});}}
          style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', width: '100%' }}
        >
          <div style={{ display: 'flex', flexWrap:'wrap' ,alignItems: 'center', gap: '1rem' }}>
            <div style={styles.iconBox('blue')}>
              <Coins size={20} />
            </div>
            <span style={{ fontWeight: 600, color:'gray' }}>Pay with Crypto</span>
          </div>
          <ChevronLeft size={18} style={{ 
            color: '#9ca3af', 
            transition: 'transform 0.3s',
            transform: selectedMethod === 'CRYPTO' ? 'rotate(-90deg)' : 'rotate(180deg)'
          }} />
        </button>
      </div>
    </div>
    </StyledApp>
  );

  return (
    <div style={{ maxWidth: 'auto', margin: '0 auto' }}>
      {renderMethods()}
    </div>
  );
};

export default CheckoutContainer;
