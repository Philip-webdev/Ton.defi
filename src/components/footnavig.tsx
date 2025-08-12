import { useState } from "react";
import { BsHouse, BsWallet2, BsApp, BsLightningCharge, BsShop } from 'react-icons/bs';
import styled from "styled-components";
import '../index.css';
import { Antenna, AntennaIcon, AppleIcon, AppWindow, LucideHome, SatelliteDish, ShoppingBag } from "lucide-react";

const Icon = styled.div`
position: fixed;
bottom: 0;
left: 0;
width: 100%;
padding: 10px;
z-index: 1000;
justify-content: space-around;
height: 60px;
display: flex;
border-radius:7px;  
backdrop-filter: blur(35px);
@media (prefers-color-scheme: dark) {
    backdrop-filter: blur(35px);
    color: white;
}

a {
    color: inherit;
}
`;

const navItems = [
    { href: "#/home", label: "Home", icon: <LucideHome style={{ height:'22px', width:'22px' }} /> },
    { href: "#/market", label: "Apps", icon: <AppWindow style={{ height:'22px' ,width:'22px' }} /> },
    { href: "#/marketplace", label: "Store", icon: <ShoppingBag style={{ height:'22px', width:'22px' }} /> },
    { href: "#/discover", label: "Discover", icon: <SatelliteDish style={{ height:'22px', width:'22px' }} /> },
];

const FootNavig = () => {
    const [active, setActive] = useState("#/home");

    return (
        <Icon>
            {navItems.map((item) => (
                <a
                    href={item.href}
                    key={item.href}
                    className={`active_buttons${active === item.href ? "active" : " "}`}
                    onClick={() => setActive(item.href)}
                >
                    <button
                        style={{
                            fontFamily: 'Lexend',
                            bottom: '0%',
                            background: 'none',
                            color: 'inherit',
                            border: 'none'
                        }}
                    >
                        {item.icon}
                        <p>{item.label}</p>
                    </button>
                </a>
            ))}
        </Icon>
    );
};

export default FootNavig;