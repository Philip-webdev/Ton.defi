import styled from 'styled-components';
import { useState } from 'react';
import { Eye, EyeOff, Loader, CheckCircle, XCircle, ArrowRight, ArrowLeft, Store, MapPin, Package, Bell } from 'lucide-react';
import { registerVendor } from '../services/api';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #0A0A0A;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: 'Sora', sans-serif;
`;

const Card = styled.div`
  background: #141414;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 24px;
  padding: 44px 36px;
  width: 100%;
  max-width: 480px;
  animation: slideUp 0.5s ease-out;

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 480px) {
    padding: 32px 20px;
  }
`;

const LogoText = styled.h1`
  font-size: 24px;
  font-weight: 200;
  color: #F0EDE8;
  margin: 0;
  letter-spacing: -0.5px;
  text-align: center;
  span { color: #00E676; font-weight: 700; }
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 20px 0 28px;
`;

const StepDot = styled.div<{ $active: boolean; $completed: boolean }>`
  width: ${p => p.$active ? 32 : 8}px;
  height: 8px;
  border-radius: 4px;
  background: ${p => p.$completed ? '#00E676' : p.$active ? '#00E676' : 'rgba(255,255,255,0.1)'};
  transition: all 0.3s ease;
`;

const StepTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #F0EDE8;
  margin: 0 0 4px;
  text-align: center;
`;

const StepSub = styled.p`
  font-size: 13px;
  color: #555;
  margin: 0 0 24px;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 18px;
`;

const Label = styled.label`
  display: block;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #9A9A9A;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  font-size: 14px;
  font-family: inherit;
  transition: all 0.2s ease;
  background: rgba(255,255,255,0.04);
  color: #F0EDE8;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #00E676;
    background: rgba(0,230,118,0.04);
  }
  &::placeholder { color: #555; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const Select = styled.select`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  font-size: 14px;
  font-family: inherit;
  transition: all 0.2s ease;
  background: rgba(255,255,255,0.04);
  color: #F0EDE8;
  box-sizing: border-box;
  appearance: none;

  &:focus {
    outline: none;
    border-color: #00E676;
  }
  option { background: #141414; color: #F0EDE8; }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 14px 16px;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  font-size: 14px;
  font-family: inherit;
  transition: all 0.2s ease;
  background: rgba(255,255,255,0.04);
  color: #F0EDE8;
  box-sizing: border-box;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #00E676;
    background: rgba(0,230,118,0.04);
  }
  &::placeholder { color: #555; }
`;

const Menu_itemCard = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  padding: 16px;
  margin-bottom: 12px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const AddButton = styled.button`
  width: 100%;
  padding: 12px;
  border: 2px dashed rgba(0,230,118,0.3);
  border-radius: 14px;
  background: transparent;
  color: #00E676;
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #00E676;
    background: rgba(0,230,118,0.05);
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #FF5252;
  font-size: 12px;
  cursor: pointer;
  padding: 4px 8px;
  font-family: inherit;
  &:hover { text-decoration: underline; }
`;

const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  margin-bottom: 10px;
`;

const ToggleLabel = styled.div`
  font-size: 14px;
  color: #F0EDE8;
  font-weight: 500;
`;

const ToggleSublabel = styled.div`
  font-size: 11px;
  color: #555;
  margin-top: 2px;
`;

const Toggle = styled.button<{ $on: boolean }>`
  width: 48px;
  height: 28px;
  border-radius: 14px;
  border: none;
  background: ${p => p.$on ? '#00E676' : 'rgba(255,255,255,0.1)'};
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: ${p => p.$on ? '23px' : '3px'};
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: white;
    transition: all 0.2s ease;
  }
`;

const NavRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 24px;
`;

const BackButton = styled.button`
  flex: 1;
  padding: 14px;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 14px;
  background: transparent;
  color: #999;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s ease;

  &:hover { border-color: rgba(255,255,255,0.2); color: #F0EDE8; }
`;

const NextButton = styled.button`
  flex: 2;
  padding: 14px;
  border: none;
  border-radius: 14px;
  background: #00E676;
  color: #0A0A0A;
  font-size: 14px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(0,230,118,0.25);
  }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const StatusMessage = styled.div<{ $type: 'success' | 'error' | 'loading' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 13px;
  margin-top: 16px;

  ${p => p.$type === 'success' && `background: rgba(0,230,118,0.1); color: #00E676;`}
  ${p => p.$type === 'error' && `background: rgba(255,82,82,0.1); color: #FF5252;`}
  ${p => p.$type === 'loading' && `background: rgba(255,255,255,0.04); color: #999;`}
`;

const LinkText = styled.p`
  text-align: center;
  color: #555;
  font-size: 13px;
  margin-top: 20px;

  a {
    color: #00E676;
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    &:hover { text-decoration: underline; }
  }
`;

interface MenuItem {
  name: string;
  price: string;
  description: string;
  category: string;
}

const CATEGORIES = ['food', 'drinks', 'snacks', 'pastries', 'other'];

export default function VendorRegister() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'loading' | null; message: string }>({ type: null, message: '' });

  // Step 1: Business Info
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('food');

  // Step 2: Store Setup
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  // Step 3: Menu
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { name: '', price: '', description: '', category: 'main' },
  ]);

  // Step 4: Notifications
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [depositAlerts, setDepositAlerts] = useState(true);
  const [dailySummary, setDailySummary] = useState(false);

  const updateMenuItem = (index: number, field: keyof MenuItem, value: string) => {
    const updated = [...menuItems];
    updated[index][field] = value;
    setMenuItems(updated);
  };

  const addMenuItem = () => {
    setMenuItems([...menuItems, { name: '', price: '', description: '', category: 'main' }]);
  };

  const removeMenuItem = (index: number) => {
    if (menuItems.length > 1) {
      setMenuItems(menuItems.filter((_, i) => i !== index));
    }
  };

  const canProceed = () => {
    if (step === 1) return businessName && email && password.length >= 6;
    if (step === 2) return true;
    if (step === 3) return menuItems.some(item => item.name && item.price);
    return true;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setStatus({ type: 'loading', message: 'Creating your vendor account...' });

    try {
      const validMenuItems = menuItems
        .filter(item => item.name && item.price)
        .map(item => ({
          name: item.name,
          price: parseFloat(item.price),
          description: item.description,
          category: item.category,
        }));

      const data = await registerVendor({
        email,
        password,
        businessName,
        phone,
        category,
        address,
        city,
        state,
      });

      if (data.error) throw new Error(data.error);

      // Store auth data
      localStorage.setItem('email', email);
      localStorage.setItem('businessName', businessName);
      localStorage.setItem('role', 'vendor');
      if (data.token) localStorage.setItem('token', data.token);

      // Add menu items if any
      if (validMenuItems.length > 0) {
        for (const item of validMenuItems) {
          await fetch(`${import.meta.env.VITE_BACKEND_URL || 'https://twa-backend-g83o.onrender.com'}/api/vendors/menu/${encodeURIComponent(email)}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${data.token}`,
            },
            body: JSON.stringify(item),
          });
        }
      }

      // Save notification preferences
      await fetch(`${import.meta.env.VITE_BACKEND_URL || 'https://twa-backend-g83o.onrender.com'}/api/vendors/profile/${encodeURIComponent(email)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify({
          notifications: {
            whatsapp: { enabled: whatsappEnabled, number: whatsappNumber },
            orderAlerts,
            depositAlerts,
            dailySummary,
          },
        }),
      });

      setStatus({ type: 'success', message: 'Account created! Redirecting to your dashboard...' });

      setTimeout(() => {
        window.location.href = '#/vendor';
      }, 1500);

    } catch (error: any) {
      setStatus({ type: 'error', message: error.message || 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const stepIcons = [Store, MapPin, Package, Bell];
  const StepIcon = stepIcons[step - 1];

  return (
    <PageContainer>
      <Card>
        <LogoText>Nekst<span>.</span></LogoText>

        <StepIndicator>
          {[1, 2, 3, 4].map(s => (
            <StepDot key={s} $active={s === step} $completed={s < step} />
          ))}
        </StepIndicator>

        <div style={{ textAlign: 'center', marginBottom: 4 }}>
          <StepIcon size={20} color="#00E676" style={{ marginBottom: 8 }} />
        </div>
        <StepTitle>
          {step === 1 && 'Business Info'}
          {step === 2 && 'Store Setup'}
          {step === 3 && 'Menu Items'}
          {step === 4 && 'Notifications'}
        </StepTitle>
        <StepSub>
          {step === 1 && 'Tell us about your business'}
          {step === 2 && 'Where are you located?'}
          {step === 3 && 'Add at least one item to get started'}
          {step === 4 && 'Choose how you want to be alerted'}
        </StepSub>

        {/* Step 1: Business Info */}
        {step === 1 && (
          <>
            <FormGroup>
              <Label>Business Name *</Label>
              <Input
                placeholder="e.g. Mama Ngozi Kitchen"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Email Address *</Label>
              <Input
                type="email"
                placeholder="you@business.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <Row>
              <FormGroup>
                <Label>Password *</Label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Phone</Label>
                <Input
                  type="tel"
                  placeholder="+234..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormGroup>
            </Row>
            <FormGroup>
              <Label>Category</Label>
              <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </Select>
            </FormGroup>
          </>
        )}

        {/* Step 2: Store Setup */}
        {step === 2 && (
          <>
            <FormGroup>
              <Label>Description</Label>
              <TextArea
                placeholder="What do you sell? What makes you special?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>Address</Label>
              <Input
                placeholder="Street address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormGroup>
            <Row>
              <FormGroup>
                <Label>City</Label>
                <Input
                  placeholder="e.g. Lagos"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>State</Label>
                <Input
                  placeholder="e.g. Lagos"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </FormGroup>
            </Row>
          </>
        )}

        {/* Step 3: Menu Items */}
        {step === 3 && (
          <>
            {menuItems.map((item, i) => (
              <Menu_itemCard key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#999' }}>Item {i + 1}</span>
                  {menuItems.length > 1 && (
                    <RemoveButton onClick={() => removeMenuItem(i)}>Remove</RemoveButton>
                  )}
                </div>
                <Row>
                  <FormGroup>
                    <Input
                      placeholder="Item name *"
                      value={item.name}
                      onChange={(e) => updateMenuItem(i, 'name', e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      placeholder="Price (₦) *"
                      type="number"
                      value={item.price}
                      onChange={(e) => updateMenuItem(i, 'price', e.target.value)}
                    />
                  </FormGroup>
                </Row>
                <Input
                  placeholder="Description (optional)"
                  value={item.description}
                  onChange={(e) => updateMenuItem(i, 'description', e.target.value)}
                  style={{ marginBottom: 10 }}
                />
                <Select
                  value={item.category}
                  onChange={(e) => updateMenuItem(i, 'category', e.target.value)}
                >
                  <option value="main">Main</option>
                  <option value="side">Side</option>
                  <option value="drink">Drink</option>
                  <option value="dessert">Dessert</option>
                  <option value="other">Other</option>
                </Select>
              </Menu_itemCard>
            ))}
            <AddButton onClick={addMenuItem}>+ Add Another Item</AddButton>
          </>
        )}

        {/* Step 4: Notifications */}
        {step === 4 && (
          <>
            <ToggleRow>
              <div>
                <ToggleLabel>WhatsApp Alerts</ToggleLabel>
                <ToggleSublabel>Get notified about orders via WhatsApp</ToggleSublabel>
              </div>
              <Toggle $on={whatsappEnabled} onClick={() => setWhatsappEnabled(!whatsappEnabled)} />
            </ToggleRow>

            {whatsappEnabled && (
              <FormGroup style={{ marginTop: 12 }}>
                <Label>WhatsApp Number</Label>
                <Input
                  type="tel"
                  placeholder="+234 801 234 5678"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                />
              </FormGroup>
            )}

            <ToggleRow>
              <div>
                <ToggleLabel>Order Alerts</ToggleLabel>
                <ToggleSublabel>Notify when a new order comes in</ToggleSublabel>
              </div>
              <Toggle $on={orderAlerts} onClick={() => setOrderAlerts(!orderAlerts)} />
            </ToggleRow>

            <ToggleRow>
              <div>
                <ToggleLabel>Deposit Alerts</ToggleLabel>
                <ToggleSublabel>Notify when payment is received</ToggleSublabel>
              </div>
              <Toggle $on={depositAlerts} onClick={() => setDepositAlerts(!depositAlerts)} />
            </ToggleRow>

            <ToggleRow>
              <div>
                <ToggleLabel>Daily Summary</ToggleLabel>
                <ToggleSublabel>End-of-day sales report at 8pm</ToggleSublabel>
              </div>
              <Toggle $on={dailySummary} onClick={() => setDailySummary(!dailySummary)} />
            </ToggleRow>
          </>
        )}

        <NavRow>
          {step > 1 && (
            <BackButton onClick={() => setStep(step - 1)}>
              <ArrowLeft size={16} /> Back
            </BackButton>
          )}
          {step < 4 ? (
            <NextButton onClick={() => setStep(step + 1)} disabled={!canProceed()}>
              Continue <ArrowRight size={16} />
            </NextButton>
          ) : (
            <NextButton onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                <><Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /> Creating Account...</>
              ) : (
                <>Create Vendor Account <ArrowRight size={16} /></>
              )}
            </NextButton>
          )}
        </NavRow>

        {status.type && (
          <StatusMessage $type={status.type}>
            {status.type === 'success' && <CheckCircle size={16} />}
            {status.type === 'error' && <XCircle size={16} />}
            {status.type === 'loading' && <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />}
            {status.message}
          </StatusMessage>
        )}

        <LinkText>
          Already have an account? <a href="#/vendor-login">Sign in</a>
        </LinkText>

        <LinkText style={{ marginTop: 8 }}>
          <a href="#/user">← Back to buyer login</a>
        </LinkText>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </Card>
    </PageContainer>
  );
}
