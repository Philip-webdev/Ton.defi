import styled from "styled-components";
import { Construction, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  font-family: Lexend;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  text-align: center;
  background: white;

  @media (prefers-color-scheme: dark) {
    background: rgb(1, 1, 1);
    color: white;
  }
`;

const IconWrapper = styled.div`
  margin-bottom: 24px;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 12px;
  color: rgb(36,172,242);

  @media (prefers-color-scheme: dark) {
    color: rgb(36,172,242);
  }
`;

const Message = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 32px;
  max-width: 400px;

  @media (prefers-color-scheme: dark) {
    color: #999;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: rgb(36,172,242);
  color: black;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const ComingSoonBadge = styled.span`
  display: inline-block;
  padding: 6px 12px;
  background: rgba(51, 232, 191, 0.1);
  border: 1px solid rgb(36,172,242);
  border-radius: 20px;
  font-size: 12px;
  color: rgb(36,172,242);
  margin-bottom: 16px;
  font-weight: 600;
`;

const UnderConstruction = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <ComingSoonBadge>COMING SOON</ComingSoonBadge>
      
      <IconWrapper>
        <Construction size={80} color="rgb(36,172,242)" />
      </IconWrapper>

      <Title>We're Building Something Great!</Title>
      
      <Message>
        This feature is currently under construction. We're working hard to bring you an amazing experience. Check back soon!
      </Message>

      <BackButton onClick={() => navigate(-1)}>
        <ArrowLeft size={20} />
        Go Back
      </BackButton>
    </Container>
  );
};

export default UnderConstruction;