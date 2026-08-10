// components/Marketplace.tsx
import styled from 'styled-components';
import '../index.css';
import { useEffect, useState } from 'react';
import ProductCard from './productCard';
import { Search } from "lucide-react";
import FootNavig from './footnavig';

const StyledApp = styled.div`
  background-color: #0f0f10; /* dark base to match Web3 look */
  color: #e6eef8;
  margin: 0;
  font-family: 'Sora', sans-serif;
  min-height: 100vh;
  padding: 20px;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 20px;
`;

/* Header search bar container */
const HeaderBar = styled.div`
  display:flex;
  gap:12px;
  align-items:center;
  width:100%;
  background: linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  border-radius: 12px;
  padding: 8px;
  border: 1px solid rgba(255,255,255,0.04);
`;

type Product = {
  id: string;
  title: string;
  creator: string;
  price: number; // numeric price for calculations
  image: string;
  rarity: string;
};

function Marketplace() {
  // Products - in real app, fetch these from API
  const Products: Product[] = [
    { id: '1', title: 'Spinach',  creator: 'CryptoPhil', price: 180, image: '/spinachNft.jpg', rarity: 'legendary' },
    { id: '2', title: 'Tomato',   creator: 'CryptoPhil', price: 120, image: '/spinachNft.jpg', rarity: 'epic' },
    { id: '3', title: 'Kale',     creator: 'CryptoPhil', price: 90,  image: '/spinachNft.jpg', rarity: 'rare' },
    { id: '4', title: 'Tomato XL',creator: 'CryptoPhil', price: 140, image: '/tomatoNft.jpg',  rarity: 'rare' },
    { id: '5', title: 'Rice',     creator: 'CryptoPhil', price: 200, image: '/riceNft.jpg',    rarity: 'common' },
  ];

  // Cart state: array of { product, qty }
  const [cart, setCart] = useState<Array<{ product: Product; qty: number }>>(() => {
    try {
      const raw = localStorage.getItem('cart_v1');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setCartOpen] = useState(false);

  // Search
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<Product[]>(Products);

  useEffect(() => {
    setFiltered(
      Products.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.creator.toLowerCase().includes(query.toLowerCase()) ||
        p.rarity.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query]);

  // Persist cart
  useEffect(() => {
    localStorage.setItem('cart_v1', JSON.stringify(cart));
  }, [cart]);

  // Add product (or increment qty) — called from ProductCard
  const addToCart = (product: Product, amount = 1) => {
    setCart(prev => {
      const idx = prev.findIndex(p => p.product.id === product.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + amount };
        return copy;
      } else {
        return [...prev, { product, qty: amount }];
      }
    });
    setCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQty = (productId: string, qty: number) => {
    if (qty <= 0) return removeFromCart(productId);
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, qty } : item));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((s, it) => s + it.product.price * it.qty, 0);

  return (
    <StyledApp>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <HeaderBar style={{ flex: 1 }}>
          <Search color="#7be3ff" />
          <input
            placeholder="Search products, creator or rarity..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#e6eef8',
              fontSize: 16,
              flex: 1,
              padding: '6px 8px'
            }}
          />
          <div style={{ color: '#7be3ff', fontSize: 13 }}>{filtered.length} results</div>
        </HeaderBar>

        {/* Floating cart button */}
        <button
          onClick={() => setCartOpen(true)}
          style={{
            background: 'linear-gradient(90deg,#12e6ff,#8b5cff)',
            border: 'none',
            padding: '10px 14px',
            borderRadius: 12,
            color: '#071018',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(18,230,255,0.12)'
          }}
        >
          Cart ({cart.reduce((s, i) => s + i.qty, 0)})
        </button>
      </div>

      <GridWrapper>
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} onAdd={() => addToCart(p)} />
        ))}
      </GridWrapper>

      <FootNavig />

      {isCartOpen && cart.length > 0 && (
        <div style={{ position: "fixed", bottom: 80, left: 0, right: 0, background: "rgba(0,0,0,0.9)", padding: "16px 20px", zIndex: 1000, maxWidth: 430, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "white", fontSize: 14, fontWeight: 600 }}>{cart.length} items - ₦{total.toLocaleString()}</span>
            <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>Close</button>
          </div>
        </div>
      )}
    </StyledApp>
  );
}

export default Marketplace;
