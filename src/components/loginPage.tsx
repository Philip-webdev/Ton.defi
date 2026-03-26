import styled from 'styled-components';
import { useState } from 'react';
import { Eye, EyeOff, Loader, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

// ── Styled Components ─────────────────────────────────────────────
const PageContainer = styled.div`
  min-height: 100vh;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: 'Orbitron', -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('https://i.imgur.com/GWzPhNR.jpeg') center / cover no-repeat;
    opacity: 0.1;
    z-index: 0;
  }
`;

const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 48px 40px;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1;
  animation: slideUp 0.5s ease-out;

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(15, 15, 15, 0.95);
    color: white;
  }

  @media (max-width: 480px) {
    padding: 36px 24px;
  }
`;

const LogoText = styled.h1`
  font-size: 32px;
  font-weight: 800;
  background: rgb(36, 172, 242);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  letter-spacing: -1px;
`;

const Subtitle = styled.p`
  color: #6b7280;
  font-size: 14px;
  margin: 8px 0 0 0;
  text-align: center;
  @media (prefers-color-scheme: dark) { color: #9ca3af; }
`;

const TabContainer = styled.div`
  display: flex;
  background: #f3f4f6;
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 32px;
  @media (prefers-color-scheme: dark) { background: rgba(255, 255, 255, 0.05); }
`;

const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${p => p.$active ? 'white' : 'transparent'};
  color: ${p => p.$active ? 'rgb(36,172,242)' : '#6b7280'};
  box-shadow: ${p => p.$active ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'};
  &:hover { color: rgb(36,172,242); }
  @media (prefers-color-scheme: dark) {
    background: ${p => p.$active ? 'rgba(36,172,242,0.15)' : 'transparent'};
    color: ${p => p.$active ? 'rgb(36,172,242)' : '#9ca3af'};
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #374151;
  letter-spacing: 0.3px;
  @media (prefers-color-scheme: dark) { color: #d1d5db; }
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 44px 0 16px;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  font-size: 14px;
  font-family: inherit;
  transition: all 0.2s ease;
  background: white;
  color: #1f2937;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: rgb(36,172,242);
    box-shadow: 0 0 0 3px rgba(36,172,242,0.12);
  }
  &::placeholder { color: #9ca3af; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }

  @media (prefers-color-scheme: dark) {
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,255,255,0.1);
    color: white;
    &:focus {
      border-color: rgb(36,172,242);
      background: rgba(255,255,255,0.08);
    }
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  &:hover { color: rgb(36,172,242); }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: rgb(36,172,242);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 15px;
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
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(36,172,242,0.35);
  }
  &:active:not(:disabled) { transform: translateY(0); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
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
    background: #dcfce7; color: #166534;
    @media (prefers-color-scheme: dark) { background: rgba(34,197,94,0.15); color: #86efac; }
  `}
  ${p => p.$type === 'error' && `
    background: #fee2e2; color: #991b1b;
    @media (prefers-color-scheme: dark) { background: rgba(239,68,68,0.15); color: #fca5a5; }
  `}
  ${p => p.$type === 'loading' && `
    background: #dbeafe; color: #1e40af;
    @media (prefers-color-scheme: dark) { background: rgba(59,130,246,0.15); color: #93c5fd; }
  `}
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
  @media (prefers-color-scheme: dark) { border-top-color: rgba(255,255,255,0.08); }
`;

const FooterText = styled.p`
  color: #6b7280; font-size: 12px; margin: 0;
  @media (prefers-color-scheme: dark) { color: #9ca3af; }
`;

// ── Types ─────────────────────────────────────────────────────────
type StatusType = {
  type: 'success' | 'error' | 'loading' | null;
  message: string;
};

// ── Component ─────────────────────────────────────────────────────
// IMPORTANT: Always render as <UserLogin /> — never call UserLogin() directly.
// Calling it as a function breaks React's hook tracking and causes
// "invalid hook call" errors.
function UserLogin() {
  // ── All hooks at the top level — never inside conditions/callbacks ──
  const [mode,         setMode]        = useState<'login' | 'register'>('login');
  const [email,        setEmail]       = useState('');
  const [fullName,     setName]        = useState('');
  const [password,     setPassword]    = useState('');
  const [showPassword, setShowPassword]= useState(false);
  const [status,       setStatus]      = useState<StatusType>({ type: null, message: '' });
  const [isLoading,    setIsLoading]   = useState(false);

  // ── Register ────────────────────────────────────────────────────
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // ← must be first

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
      // 1. Register user
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
      });
      if (!response.ok) throw new Error('Registration failed. Please try again.');

      // 2. Generate virtual wallet / bank account
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
        // Non-fatal — account was still created; wallet can be retried later
      }

      // 3. Persist to localStorage only after successful registration
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

  // ── Login ───────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // ← must be first

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

      // Persist only after confirmed login
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

  // ── Single submit dispatcher ────────────────────────────────────
  const handleSubmit = (e: React.FormEvent) => {
    mode === 'login' ? handleLogin(e) : handleRegister(e);
  };

  // ── Render ──────────────────────────────────────────────────────
  return (
    <PageContainer>
      <LoginCard>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <img
            src="https://i.imgur.com/ySoWviB.png"
            style={{ height: 120, width: 120, borderRadius: 16 }}
            alt="Nekstpei logo"
          />
          <Subtitle>
            {mode === 'login' ? 'Welcome back — sign in to continue' : 'Create your account to get started'}
          </Subtitle>
        </div>

        {/* Login / Register tabs */}
        <TabContainer>
          <Tab $active={mode === 'login'}    onClick={() => { setMode('login');    setStatus({ type: null, message: '' }); }}>Login</Tab>
          <Tab $active={mode === 'register'} onClick={() => { setMode('register'); setStatus({ type: null, message: '' }); }}>Register</Tab>
        </TabContainer>

        <form onSubmit={handleSubmit} noValidate>

          {/* Email */}
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
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

          {/* Full name — register only */}
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

          {/* Password */}
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

          {/* Submit */}
          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading
              ? <><Loader size={18} className="spin" /> Processing...</>
              : <>{mode === 'login' ? 'Sign In' : 'Create Account'}<ArrowRight size={18} /></>
            }
          </SubmitButton>

          {/* Status message */}
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
          <FooterText>nekstpei © 2026 · Secure & Reliable</FooterText>
        </Footer>
      </LoginCard>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;800&display=swap');
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </PageContainer>
  );
}

export default UserLogin;