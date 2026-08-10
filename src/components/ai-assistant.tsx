import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft, Send, Brain, MapPin,
  Wallet, Utensils, Zap, Leaf
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { GoogleGenAI } from "@google/genai";

// ─── Types ────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// ─── Gemini Setup ─────────────────────────────────────────────────
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

const SYSTEM_PROMPT = `You are Nekstpei AI Food Assistant, an expert food-budget planner for Nigerian students and young professionals. You have deep knowledge of:

- Current Nigerian food prices (market prices, campus food prices)
- Affordable meal planning and budget optimization
- Nutritious meals on a tight budget
- Nigerian cuisine (jollof rice, suya, amala, egusi soup, etc.)
- Food vendors and where to find affordable meals
- Bulk buying strategies and seasonal food availability

Rules:
- Always respond in Nigerian English (casual, friendly tone)
- Give specific prices in Naira (₦)
- Be practical and realistic with budget suggestions
- Suggest actual Nigerian dishes and meals
- Keep responses concise but helpful (2-4 paragraphs max)
- If asked about something non-food related, politely redirect to food topics`;

const QUICK_PROMPTS = [
  { label: "I have ₦10,000 for 5 days", icon: <Wallet size={14} /> },
  { label: "What can I eat for ₦2,000?", icon: <Utensils size={14} /> },
  { label: "Healthy lunch options", icon: <Leaf size={14} /> },
  { label: "Quick breakfast ideas", icon: <Zap size={14} /> },
];

// ─── Main Component ───────────────────────────────────────────────
export default function AIFoodAssistant() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm your AI Food Assistant. I can help you plan meals within your budget, find affordable food options, and suggest cheap but nutritious meals. What would you like help with?",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    try {
      const conversationHistory = messages.map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      }));

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
          { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
          { role: "model", parts: [{ text: "Understood! I'm ready to help with food budgeting and meal planning in Nigeria." }] },
          ...conversationHistory,
          { role: "user", parts: [{ text }] },
        ],
      });

      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: response.text || "Sorry, I couldn't generate a response. Please try again.",
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error("Gemini error:", error);
      const errorMsg: Message = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: "Sorry, I'm having trouble connecting. Please try again in a moment.",
      };
      setMessages(prev => [...prev, errorMsg]);
    }

    setTyping(false);
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .ai-shell {
          font-family: 'Sora', sans-serif;
          background: ${colors.bg};
          min-height: 100svh;
          max-width: 430px;
          margin: 0 auto;
          color: ${colors.text};
          display: flex;
          flex-direction: column;
        }
        .ai-anim { animation: fadeIn .35s ease both; }
        .chat-area {
          flex: 1;
          overflow-y: auto;
          padding: 0 20px 120px;
        }
        .msg-bubble {
          max-width: 85%;
          padding: 14px 18px;
          border-radius: 18px;
          font-size: 13px;
          line-height: 1.5;
          animation: fadeIn .3s ease both;
        }
        .msg-user {
          background: ${colors.accent};
          color: #0A0A0A;
          margin-left: auto;
          border-bottom-right-radius: 6px;
        }
        .msg-assistant {
          background: ${colors.surface};
          border: 1px solid ${colors.border};
          color: ${colors.text};
          border-bottom-left-radius: 6px;
        }
        .suggestion-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 8px 14px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          border: 1px solid ${colors.accent};
          background: ${colors.accentSoft};
          color: ${colors.accent};
          cursor: pointer;
          transition: all .2s;
          font-family: 'Sora', sans-serif;
          white-space: nowrap;
        }
        .suggestion-chip:active { transform: scale(0.95); }
        .input-bar {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 430px;
          background: ${colors.navBg};
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid ${colors.border};
          padding: 12px 20px max(16px, env(safe-area-inset-bottom));
          z-index: 100;
        }
        .chat-input {
          width: 100%;
          background: ${colors.inputBg};
          border: 1px solid ${colors.border};
          border-radius: 24px;
          padding: 12px 50px 12px 18px;
          font-size: 13px;
          color: ${colors.text};
          font-family: 'Sora', sans-serif;
          outline: none;
          resize: none;
          max-height: 100px;
        }
        .chat-input:focus { border-color: ${colors.accent}; }
        .chat-input::placeholder { color: ${colors.textMuted}; }
        .send-btn {
          position: absolute;
          right: 28px;
          top: 50%;
          transform: translateY(-50%);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: ${colors.accent};
          color: #0A0A0A;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all .2s;
        }
        .send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .meal-plan-card {
          background: ${colors.surface};
          border: 1px solid ${colors.border};
          border-radius: 16px;
          padding: 16px;
          margin-top: 12px;
        }
        .day-row {
          padding: 10px 0;
          border-bottom: 1px solid ${colors.border};
        }
        .day-row:last-child { border-bottom: none; }
        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 14px 18px;
        }
        .typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${colors.textMuted};
          animation: typingBounce 1.4s infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
        .quick-prompt {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          border: 1px solid ${colors.border};
          background: ${colors.surface};
          color: ${colors.textSecondary};
          cursor: pointer;
          transition: all .2s;
          font-family: 'Sora', sans-serif;
          white-space: nowrap;
        }
        .quick-prompt:active { transform: scale(0.95); }
      `}</style>

      {/* ─── HEADER ─────────────────────────────────────────── */}
      <div className="ai-anim" style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 20px", borderBottom: `1px solid ${colors.border}`,
      }}>
        <button onClick={() => navigate("/home")} style={{
          width: 42, height: 42, borderRadius: "50%", border: `1px solid ${colors.border}`,
          background: colors.surface, display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: colors.text,
        }}>
          <ArrowLeft size={17} />
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}80)`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Brain size={16} color="#0A0A0A" />
          </div>
          <div>
            <span style={{ fontSize: 14, fontWeight: 600 }}>AI Food Assistant</span>
            <div style={{ fontSize: 10, color: colors.success, display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: colors.success }} />
              Online
            </div>
          </div>
        </div>
        <div style={{ width: 42 }} />
      </div>

      {/* ─── CHAT AREA ──────────────────────────────────────── */}
      <div className="chat-area">
        {messages.map(msg => (
          <div key={msg.id} style={{ marginBottom: 16 }}>
            <div className={`msg-bubble ${msg.role === "user" ? "msg-user" : "msg-assistant"}`}>
              {msg.content}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {typing && (
          <div style={{ marginBottom: 16 }}>
            <div className="msg-bubble msg-assistant">
              <div className="typing-indicator">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* ─── QUICK PROMPTS (when few messages) ──────────────── */}
      {messages.length <= 1 && (
        <div style={{
          position: "fixed", bottom: 70, left: "50%", transform: "translateX(-50%)",
          width: "100%", maxWidth: 430, padding: "0 20px",
          display: "flex", gap: 6, overflowX: "auto", scrollbarWidth: "none",
        }}>
          {QUICK_PROMPTS.map((p, i) => (
            <button key={i} className="quick-prompt" onClick={() => handleSend(p.label)}>
              {p.icon} {p.label}
            </button>
          ))}
        </div>
      )}

      {/* ─── INPUT BAR ──────────────────────────────────────── */}
      <div className="input-bar">
        <div style={{ position: "relative" }}>
          <input
            className="chat-input"
            placeholder="Ask about meals, budgets, vendors..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend(input)}
          />
          <button
            className="send-btn"
            disabled={!input.trim() || typing}
            onClick={() => handleSend(input)}
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </>
  );
}
