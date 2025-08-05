import { useState } from "react";
import { BsHouse, BsWallet2, BsApp, BsLightningCharge, BsShop } from 'react-icons/bs';
import styled from "styled-components";
import '../index.css';

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
    { href: "#/home", label: "Home", icon: <BsHouse style={{ height:'25px', width:'25px' }} /> },
    { href: "#/market", label: "Apps", icon: <BsApp style={{ height:'25px' ,width:'25px' }} /> },
    { href: "#/marketplace", label: "Store", icon: <BsShop style={{ height:'25px', width:'25px' }} /> },
    { href: "#/discover", label: "Discover", icon: <BsLightningCharge style={{ height:'25px', width:'25px' }} /> },
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