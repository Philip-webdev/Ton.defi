import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  CreditCard, 
  Banknote, 
  Plus, 
  Check, 
  ArrowRight, 
  Coins,
  X,
  Trash2
} from 'lucide-react';
import styled from 'styled-components';

const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  font-family: Lexend;
  min-height: 100vh;
  padding: 20px;
 
  @media (prefers-color-scheme: dark) {
    background-color: rgb(15, 15, 15);
    color: gray;
  }
`;

const PageHeader = styled.div`
  display: flex;
  justify-self:center;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const BackButton = styled.button`
  background: white;
  color:black;
  border: none;
  width: 60px;
  height: 40px;
  padding:17px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  @media (prefers-color-scheme: dark) {
    background: rgb(1, 1, 1);
  }
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;

const MethodCard = styled.div<{ $selected: boolean }>`
  background: white;
  border-radius: 16px;
  padding: 16px;
  border: 2px solid ${props => props.$selected ? 'rgb(36, 172, 242)' : 'transparent'};
  transition: all 0.3s ease;
  margin-bottom: 12px;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
  
  @media (prefers-color-scheme: dark) {
    background: rgb(1, 1, 1);
    border-color: ${props => props.$selected ? 'rgb(36, 172, 242)' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const MethodButton = styled.button`
  background: none;
  border: none;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 0;
`;

const MethodInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgb(36, 172, 242), rgb(139, 48, 241));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const MethodLabel = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: black;
  
  @media (prefers-color-scheme: dark) {
    color: lightgray;
  }
`;

const CardList = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SavedCard = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-radius: 12px;
  background: ${props => props.$selected ? 'rgba(36, 172, 242, 0.1)' : 'transparent'};
  border: 1px solid ${props => props.$selected ? 'rgb(36, 172, 242)' : 'rgba(0, 0, 0, 0.1)'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(36, 172, 242, 0.05);
  }
  
  @media (prefers-color-scheme: dark) {
    border-color: ${props => props.$selected ? 'rgb(36, 172, 242)' : 'rgba(255, 255, 255, 0.1)'};
    background: ${props => props.$selected ? 'rgba(36, 172, 242, 0.15)' : 'transparent'};
  }
`;

const CardDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CardBrandLogo = styled.div`
  width: 48px;
  height: 32px;
  background: white;
  border-radius: 6px;
  border: 1px solid #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const CardBank = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  
  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;

const CardNumber = styled.p`
  font-size: 12px;
  color: gray;
  margin: 0;
`;

const RadioButton = styled.div<{ $selected: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${props => props.$selected ? 'rgb(36, 172, 242)' : '#e5e7eb'};
  background: ${props => props.$selected ? 'rgb(36, 172, 242)' : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
`;

const AddCardButton = styled.button`
  width: 100%;
  padding: 12px;
  background: transparent;
  border: 2px dashed rgba(36, 172, 242, 0.5);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: rgb(36, 172, 242);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(36, 172, 242, 0.05);
    border-color: rgb(36, 172, 242);
  }
`;

const Modal = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(10px);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
`;

const ModalContent = styled.div`
  width: 100%;
  max-width: 420px;
  background: white;
  border-radius: 20px;
  padding: 24px;
  
  @media (prefers-color-scheme: dark) {
    background: rgb(1, 1, 1);
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  
  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: gray;
  
  &:hover {
    color: black;
  }
  
  @media (prefers-color-scheme: dark) {
    &:hover {
      color: white;
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  
  @media (prefers-color-scheme: dark) {
    color: lightgray;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border:none;
  border-radius: 12px;
  font-size: 14px;
  background: white;
  
  &:focus {
    outline: none;
    border-color: rgb(36, 172, 242);
  }
  
  @media (prefers-color-scheme: dark) {
    background: rgb(15, 15, 15);
    border-color: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, rgb(36, 172, 242), rgb(139, 48, 241));
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(36, 172, 242, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 4px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const ProceedButton = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, rgb(36, 172, 242), rgb(139, 48, 241));
  color: white;
  border: none;
  border-radius: 16px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  margin-top: 24px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(36, 172, 242, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface Card {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  bank: string;
}

const CheckoutContainer = () => {
  const [selectedMethod, setSelectedMethod] = useState('CARD');
  const [selectedCard, setSelectedCard] = useState('');
  const [savedCards, setSavedCards] = useState<Card[]>([]);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    bank: ''
  });

  const navigate = useNavigate();
  const { state } = useLocation();

  const initiatedPrice = state?.price || 0;
  const packageType = state?.type || '';

  // Load saved cards from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('savedCards');
    if (stored) {
      const cards = JSON.parse(stored);
      setSavedCards(cards);
      if (cards.length > 0) {
        setSelectedCard(cards[0].id);
      }
    }
  }, []);

  const handleAddCard = () => {
    if (!newCard.cardNumber || !newCard.cardHolder || !newCard.expiryMonth || !newCard.expiryYear || !newCard.cvv || !newCard.bank) {
      alert('Please fill in all fields');
      return;
    }

    const card: Card = {
      id: Date.now().toString(),
      ...newCard
    };

    const updatedCards = [...savedCards, card];
    setSavedCards(updatedCards);
    localStorage.setItem('savedCards', JSON.stringify(updatedCards));
    setSelectedCard(card.id);
    setIsAddCardModalOpen(false);
    setNewCard({
      cardNumber: '',
      cardHolder: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      bank: ''
    });
  };

  const handleDeleteCard = (cardId: string) => {
    const updatedCards = savedCards.filter(card => card.id !== cardId);
    setSavedCards(updatedCards);
    localStorage.setItem('savedCards', JSON.stringify(updatedCards));
    if (selectedCard === cardId && updatedCards.length > 0) {
      setSelectedCard(updatedCards[0].id);
    }
  };

  const getCardBrand = (cardNumber: string) => {
    const firstDigit = cardNumber.charAt(0);
    if (firstDigit === '4') return 'visa';
    if (firstDigit === '5') return 'mastercard';
    return 'card';
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setNewCard({ ...newCard, cardNumber: value });
    }
  };

  const handleProceed = () => {
    if (selectedMethod === 'CARD' && !selectedCard) {
      alert('Please select a card');
      return;
    }
    // Process payment here
    console.log('Processing payment:', { method: selectedMethod, card: selectedCard, amount: initiatedPrice });
    // navigate to success page or handle payment
  };

  return (
    <StyledApp>
      <PageHeader>
        <PageTitle>Checkout</PageTitle>
      </PageHeader>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* Cash on Delivery */}
        <MethodCard $selected={selectedMethod === 'CASH'}>
          <MethodButton onClick={() => setSelectedMethod('CASH')}>
            <MethodInfo>
              <IconBox>
                <Banknote size={20} />
              </IconBox>
              <MethodLabel>Cash on Delivery</MethodLabel>
            </MethodInfo>
            <ArrowRight size={18} style={{ color: '#9ca3af' }} />
          </MethodButton>
        </MethodCard>

        {/* Credit/Debit Card */}
        <MethodCard $selected={selectedMethod === 'CARD'}>
          <MethodButton onClick={() => setSelectedMethod('CARD')}>
            <MethodInfo>
              <IconBox>
                <CreditCard size={20} />
              </IconBox>
              <MethodLabel>Credit/Debit Card</MethodLabel>
            </MethodInfo>
            <ChevronLeft 
              size={18} 
              style={{ 
                color: '#9ca3af', 
                transition: 'transform 0.3s',
                transform: selectedMethod === 'CARD' ? 'rotate(-90deg)' : 'rotate(180deg)'
              }} 
            />
          </MethodButton>

          {selectedMethod === 'CARD' && (
            <CardList>
              {savedCards.map(card => (
                <SavedCard 
                  key={card.id}
                  $selected={selectedCard === card.id}
                  onClick={() => setSelectedCard(card.id)}
                >
                  <CardDetails>
                    <CardBrandLogo>
                      <img 
                        src={getCardBrand(card.cardNumber) === 'visa' 
                          ? 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg' 
                          : 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg'
                        } 
                        alt={getCardBrand(card.cardNumber)}
                        style={{ width: '100%', height: 'auto' }} 
                      />
                    </CardBrandLogo>
                    <CardInfo>
                      <CardBank>{card.bank}</CardBank>
                      <CardNumber>**** **** **** {card.cardNumber.slice(-4)}</CardNumber>
                    </CardInfo>
                  </CardDetails>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <DeleteButton onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCard(card.id);
                    }}>
                      <Trash2 size={18} />
                    </DeleteButton>
                    <RadioButton $selected={selectedCard === card.id}>
                      {selectedCard === card.id && <Check size={12} color="white" />}
                    </RadioButton>
                  </div>
                </SavedCard>
              ))}

              <AddCardButton onClick={() => setIsAddCardModalOpen(true)}>
                <Plus size={20} />
                Add New Card
              </AddCardButton>
            </CardList>
          )}
        </MethodCard>

        {/* Crypto Payment */}
        <MethodCard $selected={selectedMethod === 'CRYPTO'}>
          <MethodButton onClick={() => {
            setSelectedMethod('CRYPTO');
            navigate('/send', { state: { priceTosend: initiatedPrice } });
          }}>
            <MethodInfo>
              <IconBox>
                <Coins size={20} />
              </IconBox>
              <MethodLabel>Pay with Crypto</MethodLabel>
            </MethodInfo>
            <ArrowRight size={18} style={{ color: '#9ca3af' }} />
          </MethodButton>
        </MethodCard>

        <ProceedButton onClick={handleProceed} disabled={selectedMethod === 'CARD' && !selectedCard}>
          Proceed to Pay ₦{initiatedPrice.toLocaleString()}
        </ProceedButton>
