import styled from 'styled-components';
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const PageContainer = styled.div`
  min-height: 100vh;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: Lexend, -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://i.imgur.com/GWzPhNR.jpeg');
    background-size: cover;
    background-position: center;
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
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(15, 15, 15, 0.95);
    color: white;
  }

  @media (max-width: 480px) {
    padding: 36px 24px;
  }
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const LogoText = styled.h1`
  font-size: 32px;
  font-weight: 800;
  background: rgb(36,172,242);
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
  
  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
`;

const TabContainer = styled.div`
  display: flex;
  background: #f3f4f6;
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 32px;

  @media (prefers-color-scheme: dark) {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.$active ? 'white' : 'transparent'};
  color: ${props => props.$active ? '#667eea' : '#6b7280'};
  box-shadow: ${props => props.$active ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none'};

  &:hover {
    color: #667eea;
  }

  @media (prefers-color-scheme: dark) {
    background: ${props => props.$active ? 'rgba(102, 126, 234, 0.2)' : 'transparent'};
    color: ${props => props.$active ? '#a5b4fc' : '#9ca3af'};
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #374151;

  @media (prefers-color-scheme: dark) {
    color: #d1d5db;
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 90%;
  height:40px;
  padding: 14px;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-family: inherit;
  transition: all 0.3s ease;
  background: white;
  color: #1f2937;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
    color: white;

    &:focus {
      border-color: #667eea;
      background: rgba(255, 255, 255, 0.08);
    }
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;

  &:hover {
    color: #667eea;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: rgb(36,172,242);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(102, 126, 234, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const StatusMessage = styled.div<{ $type: 'success' | 'error' | 'loading' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  margin-top: 16px;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  ${props => {
    switch (props.$type) {
      case 'success':
        return `
          background: #dcfce7;
          color: #166534;
          @media (prefers-color-scheme: dark) {
            background: rgba(34, 197, 94, 0.2);
            color: #86efac;
          }
        `;
      case 'error':
        return `
          background: #fee2e2;
          color: #991b1b;
          @media (prefers-color-scheme: dark) {
            background: rgba(239, 68, 68, 0.2);
            color: #fca5a5;
          }
        `;
      case 'loading':
        return `
          background: #dbeafe;
          color: #1e40af;
          @media (prefers-color-scheme: dark) {
            background: rgba(59, 130, 246, 0.2);
            color: #93c5fd;
          }
        `;
    }
  }}
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;

  @media (prefers-color-scheme: dark) {
    border-top-color: rgba(255, 255, 255, 0.1);
  }
`;

const FooterText = styled.p`
  color: #6b7280;
  font-size: 13px;
  margin: 0;

  @media (prefers-color-scheme: dark) {
    color: #9ca3af;
  }
`;

type StatusType = {
  type: 'success' | 'error' | 'loading' | null;
  message: string;
};

function UserLogin() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<StatusType>({ type: null, message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setStatus({ type: 'error', message: 'Please fill in all fields' });
      return;
    }

    if (password.length < 6) {
      setStatus({ type: 'error', message: 'Password must be at least 6 characters' });
      return;
    }

    setIsLoading(true);
    setStatus({ type: 'loading', message: 'Creating your account...' });

    try {
      const response = await fetch("https://twa-backend-g83o.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      setStatus({ type: 'success', message: 'Registration successful! You can now login.' });
      setTimeout(() => {
        setMode('login');
        setStatus({ type: null, message: '' });
      }, 2000);

      setEmail('');
      setPassword('');
    } catch (error: any) {
      setStatus({ type: 'error', message: error.message || 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setStatus({ type: 'error', message: 'Please fill in all fields' });
      return;
    }

    setIsLoading(true);
    setStatus({ type: 'loading', message: 'Signing you in...' });

    try {
      const response = await fetch("https://twa-backend-g83o.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 500) {
          throw new Error('Invalid credentials. Please register first.');
        }
        throw new Error('Login failed. Please try again.');
      }

      setStatus({ type: 'success', message: 'Login successful! Redirecting...' });
      
      setTimeout(() => {
        window.location.href = '#/home';
        if (window.Telegram?.WebApp) {
          window.Telegram.WebApp.openTelegramLink('https://app.nekstpei.com/#/home');
        }
      }, 1500);
    } catch (error: any) {
      setStatus({ type: 'error', message: error.message || 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (mode === 'login') {
      handleLogin(e);
    } else {
      handleRegister(e);
    }
  };

  return (
    <PageContainer>
      <LoginCard>
        <Logo>
          <LogoText>nekstpei</LogoText>
          <Subtitle>Food & Price tracking</Subtitle>
        </Logo>

        <TabContainer>
          <Tab $active={mode === 'login'} onClick={() => setMode('login')}>
            Login
          </Tab>
          <Tab $active={mode === 'register'} onClick={() => setMode('register')}>
            Register
          </Tab>
        </TabContainer>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <InputWrapper>
             
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                autoComplete="email"
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <InputWrapper>
           
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={mode === 'register' ? 'Min. 6 characters' : 'Enter your password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </PasswordToggle>
            </InputWrapper>
          </FormGroup>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader size={20} className="spin" />
                Processing...
              </>
            ) : (
              <>
                {mode === 'login' ? 'Sign In' : 'Create Account'}
                <ArrowRight size={20} />
              </>
            )}
          </SubmitButton>

          {status.type && (
            <StatusMessage $type={status.type}>
              {status.type === 'success' && <CheckCircle size={18} />}
              {status.type === 'error' && <XCircle size={18} />}
              {status.type === 'loading' && <Loader size={18} className="spin" />}
              {status.message}
            </StatusMessage>
          )}
        </form>

        <Footer>
          <FooterText>nekstpei © 2026 · Secure & Reliable</FooterText>
        </Footer>
      </LoginCard>

      <style>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </PageContainer>
  );
}

export default UserLogin;