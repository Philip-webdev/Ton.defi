import styled from 'styled-components';
import { useState } from 'react';
import { Eye, EyeOff, Loader, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #0A0A0A;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: 'Sora', sans-serif;
`;

const LoginCard = styled.div`
  background: #141414;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 24px;
  padding: 44px 36px;
  width: 100%;
  max-width: 440px;
  position: relative;
  z-index: 1;
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
  font-size: 28px;
  font-weight: 200;
  color: #F0EDE8;
  margin: 0;
  letter-spacing: -0.5px;
  span { color: #24ACF2; font-weight: 700; }
`;

const Subtitle = styled.p`
  color: #555;
  font-size: 13px;
  font-weight: 400;
  margin: 8px 0 0 0;
  text-align: center;
  letter-spacing: 0.2px;
`;

const TabContainer = styled.div`
  display: flex;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  padding: 4px;
  margin-bottom: 28px;
`;

const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 11px;
  font-weight: 600;
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${p => p.$active ? '#24ACF2' : 'transparent'};
  color: ${p => p.$active ? '#0A0A0A' : '#555'};
  letter-spacing: 0.3px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
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

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 44px 0 16px;
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
    border-color: #24ACF2;
    background: rgba(36,172,242,0.04);
  }
  &::placeholder { color: #555; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #555;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  &:hover { color: #24ACF2; }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #24ACF2;
  color: white;
  border: none;
  border-radius: 14px;
  font-weight: 700;
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
  letter-spacing: 0.3px;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(36,172,242,0.25);
  }
  &:active:not(:disabled) { transform: translateY(0); }
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
  animation: slideIn 0.3s ease-out;
  line-height: 1.4;

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  ${p => p.$type === 'success' && `
    background: rgba(0,230,118,0.1); color: #00E676;
  `}
  ${p => p.$type === 'error' && `
    background: rgba(255,82,82,0.1); color: #FF5252;
  `}
  ${p => p.$type === 'loading' && `
    background: rgba(36,172,242,0.08); color: #24ACF2;
  `}
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.06);
`;

const FooterText = styled.p`
  color: #555;
  font-size: 11px;
  margin: 0;
  letter-spacing: 0.3px;
`;

type StatusType = {
  type: 'success' | 'error' | 'loading' | null;
  message: string;
};

function UserLogin() {
  const [mode,         setMode]        = useState<'login' | 'register'>('login');
  const [email,        setEmail]       = useState('');
  const [fullName,     setName]        = useState('');
  const [password,     setPassword]    = useState('');
  const [showPassword, setShowPassword]= useState(false);
  const [status,       setStatus]      = useState<StatusType>({ type: null, message: '' });
  const [isLoading,    setIsLoading]   = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setStatus({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }
    if (password.length < 6) {
      setStatus({ type: 'error', message: 'Password must be at least 6 characters.' });
      return;
    }

    setIsLoading(true);
    setStatus({ type: 'loading', message: 'Creating your account...' });

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
      });
      if (!response.ok) throw new Error('Registration failed. Please try again.');

      const fetchAcc = await fetch(`${import.meta.env.VITE_NEW_WALLET}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          account_name:      fullName,
          account_reference: fullName,
          customer:          { email },
        }),
      });
      if (!fetchAcc.ok) {
        const errData = await fetchAcc.json().catch(() => ({}));
        console.warn('Wallet generation failed:', errData);
      }

      localStorage.setItem('fullName', fullName);
      localStorage.setItem('email',    email);

      setStatus({ type: 'success', message: 'Account created! You can now log in.' });
      setMode('login');

    } catch (error: any) {
      setStatus({ type: 'error', message: error.message || 'Registration failed.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setStatus({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }

    setIsLoading(true);
    setStatus({ type: 'loading', message: 'Signing you in...' });

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error('Invalid email or password.');
        }
        if (response.status === 404) {
          throw new Error('Account not found. Please register first.');
        }
        throw new Error('Login failed. Please try again.');
      }

      localStorage.setItem('fullName', fullName);
      localStorage.setItem('email',    email);

      setStatus({ type: 'success', message: 'Login successful! Redirecting...' });

      setTimeout(() => {
        window.location.href = '#/home';
        if (window.Telegram?.WebApp) {
          window.Telegram.WebApp.openTelegramLink(
            `${import.meta.env.VITE_FRONTEND_URL}/#/home`
          );
        }
      }, 1200);

    } catch (error: any) {
      setStatus({ type: 'error', message: error.message || 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    mode === 'login' ? handleLogin(e) : handleRegister(e);
  };

  return (
    <PageContainer>
      <LoginCard>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <LogoText>Nekst<span>.</span></LogoText>
          <Subtitle>
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </Subtitle>
        </div>

        <TabContainer>
          <Tab $active={mode === 'login'}    onClick={() => { setMode('login');    setStatus({ type: null, message: '' }); }}>Sign In</Tab>
          <Tab $active={mode === 'register'} onClick={() => { setMode('register'); setStatus({ type: null, message: '' }); }}>Register</Tab>
        </TabContainer>

        <form onSubmit={handleSubmit} noValidate>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <InputWrapper>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={isLoading}
                autoComplete="email"
                required
              />
            </InputWrapper>
          </FormGroup>

          {mode === 'register' && (
            <FormGroup>
              <Label htmlFor="name">Full Name</Label>
              <InputWrapper>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Akpan"
                  value={fullName}
                  onChange={e => setName(e.target.value)}
                  disabled={isLoading}
                  autoComplete="name"
                  required
                />
              </InputWrapper>
            </FormGroup>
          )}

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <InputWrapper>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={mode === 'register' ? 'Min. 6 characters' : 'Enter your password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={isLoading}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                required
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(v => !v)}
                disabled={isLoading}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </PasswordToggle>
            </InputWrapper>
          </FormGroup>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading
              ? <><Loader size={16} className="spin" /> Processing...</>
              : <>{mode === 'login' ? 'Sign In' : 'Create Account'}<ArrowRight size={16} /></>
            }
          </SubmitButton>

          {status.type && (
            <StatusMessage $type={status.type}>
              {status.type === 'success' && <CheckCircle size={16} />}
              {status.type === 'error'   && <XCircle     size={16} />}
              {status.type === 'loading' && <Loader      size={16} className="spin" />}
              {status.message}
            </StatusMessage>
          )}
        </form>

        <Footer>
          <FooterText>Nekstpei © 2026 · Secure & Reliable</FooterText>
        </Footer>
      </LoginCard>

      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </PageContainer>
  );
}

export default UserLogin;