<br/><br/>
        <BackButton onClick={() => navigate(-1)}>
          <ChevronLeft size={20} /> Back
        </BackButton>
      </div>

      {/* Add Card Modal */}
      <Modal $isOpen={isAddCardModalOpen} onClick={() => setIsAddCardModalOpen(false)}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>Add New Card</ModalTitle>
            <CloseButton onClick={() => setIsAddCardModalOpen(false)}>
              <X size={24} />
            </CloseButton>
          </ModalHeader>

          <FormGroup>
            <Label>Card Number</Label>
            <Input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={formatCardNumber(newCard.cardNumber)}
              onChange={handleCardNumberChange}
              maxLength={19}
            />
          </FormGroup>

          <FormGroup>
            <Label>Cardholder Name</Label>
            <Input
              type="text"
              placeholder="JOHN DOE"
              value={newCard.cardHolder}
              onChange={(e) => setNewCard({ ...newCard, cardHolder: e.target.value.toUpperCase() })}
            />
          </FormGroup>

          <FormGroup>
            <Label>Bank Name</Label>
            <Input
              type="text"
              placeholder="e.g., GTBank, Access Bank"
              value={newCard.bank}
              onChange={(e) => setNewCard({ ...newCard, bank: e.target.value })}
            />
          </FormGroup>

          <InputRow>
            <FormGroup>
              <Label>Expiry Month</Label>
              <Input
                type="text"
                placeholder="MM"
                value={newCard.expiryMonth}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 2 && /^\d*$/.test(value)) {
                    setNewCard({ ...newCard, expiryMonth: value });
                  }
                }}
                maxLength={2}
              />
            </FormGroup>

            <FormGroup>
              <Label>Expiry Year</Label>
              <Input
                type="text"
                placeholder="YY"
                value={newCard.expiryYear}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 2 && /^\d*$/.test(value)) {
                    setNewCard({ ...newCard, expiryYear: value });
                  }
                }}
                maxLength={2}
              />
            </FormGroup>
          </InputRow>

          <FormGroup>
            <Label>CVV</Label>
            <Input
              type="password"
              placeholder="123"
              value={newCard.cvv}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 3 && /^\d*$/.test(value)) {
                  setNewCard({ ...newCard, cvv: value });
                }
              }}
              maxLength={3}
            />
          </FormGroup>

          <SubmitButton onClick={handleAddCard}>
            Add Card
          </SubmitButton>
        </ModalContent>
      </Modal>
    </StyledApp>
  );
};

export default CheckoutContainer;