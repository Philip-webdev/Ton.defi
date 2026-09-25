import styled from 'styled-components';
import { useState } from 'react';
import { Eye, EyeOff, Loader, CheckCircle, XCircle, ArrowRight, Store } from 'lucide-react';
import { loginVendor } from '../services/api';

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
  span { color: #00E676; font-weight: 700; }
`;

const Subtitle = styled.p`
  color: #555;
  font-size: 13px;
  font-weight: 400;
  margin: 8px 0 0 0;
  text-align: center;
  letter-spacing: 0.2px;
`;

const VendorBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(0,230,118,0.1);
  border: 1px solid rgba(0,230,118,0.2);
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 11px;
  font-weight: 600;
  color: #00E676;
  margin-bottom: 24px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
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
    border-color: #00E676;
    background: rgba(0,230,118,0.04);
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
  &:hover { color: #00E676; }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #00E676;
  color: #0A0A0A;
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
    box-shadow: 0 8px 24px rgba(0,230,118,0.25);
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
    background: rgba(255,255,255,0.04); color: #999;
  `}
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 24px 0;
  color: #444;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;

  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.06);
  }
`;

const LinkText = styled.p`
  text-align: center;
  color: #555;
  font-size: 13px;
  margin-top: 24px;

  a {
    color: #00E676;
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    &:hover { text-decoration: underline; }
  }
`;

export default function VendorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'loading' | null; message: string }>({ type: null, message: '' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setStatus({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }

    setIsLoading(true);
    setStatus({ type: 'loading', message: 'Signing you in...' });

    try {
      const data = await loginVendor(email, password);

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem('email', email);
      localStorage.setItem('businessName', data.user?.businessName || '');
      localStorage.setItem('role', 'vendor');
      if (data.token) localStorage.setItem('token', data.token);

      setStatus({ type: 'success', message: 'Login successful! Redirecting...' });

      setTimeout(() => {
        window.location.href = '#/vendor';
      }, 1200);

    } catch (error: any) {
      setStatus({ type: 'error', message: error.message || 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <LoginCard>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <LogoText>Nekst<span>.</span></LogoText>
          <Subtitle>Vendor Portal</Subtitle>
        </div>

        <div style={{ textAlign: 'center' }}>
          <VendorBadge>
            <Store size={12} /> Vendor Login
          </VendorBadge>
        </div>

        <form onSubmit={handleLogin}>
          <FormGroup>
            <Label>Email Address</Label>
            <InputWrapper>
              <Input
                type="email"
                placeholder="you@business.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                autoComplete="email"
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <InputWrapper>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                autoComplete="current-password"
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </PasswordToggle>
            </InputWrapper>
          </FormGroup>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? (
              <><Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /> Signing in...</>
            ) : (
              <>Sign In <ArrowRight size={16} /></>
            )}
          </SubmitButton>

          {status.type && (
            <StatusMessage $type={status.type}>
              {status.type === 'success' && <CheckCircle size={16} />}
              {status.type === 'error' && <XCircle size={16} />}
              {status.type === 'loading' && <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />}
              {status.message}
            </StatusMessage>
          )}
        </form>

        <Divider>or</Divider>

        <LinkText>
          Don't have a vendor account? <a href="#/vendor-register">Register here</a>
        </LinkText>

        <LinkText style={{ marginTop: 12 }}>
          <a href="#/user">← Back to buyer login</a>
        </LinkText>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </LoginCard>
    </PageContainer>
  );
}
