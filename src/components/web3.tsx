import { useEffect, useState } from "react";
import Api from "./api";
import '../index.css';
import styled from "styled-components";
import 'react-icons/bs';
import 'react-icons/fa';
import { BsEye, BsEyeSlash, BsGear, BsHeadset } from "react-icons/bs";
import * as multichainWallet from 'multichain-crypto-wallet';
import { IResponse } from "multichain-crypto-wallet/dist/common/utils/types";
import NftApi from "./nftApi";
import WalletHistoryApi from "./history";
import FootNavig from "./footnavig";
import VerticalTicker from "./ticker";
import Ctanavig from "./mainCta";
import { ChevronDown, Apple, Wallet, TrendingUp, ChevronUp } from "lucide-react";
import ImageSlider from "./slider";
import PackagesPage from "./package";
import planningApp from "./planner";


const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: rgb(34, 34, 34);
  margin: 0;
  font-family: orbitron;
  min-height: 100vh;
  padding: 20px;
  padding-bottom: 100px;
 
  @media (prefers-color-scheme: dark) {
    background-color: rgb(15, 15, 15);
    color: white;
  }
`;

const AppContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const StickyHeader = styled.div<{ $isScrolled: boolean }>`
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 16px 0;
  margin: -20px -20px 20px -20px;
  padding: 20px;
  background: ${props => props.$isScrolled ? 'rgba(249, 249, 249, 0.95)' : 'transparent'};
  backdrop-filter: ${props => props.$isScrolled ? 'blur(1px)' : 'blur(7px)'};
  transition: all 0.3s ease;
  
  @media (prefers-color-scheme: dark) {
    background: ${props => props.$isScrolled ? 'rgba(15, 15, 15, 0.95)' : 'transparent'};
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeaderIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: white;
  border-radius: 12px;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  @media (prefers-color-scheme: dark) {
    background: rgb(1, 1, 1);
    
    &:hover {
      box-shadow: 0 4px 12px rgba(51, 232, 191, 0.2);
    }
  }
`;

const HeaderTitle = styled.a`
  text-decoration: none;
  color: grey;
  font-weight: 500;
  font-size: 14px;
  
  &:hover {
    color: rgb(36,172,242);
  }
`;

const BalanceCard = styled.div`
  background: linear-gradient(90deg, RGB(0,131,208) );
  border-radius: 20px;
  padding: 32px 24px;
  margin: 24px 0;
  animation: fadeIn 0.5s ease-in;
  @media (prefers-color-scheme: dark) {
    background: black;
}
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const BalanceHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

const BalanceLabel = styled.p`
  margin: 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 500;
`;

const DropdownIcon = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.9);
  transition: transform 0.3s ease;
  transform: rotate(${props => props.$isOpen ? '180deg' : '0deg'});
`;

const BalanceAmount = styled.div`
  display: flex;
  justify-self: center;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 48px;
  font-weight: 700;
  color: white;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  margin-bottom: 16px;
`;

const FiatWalletSection = styled.div<{ $isOpen: boolean }>`
  max-height: ${props => props.$isOpen ? '200px' : '0'};
  overflow: hidden;
  transition: max-height 0.4s ease-in-out;
  margin-top: ${props => props.$isOpen ? '20px' : '0'};
  padding-top: ${props => props.$isOpen ? '20px' : '0'};
  border-top: ${props => props.$isOpen ? '1px solid rgba(255, 255, 255, 0.2)' : 'none'};
`;

const FiatWallet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  animation: fadeInUp 0.3s ease-in-out;
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const FiatIcon = styled.div`
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  backdrop-filter: blur(10px);
  color: white;
`;

const FiatLabel = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
`;

const FiatAmount = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: white;
`;

const EyeButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const Section = styled.div`
  margin-bottom: 32px;
  animation: fadeIn 0.5s ease-in;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: rgb(34, 34, 34);
  display: flex;
  align-items: center;
  gap: 8px;
  
  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;

const CollapsibleHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background-color: white;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 12px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: rgb(1, 1, 1);
    
    &:hover {
      box-shadow: 0 6px 20px rgba(51, 232, 191, 0.15);
    }
  }
`;

const CollapsibleTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  font-weight: 600;
`;

const IconWrapper = styled.div`
  background: linear-gradient(135deg, RGB(0,131,208));
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(51, 232, 191, 0.3);

   @media (prefers-color-scheme: dark) {
    background: transparent;
}
`;

