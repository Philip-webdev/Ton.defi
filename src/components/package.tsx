import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const Packages = styled.div`
  background-color: white;
  border-radius: 7px;  
  padding: 7px;
  color: black;
  font-weight: bolder;
  
  @media (prefers-color-scheme: dark) {
    background-color: rgb(1, 1, 1);
    color: white;
  }
`;

const TypeOf = styled.div`
  border: none;
  border-radius: 10px;
  padding: 7px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 120px;
  overflow: hidden;
  border-radius: 7px;
  margin-bottom: 8px;
  
  @media (min-width: 768px) {
    height: 150px;
  }
`;

const PackageImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 7px;
`;

const PackageTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
  
  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const PackageDescription = styled.small`
  font-size: 8px;
  display: block;
  margin-bottom: 8px;
  min-height: 24px;
  
  @media (min-width: 768px) {
    font-size: 10px;
  }
`;

const Button = styled.button`
  display: flex;
  color: black;
  justify-content: center;
  border-radius: 7px;
  padding: 7px;
  border: none;
  width: 70%;
  align-self: center;
  margin-top: auto;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    opacity: 0.9;
  }
`;

const PackagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  padding: 10px;
  
  @media (min-width: 768px) {
    gap: 10px;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const PageTitle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  padding: 10px;
  
  h2 {
    margin: 0;
    font-size: 20px;
  }
  
  @media (min-width: 768px) {
    margin-bottom: 20px;
    
    h2 {
      font-size: 24px;
    }
  }
`;

const PackagesPage = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      {/* <PageTitle>
        <h2>Food Packages</h2>
      </PageTitle> */}

      <PackagesGrid> 
        <Packages onClick={() => navigate('/checkout', {state: {type: 'starter', price: 30000}})}>
          <TypeOf style={{background: 'rgb(51, 232, 191)'}}>
            <ImageContainer>
              <PackageImage 
                src="/close-up-fork-with-broccoli-tomato-fusilli (1).jpg"
                alt="Starter Package"
              />
            </ImageContainer>
            <PackageTitle>Starter</PackageTitle>
            <PackageDescription>Top plan for food</PackageDescription>
            <Button>Get</Button>
          </TypeOf>
        </Packages>

        <Packages onClick={() => navigate('/checkout', {state: {type: 'frequent', price: 10000}})}>
          <TypeOf style={{background: 'rgb(139, 48, 241)'}}>
            <ImageContainer>
              <PackageImage 
                src="/mini.jpg"
                alt="Mini Package"
              />
            </ImageContainer>
            <PackageTitle>Mini</PackageTitle>
            <PackageDescription>A Smarter food plan</PackageDescription>
            <Button>Get</Button>
          </TypeOf>
        </Packages>

        <Packages onClick={() => navigate('/checkout', {state: {type: 'regular', price: 0}})}>
          <TypeOf style={{background: 'rgb(250, 117, 52)'}}>
            <ImageContainer>
              <PackageImage 
                src="/pepper.jpg"
                alt="Regular Package"  
              />
            </ImageContainer>
            <PackageTitle>Regular</PackageTitle>
            <PackageDescription>Short plans and instant deliverables</PackageDescription>
            <Button>Get</Button>
          </TypeOf>
        </Packages>
      </PackagesGrid>
    </div>
  );
};

export default PackagesPage;