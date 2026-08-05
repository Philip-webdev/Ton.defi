import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Banknote, Plus, Check, ArrowRight, Coins, X, Trash2 } from 'lucide-react';
import styled from 'styled-components';
import { useTheme } from "../contexts/ThemeContext";

const PageContainer = styled.div<{ $bg: string }>`
  background: ${p => p.$bg};
  color: #F0EDE8;
  font-family: 'Sora', sans-serif;
  min-height: 100vh;
  padding: 20px;
`;

const CircleBtn = styled.button<{ $surface: string; $border: string }>`
  width: 42px; height: 42px; border-radius: 50%;
  border: 1px solid ${p => p.$border}; background: ${p => p.$surface};
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: inherit;
`;

const CardBox = styled.div<{ $surface: string; $border: string; $selected: boolean; $accent: string }>`
  background: ${p => p.$surface};
  border-radius: 20px;
  padding: 18px;
  border: 1.5px solid ${p => p.$selected ? p.$accent : p.$border};
  transition: all 0.3s ease;
  margin-bottom: 12px;
`;

const IconCircle = styled.div<{ $accent: string }>`
  width: 44px; height: 44px; border-radius: 50%;
  background: ${p => p.$accent}; display: flex;
  align-items: center; justify-content: center;
  color: #0A0A0A;
`;

const MethodLabel = styled.span<{ $text: string }>`
  font-weight: 600; font-size: 14px; color: ${p => p.$text};
`;

const RadioButton = styled.div<{ $selected: boolean; $accent: string; $border: string }>`
  width: 20px; height: 20px; border-radius: 50%;
  border: 2px solid ${p => p.$selected ? p.$accent : p.$border};
  background: ${p => p.$selected ? p.$accent : 'transparent'};
  display: flex; align-items: center; justify-content: center;
`;

const AddCardBtn = styled.button<{ $accent: string; $border: string }>`
  width: 100%; padding: 14px;
  background: transparent;
  border: 1.5px dashed ${p => p.$accent}40;
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  color: ${p => p.$accent}; font-weight: 600; font-size: 13px;
  cursor: pointer; transition: all 0.3s;
  font-family: 'Sora', sans-serif;
`;

const Modal = styled.div<{ $isOpen: boolean }>`
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(8px);
  display: ${p => p.$isOpen ? 'flex' : 'none'};
  justify-content: center; align-items: center;
  z-index: 9999; padding: 20px;
`;

const ModalContent = styled.div<{ $surface: string }>`
  width: 100%; max-width: 420px;
  background: ${p => p.$surface};
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 24px; padding: 28px;
`;

const InputField = styled.input<{ $surface: string; $border: string; $text: string }>`
  width: 100%; padding: 14px 16px;
  border: 1px solid ${p => p.$border};
  border-radius: 14px; font-size: 14px;
  background: ${p => p.$surface}; color: ${p => p.$text};
  font-family: 'Sora', sans-serif;
  &:focus { outline: none; border-color: #B8FF00; }
  &::placeholder { color: #555; }
`;

const LabelText = styled.label<{ $text: string }>`
  display: block; font-size: 12px; font-weight: 600;
  margin-bottom: 8px; color: ${p => p.$text};
  letter-spacing: 0.5px; text-transform: uppercase;
`;

