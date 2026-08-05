import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft, Send, Brain, Sparkles, Clock, MapPin,
  Wallet, ChevronRight, RefreshCw, ThumbsUp, ThumbsDown,
  ShoppingCart, Utensils, Zap, Leaf, Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

// ─── Types ────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  suggestions?: Suggestion[];
  mealPlan?: MealPlan;
}

interface Suggestion {
  label: string;
  action: string;
  icon?: React.ReactNode;
}

interface MealPlan {
  title: string;
  totalCost: number;
  days: DayMeal[];
}

interface DayMeal {
  day: string;
  meals: { name: string; vendor: string; price: number; time: string }[];
  total: number;
}

// ─── Sample AI Responses ──────────────────────────────────────────
const AI_RESPONSES: Record<string, Message> = {
  "budget_plan": {
    id: "r1",
    role: "assistant",
    content: "I've created a 5-day meal plan within your ₦10,000 budget. This includes balanced meals from verified vendors near you.",
    mealPlan: {
      title: "5-Day Budget Meal Plan",
      totalCost: 9800,
      days: [
        {
          day: "Monday",
          meals: [
            { name: "Yam + Egg Sauce", vendor: "Mama Nkechi Kitchen", price: 1800, time: "8:00 AM" },
            { name: "Jollof Rice + Chicken", vendor: "Campus Eats", price: 2500, time: "1:00 PM" },
            { name: "Beans + Plantain", vendor: "Fresh Basket Store", price: 1500, time: "7:00 PM" },
          ],
          total: 5800,
        },
        {
          day: "Tuesday",
          meals: [
            { name: "Oatmeal + Banana", vendor: "Campus Green Mart", price: 800, time: "8:00 AM" },
            { name: "Fried Rice + Turkey", vendor: "Mama Nkechi Kitchen", price: 3000, time: "1:00 PM" },
            { name: "Indomie + Egg", vendor: "Campus Eats", price: 1200, time: "7:00 PM" },
          ],
          total: 5000,
        },
        {
          day: "Wednesday",
          meals: [
            { name: "Bread + Tea", vendor: "Campus Green Mart", price: 600, time: "8:00 AM" },
            { name: "Ofada Rice + Ayamase", vendor: "Mama Nkechi Kitchen", price: 2800, time: "1:00 PM" },
            { name: "Suya + Salad", vendor: "Fresh Basket Store", price: 1500, time: "7:00 PM" },
          ],
          total: 4900,
        },
        {
          day: "Thursday",
          meals: [
            { name: "Akara + Pap", vendor: "Campus Eats", price: 500, time: "8:00 AM" },
            { name: "Eba + Egusi Soup", vendor: "Mama Nkechi Kitchen", price: 2000, time: "1:00 PM" },
            { name: "Grilled Fish + Chips", vendor: "Fresh Basket Store", price: 2500, time: "7:00 PM" },
          ],
          total: 5000,
        },
        {
          day: "Friday",
          meals: [
            { name: "Cereal + Milk", vendor: "Campus Green Mart", price: 700, time: "8:00 AM" },
            { name: "Chicken Shawarma", vendor: "Campus Eats", price: 1800, time: "1:00 PM" },
            { name: "Rice + Stew", vendor: "Mama Nkechi Kitchen", price: 1500, time: "7:00 PM" },
          ],
          total: 4000,
        },
      ],
    },
    suggestions: [
      { label: "Order Now", action: "order", icon: <ShoppingCart size={12} /> },
      { label: "Modify Plan", action: "modify", icon: <RefreshCw size={12} /> },
      { label: "Add to Wallet", action: "wallet", icon: <Wallet size={12} /> },
    ],
  },
  "nearby_vendors": {
    id: "r2",
    role: "assistant",
    content: "Here are verified food vendors near you with food credit redemption:",
    suggestions: [
      { label: "Mama Nkechi Kitchen", action: "vendor_1", icon: <MapPin size={12} /> },
      { label: "Campus Green Mart", action: "vendor_2", icon: <MapPin size={12} /> },
      { label: "Fresh Basket Store", action: "vendor_3", icon: <MapPin size={12} /> },
    ],
  },
  "healthy_options": {
    id: "r3",
    role: "assistant",
    content: "Based on your preferences, here are some balanced meal options that are affordable and nutritious:",
    suggestions: [
      { label: "Grilled Fish + Vegetables", action: "order_1", icon: <Leaf size={12} /> },
      { label: "Beans + Plantain + Salad", action: "order_2", icon: <Utensils size={12} /> },
      { label: "Yam + Egg Sauce", action: "order_3", icon: <Utensils size={12} /> },
    ],
  },
};

const QUICK_PROMPTS = [
  { label: "I have ₦10,000 for 5 days", icon: <Wallet size={14} /> },
  { label: "What can I eat for ₦2,000?", icon: <Utensils size={14} /> },
  { label: "Healthy lunch options", icon: <Leaf size={14} /> },
  { label: "Vendors near me", icon: <MapPin size={14} /> },
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
      content: "Hi! I'm your AI Food Assistant. I can help you plan meals within your budget, find nearby vendors, and suggest affordable food options. What would you like help with?",
      suggestions: [
        { label: "Plan my meals", action: "budget_plan", icon: <Brain size={12} /> },
        { label: "Find vendors", action: "nearby_vendors", icon: <MapPin size={12} /> },
        { label: "Healthy options", action: "healthy_options", icon: <Leaf size={12} /> },
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let responseKey = "budget_plan";
      const lower = text.toLowerCase();
      if (lower.includes("vendor") || lower.includes("near")) responseKey = "nearby_vendors";
      else if (lower.includes("healthy") || lower.includes("nutrition")) responseKey = "healthy_options";

      const response = AI_RESPONSES[responseKey];
      setMessages(prev => [...prev, { ...response, id: `a-${Date.now()}` }]);
      setTyping(false);
    }, 1500);
  };

  const handleSuggestion = (action: string) => {
    const response = AI_RESPONSES[action];
    if (response) {
      setTyping(true);
      setTimeout(() => {
        setMessages(prev => [...prev, { ...response, id: `a-${Date.now()}` }]);
        setTyping(false);
      }, 1000);
    } else {
      handleSend(action);
    }
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

            {/* Meal Plan */}
            {msg.mealPlan && (
              <div className="meal-plan-card" style={{ marginTop: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{msg.mealPlan.title}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: colors.accent }}>
                    {`\u20A6${msg.mealPlan.totalCost.toLocaleString()}`}
                  </span>
                </div>

                {msg.mealPlan.days.map(day => (
                  <div key={day.day} className="day-row">
                    <div style={{ fontSize: 12, fontWeight: 700, color: colors.accent, marginBottom: 6 }}>{day.day}</div>
                    {day.meals.map((meal, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 11 }}>
                        <div>
                          <span style={{ color: colors.textSecondary }}>{meal.time}</span>
                          <span style={{ color: colors.text, marginLeft: 6 }}>{meal.name}</span>
                          <span style={{ color: colors.textMuted, marginLeft: 4 }}>({meal.vendor})</span>
                        </div>
                        <span style={{ color: colors.text, fontWeight: 600 }}>{`\u20A6${meal.price.toLocaleString()}`}</span>
                      </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: colors.text }}>
                        Day total: {`\u20A6${day.total.toLocaleString()}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Suggestions */}
            {msg.suggestions && (
              <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                {msg.suggestions.map((s, i) => (
                  <button key={i} className="suggestion-chip" onClick={() => handleSuggestion(s.action)}>
                    {s.icon} {s.label}
                  </button>
                ))}
              </div>
            )}
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
