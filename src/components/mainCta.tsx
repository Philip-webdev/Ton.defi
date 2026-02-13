import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { LucideDroplet, SendIcon } from "lucide-react";
import { BsCurrencyExchange } from "react-icons/bs";

const CTAContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const CTAWrapper = styled.a`
  text-decoration: none;
  flex: 1;
  display: flex;
  justify-content: center;
`;

const CTAButton = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 100px;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: rgb(1, 1, 1);
    
    &:hover {
      box-shadow: 0 8px 16px rgba(36, 172, 242, 0.2);
    }
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: rgb(36, 172, 242);
`;

const CTALabel = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: gray;
  text-align: center;
  
  @media (prefers-color-scheme: dark) {
    color: lightgray;
  }
`;

const Ctanavig = () => {
  return (
    <CTAContainer>
      <CTAWrapper href='#/send'>
        <CTAButton>
          <IconWrapper>
            <SendIcon size={28} />
          </IconWrapper>
          <CTALabel>Send</CTALabel>
        </CTAButton>
      </CTAWrapper>

      <CTAWrapper href='#/register'>
        <CTAButton>
          <IconWrapper>
            <LucideDroplet size={28} />
          </IconWrapper>
          <CTALabel>Get</CTALabel>
        </CTAButton>
      </CTAWrapper>

      <CTAWrapper href='#/buy'>
        <CTAButton>
          <IconWrapper>
            <BsCurrencyExchange size={28} />
          </IconWrapper>
          <CTALabel>Change</CTALabel>
        </CTAButton>
      </CTAWrapper>
    </CTAContainer>
  );
};

export default Ctanavig;