const SubmitBtn = styled.button<{ $accent: string }>`
  width: 100%; padding: 14px;
  background: ${p => p.$accent}; color: #0A0A0A;
  border: none; border-radius: 14px;
  font-weight: 700; font-size: 14px;
  font-family: 'Sora', sans-serif;
  cursor: pointer; transition: all 0.3s;
  &:hover { box-shadow: 0 8px 24px ${p => p.$accent}30; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

interface Card {
  id: string; cardNumber: string; cardHolder: string;
  expiryMonth: string; expiryYear: string; cvv: string; bank: string;
}

const CheckoutContainer = () => {
  const { colors } = useTheme();
  const [selectedMethod, setSelectedMethod] = useState('CARD');
  const [selectedCard, setSelectedCard] = useState('');
  const [savedCards, setSavedCards] = useState<Card[]>([]);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [newCard, setNewCard] = useState({ cardNumber: '', cardHolder: '', expiryMonth: '', expiryYear: '', cvv: '', bank: '' });

  const navigate = useNavigate();
  const { state } = useLocation();
  const initiatedPrice = state?.price || 0;

  useEffect(() => {
    const stored = localStorage.getItem('savedCards');
    if (stored) {
      const cards = JSON.parse(stored);
      setSavedCards(cards);
      if (cards.length > 0) setSelectedCard(cards[0].id);
    }
  }, []);

  const handleAddCard = () => {
    if (!newCard.cardNumber || !newCard.cardHolder || !newCard.expiryMonth || !newCard.expiryYear || !newCard.cvv || !newCard.bank) {
      alert('Please fill in all fields'); return;
    }
    const card: Card = { id: Date.now().toString(), ...newCard };
    const updated = [...savedCards, card];
    setSavedCards(updated);
    localStorage.setItem('savedCards', JSON.stringify(updated));
    setSelectedCard(card.id);
    setIsAddCardModalOpen(false);
    setNewCard({ cardNumber: '', cardHolder: '', expiryMonth: '', expiryYear: '', cvv: '', bank: '' });
  };

  const handleDeleteCard = (cardId: string) => {
    const updated = savedCards.filter(c => c.id !== cardId);
    setSavedCards(updated);
    localStorage.setItem('savedCards', JSON.stringify(updated));
    if (selectedCard === cardId && updated.length > 0) setSelectedCard(updated[0].id);
  };

  const getCardBrand = (n: string) => n.charAt(0) === '4' ? 'visa' : n.charAt(0) === '5' ? 'mastercard' : 'card';

  const formatCardNumber = (v: string) => v.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') || v;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\s/g, '');
    if (v.length <= 16 && /^\d*$/.test(v)) setNewCard({ ...newCard, cardNumber: v });
  };

  const handleProceed = () => {
    if (selectedMethod === 'CARD' && !selectedCard) { alert('Please select a card'); return; }
    console.log('Processing payment:', { method: selectedMethod, card: selectedCard, amount: initiatedPrice });
  };

  const inputStyle = { background: colors.inputBg, border: `1px solid ${colors.border}`, color: colors.text };

  return (
    <PageContainer $bg={colors.bg}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, paddingTop: 8 }}>
        <CircleBtn $surface={colors.surface} $border={colors.border} onClick={() => navigate(-1)}>
          <ChevronLeft size={17} />
        </CircleBtn>
        <span style={{ fontSize: 14, fontWeight: 600 }}>Checkout</span>
        <div style={{ width: 42 }} />
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* Cash */}
        <CardBox $surface={colors.surface} $border={colors.border} $selected={selectedMethod === 'CASH'} $accent={colors.accent}>
          <div onClick={() => setSelectedMethod('CASH')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <IconCircle $accent={colors.accent}><Banknote size={18} /></IconCircle>
              <MethodLabel $text={colors.text}>Cash on Delivery</MethodLabel>
            </div>
            <ArrowRight size={16} color={colors.textMuted} />
          </div>
        </CardBox>

        {/* Card */}
        <CardBox $surface={colors.surface} $border={colors.border} $selected={selectedMethod === 'CARD'} $accent={colors.accent}>
          <div onClick={() => setSelectedMethod('CARD')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <IconCircle $accent={colors.accent}><CreditCard size={18} /></IconCircle>
              <MethodLabel $text={colors.text}>Credit/Debit Card</MethodLabel>
            </div>
            <ChevronLeft size={16} color={colors.textMuted} style={{ transform: selectedMethod === 'CARD' ? 'rotate(-90deg)' : 'rotate(180deg)', transition: 'transform 0.3s' }} />
          </div>

          {selectedMethod === 'CARD' && (
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {savedCards.map(card => (
                <div key={card.id} onClick={() => setSelectedCard(card.id)} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px', borderRadius: 14,
                  background: selectedCard === card.id ? `${colors.accent}12` : 'transparent',
                  border: `1px solid ${selectedCard === card.id ? colors.accent : colors.border}`,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 44, height: 30, background: colors.surfaceElevated, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${colors.border}` }}>
                      <img src={getCardBrand(card.cardNumber) === 'visa' ? 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg' : 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg'} alt="" style={{ width: 32, height: 'auto' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{card.bank}</div>
                      <div style={{ fontSize: 11, color: colors.textMuted }}>**** **** **** {card.cardNumber.slice(-4)}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteCard(card.id); }} style={{ background: 'none', border: 'none', color: '#FF5252', cursor: 'pointer', padding: 4 }}>
                      <Trash2 size={16} />
                    </button>
                    <RadioButton $selected={selectedCard === card.id} $accent={colors.accent} $border={colors.border}>
                      {selectedCard === card.id && <Check size={10} color="#0A0A0A" />}
                    </RadioButton>
                  </div>
                </div>
              ))}

              <AddCardBtn $accent={colors.accent} $border={colors.border} onClick={() => setIsAddCardModalOpen(true)}>
                <Plus size={16} /> Add New Card
              </AddCardBtn>
            </div>
          )}
        </CardBox>

        {/* Crypto */}
        <CardBox $surface={colors.surface} $border={colors.border} $selected={selectedMethod === 'CRYPTO'} $accent={colors.accent}>
          <div onClick={() => { setSelectedMethod('CRYPTO'); navigate('/send', { state: { priceTosend: initiatedPrice } }); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <IconCircle $accent={colors.accent}><Coins size={18} /></IconCircle>
              <MethodLabel $text={colors.text}>Pay with Crypto</MethodLabel>
            </div>
            <ArrowRight size={16} color={colors.textMuted} />
          </div>
        </CardBox>

        <SubmitBtn $accent={colors.accent} onClick={handleProceed} disabled={selectedMethod === 'CARD' && !selectedCard}>
          Pay {`\u20A6`}{initiatedPrice.toLocaleString()}
        </SubmitBtn>
      </div>

      {/* Modal */}
      <Modal $isOpen={isAddCardModalOpen} onClick={() => setIsAddCardModalOpen(false)}>
        <ModalContent $surface={colors.surface} onClick={(e) => e.stopPropagation()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: colors.text }}>Add Card</span>
            <button onClick={() => setIsAddCardModalOpen(false)} style={{ background: 'none', border: 'none', color: colors.textMuted, cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>

          <div style={{ marginBottom: 16 }}>
            <LabelText $text={colors.textMuted}>Card Number</LabelText>
            <InputField $surface={colors.inputBg} $border={colors.border} $text={colors.text} placeholder="1234 5678 9012 3456" value={formatCardNumber(newCard.cardNumber)} onChange={handleCardNumberChange} maxLength={19} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <LabelText $text={colors.textMuted}>Cardholder Name</LabelText>
            <InputField $surface={colors.inputBg} $border={colors.border} $text={colors.text} placeholder="JOHN DOE" value={newCard.cardHolder} onChange={(e) => setNewCard({ ...newCard, cardHolder: e.target.value.toUpperCase() })} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <LabelText $text={colors.textMuted}>Bank Name</LabelText>
            <InputField $surface={colors.inputBg} $border={colors.border} $text={colors.text} placeholder="GTBank, Access Bank..." value={newCard.bank} onChange={(e) => setNewCard({ ...newCard, bank: e.target.value })} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <LabelText $text={colors.textMuted}>Month</LabelText>
              <InputField $surface={colors.inputBg} $border={colors.border} $text={colors.text} placeholder="MM" value={newCard.expiryMonth} onChange={(e) => { const v = e.target.value; if (v.length <= 2 && /^\d*$/.test(v)) setNewCard({ ...newCard, expiryMonth: v }); }} maxLength={2} />
            </div>
            <div>
              <LabelText $text={colors.textMuted}>Year</LabelText>
              <InputField $surface={colors.inputBg} $border={colors.border} $text={colors.text} placeholder="YY" value={newCard.expiryYear} onChange={(e) => { const v = e.target.value; if (v.length <= 2 && /^\d*$/.test(v)) setNewCard({ ...newCard, expiryYear: v }); }} maxLength={2} />
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <LabelText $text={colors.textMuted}>CVV</LabelText>
            <InputField $surface={colors.inputBg} $border={colors.border} $text={colors.text} type="password" placeholder="123" value={newCard.cvv} onChange={(e) => { const v = e.target.value; if (v.length <= 3 && /^\d*$/.test(v)) setNewCard({ ...newCard, cvv: v }); }} maxLength={3} />
          </div>
          <SubmitBtn $accent={colors.accent} onClick={handleAddCard}>Add Card</SubmitBtn>
        </ModalContent>
      </Modal>
    </PageContainer>
  );
};

export default CheckoutContainer;
