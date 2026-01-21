import React, { useState } from "react";
import styled from "styled-components";
import { BsBuilding, BsYinYang } from 'react-icons/bs';
import { FaBlog } from "react-icons/fa";
import { HistoryIcon, LayoutPanelLeft, Logs, ScanTextIcon, SendHorizonal, ShoppingCart } from "lucide-react";
import { House } from "lucide-react";
// --- Styled Components Interfaces ---

interface NavItemProps {
  $active?: boolean;
}

// --- Styled Components ---

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  border: 20px;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  backdrop-filter: blur(30px);
  background: whitesmoke;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;
  color: black;
  padding-bottom: env(safe-area-inset-bottom); /* Support for modern mobile screens */

  @media (prefers-color-scheme: dark) {
    color: white;
    background: black;
  }
`;

const FAB = styled.button`
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  background: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  border: none;
  cursor: pointer;
  color: black;
  font-weight: bolder;
  z-index: 1001;
  transition: transform 0.2s ease;

  &:active {
    transform: translateX(-50%) scale(0.92);
  }
    @media (prefers-color-scheme: dark) {
    color: white;

  }
`;

const NavItem = styled.a<NavItemProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: ${props => props.$active ? "rgb(1, 7, 43)" : "inherit"};
  font-family: 'Lexend', sans-serif;
  font-size: 11px;
  transition: all 0.2s ease;
  opacity: ${props => props.$active ? 1 : 0.6};
  
  svg { 
    width: 22px; 
    height: 22px; 
    margin-bottom: 4px;
  };
   @media (prefers-color-scheme: dark) {
    color: ${props => props.$active ? "rgb(0, 127, 229)" : "inherit"};

  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 20px;
`;
const changeWhite = ()=>{
    document.getElementById('customs')?.style.color ===
     'blue';
}
// --- Component Logic ---

const navItems = [
    { href: "#/home", label: "", icon: <House /> },
    { href: "#/market", label: "", icon: <LayoutPanelLeft /> },
    { href: "#/marketplace", label: "", icon: <ShoppingCart /> },
    { href: "#/discover", label: "", icon:<Logs /> },
];

const FootNavig: React.FC = () => {
    const [active, setActive] = useState("#/home");
    const [isAsking, setIsAsking] = useState(false);

    return (
        <>
            {isAsking && (
                <ModalOverlay onClick={() => setIsAsking(false)}>
                    {/* e.stopPropagation() prevents clicking inside the box from closing the modal */}
                    <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 'auto' }}>
                        <div style={{display:'flex', justifyContent:'center', width:'100%'}}> 
                      <div style={{border:'grey', borderRadius:'20px', borderStyle:'solid', padding:'20px', backdropFilter:'blur(10px)'}}>
                        <p style={{textAlign:'center', color:'white'}}>What do you want to do today?</p>
                       <input autoFocus style={{height:'50px', width:'100%', background:'transparent', color:'white', borderRadius:'20px', border:'none'}} placeholder="Write your requests here" />
                       <button id="customs" onClick={()=>{changeWhite()}} style={{position:'absolute', left:'70%', top:'55%', background:'transparent'}}><SendHorizonal/></button>
                      </div>
                    </div>

                        {/* <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-[30px] shadow-2xl">
                            <p className="text-white text-center font-medium mb-4">What do you want to do today?</p>
                            <div className="relative flex items-center">
                                <input 
                                    autoFocus
                                    className="w-full justify-center bg-neutral-800 border-none rounded-2xl p-4 text-white placeholder-none focus:ring-2 focus:ring-blue-600 outline-none"
                                    placeholder="Write your request here..."
                                />
                                <button className="absolute text-black right-4 text-blue-500 hover:text-blue-400">
                                    <SendHorizonal size={20} />
                                </button>
                            </div>
                        </div> */}
                    </div> 
                </ModalOverlay>
            )}

            <NavContainer>
                <FAB onClick={() => setIsAsking(true)}>
                    <ScanTextIcon size={26} />
                </FAB>
                
                {navItems.map((item, index) => (
                    <NavItem 
                        key={item.href} 
                        href={item.href}
                        $active={active === item.href}
                        onClick={() => setActive(item.href)}
                        // Creates the visual gap for the FAB in the center
                        style={{
                            marginRight: index === 1 ? '45px' : '0',
                            marginLeft: index === 2 ? '45px' : '0',
                            
                        }}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </NavItem>
                ))}
            </NavContainer>
        </>
    );
};

export default FootNavig;