const CollapsibleContent = styled.div<{ $isOpen: boolean }>`
  max-height: ${props => props.$isOpen ? '2000px' : '0'};
  overflow: hidden;
  transition: max-height 0.4s ease-in-out;
`;

const ChevronIcon = styled.div<{ $isOpen: boolean }>`
  transition: transform 0.3s ease;
  transform: rotate(${props => props.$isOpen ? '180deg' : '0deg'});
  display: flex;
  align-items: center;
  color: rgb(36,172,242);
`;

const ToggleContainer = styled.div`
  display: flex;
  background: white;
  border-radius: 12px;
  padding: 4px;
  width: fit-content;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  @media (prefers-color-scheme: dark) {
    background: rgb(1, 1, 1);
  }
`;

const ToggleButton = styled.button<{ $active: boolean }>`
  padding: 10px 24px;
  border: none;
  border-radius: 10px;
  background: ${props => props.$active ? 'linear-gradient(135deg, RGB(0,131,208))' : 'transparent'};
  color: ${props => props.$active ? 'white' : 'gray'};
  font-weight: ${props => props.$active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  
  &:hover {
    opacity: 0.8;
  }
`;

const ContentWrapper = styled.div`
  background: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  @media (prefers-color-scheme: dark) {
    background: rgb(1, 1, 1);
  }
`;

const SkeletonCard = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 12px;
  height: 80px;
  margin-bottom: 12px;
  
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  
  @media (prefers-color-scheme: dark) {
    background: linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%);
    background-size: 200% 100%;
  }
