// components/ProductCard.tsx
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  border-radius: 12px;
  padding: 12px ;
  display:flex;
  flex-direction:column;
  gap:8px;
  border: 1px solid rgba(255,255,255,0.04);
  transition: transform .16s ease, box-shadow .16s ease;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 34px rgba(11, 178, 255, 0.08);
  }
`;

const ImgWrap = styled.div`
  width:100%;
  aspect-ratio: 4/3;
  border-radius:10px;
  overflow:hidden;
  background:linear-gradient(90deg,#071018,#0f1114);
  display:flex;
  align-items:center;
  justify-content:center;
`;

const Title = styled.div`
  font-weight:700;
  color:#e6eef8;
  font-size:16px;
`;

const Meta = styled.div`
  font-size:12px;
  color:#9fb6c6;
  display:flex;
  justify-content:space-between;
  align-items:center;
`;

const AddBtn = styled.button`
  margin-top:auto;
  background: linear-gradient(90deg,#12e6ff,#8b5cff);
  color:#071018;
  border:none;
  padding:8px 10px;
  border-radius:10px;
  cursor:pointer;
  font-weight:700;
  box-shadow: 0 8px 20px rgba(139,92,255,0.12);
`;

type Product = {
  id: string;
  title: string;
  creator: string;
  price: number;
  image: string;
  rarity: string;
};

export default function ProductCard({ product, onAdd }: { product: Product; onAdd: () => void; }) {
  return (
    <Card>
      <ImgWrap>
        <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </ImgWrap>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Title>{product.title}</Title>
        <Meta>
          <div>{product.creator}</div>
          <div style={{ color: '#9ff', fontWeight: 700 }}>₦{product.price.toLocaleString()}</div>
        </Meta>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 12, color: '#a0cbd9' }}>{product.rarity}</div>
          <AddBtn onClick={onAdd}>Add</AddBtn>
        </div>
      </div>
    </Card>
  );
}
