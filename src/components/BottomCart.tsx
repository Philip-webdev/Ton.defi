// components/BottomCart.tsx
import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const SheetBackdrop = styled.div<{ open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(2,6,23,0.6);
  backdrop-filter: blur(6px);
  display: ${({ open }) => (open ? 'block' : 'none')};
  z-index: 60;
`;

const slideUp = keyframes`
  from { transform: translateY(100%); }
  to   { transform: translateY(0%); }
`;

const Sheet = styled.div<{ open: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 70;
  max-height: 80vh;
  background: linear-gradient(180deg, rgba(5,7,12,0.98), rgba(8,10,16,0.98));
  color: #e6eef8;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0 -20px 60px rgba(18,230,255,0.06);
  padding: 14px;
  transform: translateY(100%);
  animation: ${({ open }) => (open ? slideUp : 'none')} 260ms ease forwards;
  overflow: auto;
  border: 1px solid rgba(123,230,255,0.07);
`;

const Grip = styled.div`
  width: 48px;
  height: 6px;
  background: linear-gradient(90deg,#7be3ff,#8b5cff);
  border-radius: 999px;
  margin: 6px auto 10px;
  opacity: 0.9;
`;

const ItemRow = styled.div`
  display:flex;
  gap:12px;
  align-items:center;
  padding:10px;
  border-bottom: 1px solid rgba(255,255,255,0.03);
`;

const QtyController = styled.div`
  display:flex;
  gap:6px;
  align-items:center;
  background: rgba(255,255,255,0.02);
  padding: 4px;
  border-radius: 8px;
`;

const NeonButton = styled.button`
  background: linear-gradient(90deg,#12e6ff,#8b5cff);
  color:#071018;
  border:none;
  padding:8px 12px;
  border-radius:10px;
  cursor:pointer;
  font-weight:700;
`;

export default function BottomCart({
  open,
  onClose,
  cart,
  onRemove,
  onUpdateQty,
  clearCart,
  total
}: {
  open: boolean;
  onClose: () => void;
  cart: Array<{ product: { id: string; title: string; price: number; image: string }, qty: number }>;
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  total: number;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <>
      <SheetBackdrop open={open} onClick={onClose} />
      <Sheet open={open} aria-hidden={!open}>
        <Grip />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 6px 6px' }}>
          <div style={{ fontWeight: 800, fontSize: 18 }}>Your Cart</div>
          <div style={{ color: '#7be3ff', fontWeight: 700 }}>₦{total.toLocaleString()}</div>
        </div>

        {cart.length === 0 ? (
          <div style={{ padding: 20, textAlign: 'center', color: '#9fb6c6' }}>
            Your cart is empty
          </div>
        ) : (
          <>
            <div>
              {cart.map(item => (
                <ItemRow key={item.product.id}>
                  <img src={item.product.image} alt={item.product.title} style={{ width: 64, height: 48, objectFit: 'cover', borderRadius: 8 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>{item.product.title}</div>
                    <div style={{ fontSize: 12, color: '#9fb6c6' }}>₦{item.product.price.toLocaleString()}</div>
                  </div>

                  <QtyController>
                    <button onClick={() => onUpdateQty(item.product.id, item.qty - 1)} style={{ background: 'transparent', border: 'none', color: '#7be3ff', fontWeight: 700, cursor: 'pointer' }}>−</button>
                    <div style={{ minWidth: 22, textAlign: 'center' }}>{item.qty}</div>
                    <button onClick={() => onUpdateQty(item.product.id, item.qty + 1)} style={{ background: 'transparent', border: 'none', color: '#7be3ff', fontWeight: 700, cursor: 'pointer' }}>+</button>
                  </QtyController>

                  <button onClick={() => onRemove(item.product.id)} style={{ background: 'transparent', border: 'none', color: '#ff6b7a', marginLeft: 8, cursor: 'pointer' }}>Remove</button>
                </ItemRow>
              ))}
            </div>

            <div style={{ padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button onClick={clearCart} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.04)', color: '#9fb6c6', padding: '8px 10px', borderRadius: 10 }}>Clear</button>
              <NeonButton onClick={() => {
                // example checkout behaviour - you can replace
                alert(`Proceed to pay ₦${total.toLocaleString()}`);
              }}>
                Checkout ₦{total.toLocaleString()}
              </NeonButton>
            </div>
          </>
        )}
      </Sheet>
    </>
  );
}
