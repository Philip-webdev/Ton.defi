import { Megaphone } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const VerticalTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // The items you want to cycle through
  const items = [
    { id: 1, text: "ATH: Bitcoin reaches new all time high" },
    { id: 2, text: "Africa: The Future of stable crypto" },
    { id: 3, text: "New listings: $wei lists at $1" }
  ];

  const itemHeight = 30; 

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div style={{
      height: `${itemHeight}px`,
      overflow: 'hidden',
      color:'gray',
      backgroundColor: 'transparent',
      padding: '0 17px',
      borderRadius: '4px',
      border: 'none',
      display:'flex'
    }}>
        <Megaphone style={{padding:'7px', color:'gray'}}/>
      <div 
        style={{
          transform: `translateY(-${currentIndex * itemHeight}px)`,
          transition: 'transform 0.5s ease-in-out',
        }}
      >
        {items.map((item) => (
          <div 
            key={item.id} 
            style={{ 
              height: `${itemHeight}px`, 
              display: 'flex', 
              alignItems: 'center',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalTicker;
