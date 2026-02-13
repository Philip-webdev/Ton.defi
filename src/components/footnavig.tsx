import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutPanelLeft,
  ScanTextIcon,
  ShoppingCart,
  House,
  Bike
} from "lucide-react";
import { GoogleGenAI } from "@google/genai";

interface NavItemProps {
  $active?: boolean;
}

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

async function planner(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-1.5-pro",
    contents: [{ role: "user", parts: [{ text: prompt }] }]
  });
  return response.text;
}

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  backdrop-filter: blur(30px);
  background: whitesmoke;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;

  @media (prefers-color-scheme: dark) {
    background: black;
    color: white;
  }
`;

const FAB = styled.button`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 56px;
  height: 56px;
  Color:black;
  border-radius: 50%;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001;
   @media (prefers-color-scheme: dark) {
    color:  white;
  }
`;

const NavItem = styled.button<NavItemProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 11px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${p => p.$active ? 'rgb(36,172,242)' : 'inherit'};
  opacity: ${p => (p.$active ? 1 : 0.6)};
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 1;
  }

  @media (prefers-color-scheme: dark) {
    color: ${p => p.$active ? 'rgb(36,172,242);' : 'white'};
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

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  marginBottom: "8px",
  borderRadius: "14px",
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.3)",
  color: "white",
  outline: "none"
};

const navItems = [
  { path: "/home", icon: House },
  { path: "/market", icon: LayoutPanelLeft },
  { path: "/marketplace", icon: ShoppingCart },
  { path: "/discover", icon: Bike }
];

const FootNavig: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAsking, setIsAsking] = useState(false);
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [cooking, setCooking] = useState("");
  const [storage, setStorage] = useState("");
  const [diet, setDiet] = useState("");

  const buildFoodManagementPrompt = () => `
Act as a financial planner and food-budget analyst for Nigerian students with deep knowledge of current Nigerian food prices.

Context:
I am a student managing my feeding expenses and I need a disciplined, realistic food management plan.

Inputs:
- Budget: ₦${budget}
- Duration: ${duration}
- Cooking method: ${cooking}
- Storage: ${storage}
- Dietary constraints: ${diet || "None"}

Tasks:
1. Use realistic Nigerian market prices.
2. Allocate budget across staples, proteins, vegetables, and condiments.
3. Provide an itemized shopping list with estimated prices.
4. Suggest bulk vs periodic buying decisions.
5. Include a simple meal rotation plan.
6. Highlight cost-saving strategies and risks.

Output clearly using headings and tables where useful.
`;

  const handleSubmit = async () => {
    const prompt = buildFoodManagementPrompt();
    console.log("LLM PROMPT:", prompt);

    try {
      await planner(prompt);
    } catch (error) {
      console.error("Gemini error:", error);
    }

    setIsAsking(false);
  };

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <>
      {isAsking && (
        <ModalOverlay onClick={() => setIsAsking(false)}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "420px",
              padding: "20px",
              borderRadius: "20px",
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.2)"
            }}
          >
            <p style={{ color: "white", textAlign: "center", marginBottom: "12px" }}>
              Food Budget Planner
            </p>

            <input
              placeholder="Total budget (₦)"
              value={budget}
              onChange={e => setBudget(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Duration (e.g. 1 month)"
              value={duration}
              onChange={e => setDuration(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Cooking method (gas, electric, none)"
              value={cooking}
              onChange={e => setCooking(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Storage (fridge, freezer, none)"
              value={storage}
              onChange={e => setStorage(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Dietary needs (optional)"
              value={diet}
              onChange={e => setDiet(e.target.value)}
              style={inputStyle}
            />

            <button
              onClick={handleSubmit}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "16px",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Generate Plan
            </button>
          </div>
        </ModalOverlay>
      )}

      <NavContainer>
        <FAB onClick={() => setIsAsking(true)}>
          <ScanTextIcon size={26} />
        </FAB>

        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <NavItem
              key={item.path}
              $active={isActive}
              onClick={() => handleNavClick(item.path)}
              style={{
                marginRight: index === 1 ? "45px" : "0",
                marginLeft: index === 2 ? "45px" : "0"
              }}
            >
              <Icon size={24} />
            </NavItem>
          );
        })}
      </NavContainer>
    </>
  );
};

export default FootNavig;