`;

async function getTotalBalance() {
  const ethAddress = localStorage.getItem('ethereumWallet');
  const solAddress = localStorage.getItem('solanaWallet');
  const bitAddress = localStorage.getItem('bitcoinWallet');
  let accountBalanceEth = 0;
  let accountBalanceSol = 0;
  let accountBalanceBit = 0;

  const usdPrice = async (symbol: string) => {
    const response = await fetch('https://twa-backend-g83o.onrender.com/api/cryptocurrency');
    const result = await response.json();
    
    const cryptoData = result.data.find((crypto: { symbol: string }) => crypto.symbol === symbol);
    return cryptoData ? Number(cryptoData.price) : 0;
  }

  if (ethAddress) {
    try {
      const ethBalanceResponse: IResponse = await multichainWallet.getBalance({
        address: ethAddress,
        network: 'ethereum',
        rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/fY6etQ0_E-PnuaKp5g9npALfvpJ4IGRq',
      });
      const ethUsdPrice = Number(await usdPrice('ETH'));
      accountBalanceEth = Number(ethBalanceResponse.balance ?? 0) * ethUsdPrice;
    } catch (error) {
      console.error('Error fetching Ethereum balance:', error);
    }
  }

  if (solAddress) {
    try {
      const solBalanceResponse = await multichainWallet.getBalance({
        address: solAddress,
        network: 'solana',
        rpcUrl: 'https://mainnet.helius-rpc.com/?api-key=5517adc0-a742-464f-8ef1-276dc13f6c78',
      });
      const solUsdPrice = Number(await usdPrice('SOL'));
      accountBalanceSol = Number(solBalanceResponse.balance ?? 0) * solUsdPrice;
    } catch (error) {
      console.error('Error fetching Solana balance:', error);
    }
  }

  if (bitAddress) {
    try {
      const bitBalanceResponse: IResponse = await multichainWallet.getBalance({
        address: bitAddress,
        network: 'bitcoin',
        rpcUrl: 'https://bitcoin-mainnet.g.alchemy.com/v2/fY6etQ0_E-PnuaKp5g9npALfvpJ4IGRq'
      });
      accountBalanceBit = Number(bitBalanceResponse.balance ?? 0) * Number(await usdPrice('BTC'));
    } catch (error) {
      console.error('Error fetching Bitcoin balance:', error);
    }
  }

  return {
    total: (Number(accountBalanceEth) || 0) + (Number(accountBalanceSol) || 0) + (Number(accountBalanceBit) || 0),
    eth: accountBalanceEth,
    sol: accountBalanceSol,
    btc: accountBalanceBit
  };
}

function Homme() {
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [fiatBalance, setFiatBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [tokensLoaded, setTokensLoaded] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isPackagesOpen, setIsPackagesOpen] = useState(false);
  const [isFiatWalletOpen, setIsFiatWalletOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'tokens' | 'nfts'>('tokens');
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleHide = () => {
    setIsHidden(!isHidden);
  };

  const togglePackages = () => {
    setIsPackagesOpen(!isPackagesOpen);
  };

  const toggleFiatWallet = () => {
    setIsFiatWalletOpen(!isFiatWalletOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchTotalBalance = async () => {
      setIsLoading(true);
      const balances = await getTotalBalance();
      setTotalBalance(balances.total);
      // You can set fiatBalance from your backend or localStorage
      setFiatBalance(0); // Replace with actual fiat balance
      setIsLoading(false);
    };

    fetchTotalBalance();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTokensLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <StyledApp>
      <StickyHeader $isScrolled={isScrolled}>
        <Header>
          <HeaderIcon href='#/tools'>
            <BsGear style={{ height: '20px', width: '20px' }} />
          </HeaderIcon>
          
          <HeaderTitle href='#/register'>
            My Account
          </HeaderTitle>
          
          <HeaderIcon href="/">
            <BsHeadset style={{ height: '20px', width: '20px' }} />
          </HeaderIcon>
        </Header>
      </StickyHeader>

      <AppContainer>
        {/* Wallet Balance */}
        <BalanceCard>
          <BalanceHeader onClick={toggleFiatWallet}>
            <BalanceLabel>Wallet Balance ($)</BalanceLabel>
            <DropdownIcon $isOpen={isFiatWalletOpen}>
              <ChevronDown size={16} />
            </DropdownIcon>
          </BalanceHeader>

          <BalanceAmount>
            {isLoading ? (
              <div style={{ fontSize: '32px' }}>***</div>
            ) : (
              <>
                <div>{isHidden ? "••••••" : `$${totalBalance.toFixed(2)}`}</div>
                <EyeButton onClick={toggleHide}>
                  {isHidden ? (
                    <BsEye style={{ height: "20px", width: "20px" }} />
                  ) : (
                    <BsEyeSlash style={{ height: "20px", width: "20px" }} />
                  )}
                </EyeButton>
              </>
            )}
          </BalanceAmount>

          {/* Fiat Wallet Section (Hidden by default) */}
          <FiatWalletSection $isOpen={isFiatWalletOpen}>
            <FiatWallet>
              <FiatIcon>₦</FiatIcon>
              <FiatLabel>Fiat Account (NGN)</FiatLabel>
              <FiatAmount>
                {isLoading ? "***" : isHidden ? "••••" : `₦${fiatBalance.toFixed(2)}`}
              </FiatAmount>
            </FiatWallet>
          </FiatWalletSection>
        </BalanceCard>

        <Section>
          <Ctanavig />
        </Section>
{/* 
        <Section>
          <CollapsibleHeader onClick={togglePackages}>
            <CollapsibleTitle>
              <IconWrapper>
                <Apple size={24} color="white" />
              </IconWrapper>
              <span>Food Packages</span>
            </CollapsibleTitle>
            <ChevronIcon $isOpen={isPackagesOpen}>
              <ChevronDown size={24} />
            </ChevronIcon>
          </CollapsibleHeader>

          <CollapsibleContent $isOpen={isPackagesOpen}>
            <PackagesPage />
          </CollapsibleContent>
        </Section> */}

        <Section>
          <ImageSlider />
        </Section>

        <Section>
          <VerticalTicker />
        </Section>

        <Section>
          <SectionTitle>
            <Wallet size={24} />
            Assets
          </SectionTitle>
          
          <ToggleContainer>
            <ToggleButton 
              $active={activeTab === 'tokens'}
              onClick={() => setActiveTab('tokens')}
            >
              Tokens
            </ToggleButton>
            <ToggleButton 
              $active={activeTab === 'nfts'}
              onClick={() => setActiveTab('nfts')}
            >
              NFTs
            </ToggleButton>
          </ToggleContainer>

          <div style={{ marginTop: '16px' }}>
            {activeTab === 'tokens' ? (
              <ContentWrapper>
                {!tokensLoaded ? (
                  <>
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                  </>
                ) : (
                  <Api />
                )}
              </ContentWrapper>
            ) : (
              <ContentWrapper>
                <NftApi />
              </ContentWrapper>
            )}
          </div>
        </Section>

        <Section>
          <SectionTitle>
            <TrendingUp size={24} />
            Wallet History
          </SectionTitle>
          <ContentWrapper>
            <WalletHistoryApi />
          </ContentWrapper>
        </Section>

        <FootNavig />
      </AppContainer>
    </StyledApp>
  );
}

export default Homme;