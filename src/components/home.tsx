import { useState, useEffect } from "react";
import { Home, BookOpen, ShoppingCart, BarChart2, Coins, ArrowDownIcon, PenSquareIcon, ChartCandlestickIcon, LeafyGreenIcon, SoupIcon, Construction, ArrowLeft } from "lucide-react";
import Homme from "./web3";
import { BsEyeSlash, BsGear, BsPerson } from "react-icons/bs";
import styled from "styled-components";
import { FaBoxOpen, FaBreadSlice, FaEgg } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import BudgetSection from "./BudgetSection";
import {backend_url} from 'helper';
=======

>>>>>>> parent of 601a7d7 (	modified:   src/components/home.tsx)
// ── Styled Components ─────────────────────────────────────────────
const Container = styled.div`
  display: flex;
  font-family: orbitron;
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
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 12px;
  color: rgb(36,172,242);
`;

const Message = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 32px;
  max-width: 400px;
  @media (prefers-color-scheme: dark) { color: #999; }
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
  &:hover { opacity: 0.9; transform: translateY(-2px); }
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

const BalanceAmount = styled.div`
  display: flex;
  justify-self: center;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 48px;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
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
  &:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
  @media (prefers-color-scheme: dark) {
    background: rgb(1,1,1);
    &:hover { box-shadow: 0 4px 12px rgba(51,232,191,0.2); }
  }
`;

// ── Types ─────────────────────────────────────────────────────────
type CategoryId = "food" | "transport" | "books" | "health" | "savings" | "misc";

interface Category {
  id: CategoryId;
  label: string;
  icon: string;
  color: string;
}

interface FoodPackage {
  id: number;
  name: string;
  desc: string;
  price: number;
  img: any;
  tag: string;
  portions: number;
  category: string;
}

interface CartItem extends FoodPackage {
  qty: number;
}

interface Transaction {
  id: number;
  desc: string;
  amount: number;
  date: string;
  type: "spend" | "deposit" | "crypto";
  category: string;
}

interface ChartDatum {
  label: string;
  value: number;
  color: string;
}

type BudgetMap = Record<CategoryId, number>;
type Screen = "home" | "Coins" | "Budget" | "market" | "stats" | "deposits";

// ── Static Data ───────────────────────────────────────────────────
const CATEGORIES: Category[] = [
  { id: "food",      label: "Food & Meals",    icon: "🍽️", color: "#E8763A" },
  { id: "transport", label: "Transport",        icon: "🚌", color: "#3A8FE8" },
  { id: "books",     label: "Books & Supplies", icon: "📚", color: "#8F3AE8" },
  { id: "health",    label: "Health",           icon: "💊", color: "#E83A6B" },
  { id: "savings",   label: "Savings",          icon: "🏦", color: "#3AE87F" },
  { id: "misc",      label: "Miscellaneous",    icon: "🎯", color: "#E8D43A" },
];

const FOOD_PACKAGES: FoodPackage[] = [
  { id: 1, name: "Campus Essentials Box",  desc: "Rice, beans, garri, palm oil — weekly staples",    price: 4500, img: <FaBoxOpen />,      tag: "SDG 2",        portions: 7,  category: "food" },
  { id: 2, name: "Protein Power Pack",     desc: "Eggs, canned fish, groundnuts, soy milk",          price: 6200, img: <FaEgg />,          tag: "High Protein", portions: 14, category: "food" },
  { id: 3, name: "Veggie Fresh Bundle",    desc: "Tomatoes, peppers, onions, leafy greens",          price: 3800, img: <LeafyGreenIcon />, tag: "Fresh Daily",  portions: 5,  category: "food" },
  { id: 4, name: "Snack & Study Kit",      desc: "Biscuits, chin-chin, zobo drink, cashews",         price: 2500, img: "🍿",               tag: "Study Fuel",   portions: 10, category: "misc" },
  { id: 5, name: "Breakfast Starter",      desc: "Oats, bread, peanut butter, powdered milk",        price: 3200, img: <FaBreadSlice />,   tag: "Morning Boost",portions: 7,  category: "food" },
  { id: 6, name: "Seminar Week Meal Prep", desc: "Pre-cooked stew, frozen veggies, pasta packs",     price: 7800, img: <SoupIcon />,       tag: "Exam Season",  portions: 14, category: "food" },
];

const TRANSACTIONS: Transaction[] = [
  { id: 1, desc: "Campus Essentials Box",      amount: -4500,  date: "Feb 20", type: "spend",   category: "food"      },
  { id: 2, desc: "Vault Deposit",              amount: 25000,  date: "Feb 18", type: "deposit", category: "vault"     },
  { id: 3, desc: "Transport Budget",           amount: -1200,  date: "Feb 17", type: "spend",   category: "transport" },
  { id: 4, desc: "Stablecoin Received (USDT)", amount: 15600,  date: "Feb 15", type: "crypto",  category: "vault"     },
  { id: 5, desc: "Protein Power Pack",         amount: -6200,  date: "Feb 14", type: "spend",   category: "food"      },
];

const SPENT_BY_CATEGORY: Partial<Record<CategoryId, number>> = {
  food: 0, transport: 0, books: 0, health: 0,
};

// ── Under Construction Screen ─────────────────────────────────────
const UnderConstruction = ({ onBack }: { onBack: () => void }) => (
  <Container>
    <ComingSoonBadge>COMING SOON</ComingSoonBadge>
    <IconWrapper>
      <Construction size={80} color="rgb(36,172,242)" />
    </IconWrapper>
    <Title>We're Building Something Great!</Title>
    <Message>
      This feature is currently under construction. We're working hard to bring you an amazing experience. Check back soon!
    </Message>
    <BackButton onClick={onBack}>
      <ArrowLeft size={20} />
      Go Back
    </BackButton>
  </Container>
);

// ── Animated Number ───────────────────────────────────────────────
function AnimatedNumber({ value, prefix = "" }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value === 0) { setDisplay(0); return; }
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(current));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [value]);

  return <span>{prefix}{display.toLocaleString()}</span>;
}

// ── Donut Chart ───────────────────────────────────────────────────
function DonutChart({ data }: { data: ChartDatum[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  let cumulative = 0;
  const cx = 60, cy = 60, r = 48, stroke = 14;
  const circ = 2 * Math.PI * r;

  const segments = data.map((d) => {
    const pct = d.value / total;
    const dash = pct * circ;
    const gap = circ - dash;
    const offset = circ - cumulative * circ;
    cumulative += pct;
    return { ...d, dash, gap, offset };
  });

  const totalLabel = (total / 1000).toFixed(0);

  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1a1a1a" strokeWidth={stroke} />
      {segments.map((s, i) => (
        <circle
          key={i} cx={cx} cy={cy} r={r}
          fill="none" stroke={s.color} strokeWidth={stroke}
          strokeDasharray={`${s.dash} ${s.gap}`}
          strokeDashoffset={s.offset}
          style={{ transition: "stroke-dasharray 0.6s ease" }}
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      ))}
      <text x={cx} y={cy - 4}  textAnchor="middle" fill="white"         fontSize="9" fontWeight="700" fontFamily="Orbitron">SPENT</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="rgb(0,131,208)" fontSize="8" fontFamily="Orbitron">₦{totalLabel}k</text>
    </svg>
  );
}

// ── Main Component ────────────────────────────────────────────────
export default function CampusPlanner() {
  const email = localStorage.getItem('email');
  const navigate = useNavigate();

  const [accountNumber, setNumber]       = useState('****');
  const [bankName, setName]              = useState(' ');
  const [screen, setScreen]              = useState<Screen>("home");
  const [vaultBalance, setVaultBalance]  = useState<number>(0);
  const [budget, setBudget]              = useState<BudgetMap>({ food: 15000, transport: 5000, books: 3000, health: 2000, savings: 5000, misc: 2000 });
  const [cart, setCart]                  = useState<CartItem[]>([]);
  const [depositAmt, setDepositAmt]      = useState<string>("");
  const [depositDone, setDepositDone]    = useState<boolean>(false);
  const [planEditing, setPlanEditing]    = useState<boolean>(false);
  const [editBudget, setEditBudget]      = useState<BudgetMap>({ ...budget });
  const [hidden, setHidden]              = useState<boolean>(false);

<<<<<<< HEAD
  // Transactions state 
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [txnLoading, setTxnLoading]     = useState<boolean>(true);
  const [txnError, setTxnError]         = useState<string | null>(null);
  const [txnRetry, setTxnRetry]         = useState<number>(0); // bump to re-fetch

  //Fetch balance 
  useEffect(() => {
    const fetchCurrent = async () => {
      try {
        const request = await fetch(`${backend_url}/currentBalance/${email}`);
        const result  = await request.json();
        setNumber(result.account_number ?? "****");
=======
  // ── Fetch balance on mount ──────────────────────────────────────
  useEffect(() => {
    const fetchCurrent = async () => {
      try {
        const request = await fetch(`${import.meta.env.VITE_BACKEND_URL}/currentBalance/${email}`);
        const result = await request.json();
        setNumber(result.account_number ?? '****');
>>>>>>> parent of 601a7d7 (	modified:   src/components/home.tsx)
        setVaultBalance(result.Balance ?? 0);
      } catch (error) {
        console.error("Failed to load balance:", error);
      }
    };
    fetchCurrent();
  }, []);

<<<<<<< HEAD
  // ── Fetch account details 
  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const action = await fetch(`${backend_url}/currentBalance/${email}`);
        const finAct  = await action.json();
        setNumber(finAct.data?.bank_account ?? "****");
        setName(finAct.data?.bank_name ?? " ");
=======
  // ── Fetch account details on mount ─────────────────────────────
  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const action = await fetch(`${import.meta.env.VITE_BACKEND_URL}/currentBalance/${email}`);
        const finAct = await action.json();
        setNumber(finAct.data?.bank_account ?? '****');
        setName(finAct.data?.bank_name ?? ' ');
>>>>>>> parent of 601a7d7 (	modified:   src/components/home.tsx)
      } catch (error) {
        console.error("Failed to load account details:", error);
      }
    };
    fetchAccountDetails();
  }, []);

<<<<<<< HEAD
  // ── Sync balance to DB 
=======
  // ── Sync balance to DB when it changes ─────────────────────────
>>>>>>> parent of 601a7d7 (	modified:   src/components/home.tsx)
  useEffect(() => {
    if (vaultBalance === 0) return;
    const recordCurrent = async () => {
      try {
<<<<<<< HEAD
        const response = await fetch(`${backend_url}/updateBalance/${email}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
=======
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/updateBalance/${email}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
>>>>>>> parent of 601a7d7 (	modified:   src/components/home.tsx)
          body: JSON.stringify({ balance: vaultBalance }),
        });
        if (!response.ok) throw new Error('Failed to update balance');
        console.log("Balance synced to DB");
      } catch (err) {
        console.error("Sync error:", err);
      }
    };
    recordCurrent();
  }, [vaultBalance]);

<<<<<<< HEAD
    const fetchTransactions = async () => {
      setTxnLoading(true);
      setTxnError(null);
      try {
        const res  = await fetch(`${backend_url}/transactions/${email}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
    // Accept: plain array | { data: [] } | { transactions: [] }
        const raw: any[] =
          Array.isArray(json)              ? json               :
          Array.isArray(json.data)         ? json.data          :
          Array.isArray(json.transactions) ? json.transactions  :
          [];

        if (!cancelled) setTransactions(raw.map(normaliseTransaction));
      } catch (err: any) {
        console.error("Failed to load transactions:", err);
        if (!cancelled) setTxnError("No recent activity.");
      } finally {
        if (!cancelled) setTxnLoading(false);
      }
    };

    fetchTransactions();
    return () => { cancelled = true; };
  }, [email, txnRetry]);

  // ── Derived values bac
=======
  // ── Derived values ──────────────────────────────────────────────
>>>>>>> parent of 601a7d7 (	modified:   src/components/home.tsx)
  const totalBudgeted = Object.values(budget).reduce((a, b) => a + b, 0);
  const totalSpent    = 0;
  const cartTotal     = cart.reduce((s, item) => s + item.price * item.qty, 0);

  const addToCart = (pkg: FoodPackage) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === pkg.id);
      if (existing) return prev.map((c) => c.id === pkg.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...pkg, qty: 1 }];
    });
  };

  const handleDeposit = () => {
    const amt = parseFloat(depositAmt);
    if (amt > 0) {
      setVaultBalance((prev) => prev + amt);
      setDepositDone(true);
      setTimeout(() => { setDepositDone(false); setDepositAmt(""); }, 2000);
    }
  };

  const savePlan = () => {
    const total = Object.values(editBudget).reduce((a, b) => a + b, 0);
    if (total <= vaultBalance) {
      setBudget({ ...editBudget });
      setPlanEditing(false);
    }
  };

  const chartData: ChartDatum[] = CATEGORIES.map((c) => ({
    label: c.label,
    value: budget[c.id],
    color: c.color,
  }));

  const navItems: { id: Screen; icon: React.ReactNode; label: string }[] = [
    { id: "home",   icon: <Home size={20} />,         label: "Home"         },
    { id: "Coins",  icon: <Coins size={20} />,        label: "Chain Wallet" },
    { id: "Budget", icon: <BookOpen size={20} />,     label: "Budget"       },
    { id: "market", icon: <ShoppingCart size={20} />, label: "Market"       },
    { id: "stats",  icon: <BarChart2 size={20} />,    label: "Stats"        },
  ];

  const txnBg = (type: Transaction["type"]) => {
    if (type === "deposit") return "rgba(58,232,127,0.1)";
    if (type === "crypto")  return "rgba(58,200,232,0.1)";
    return "rgba(232,118,58,0.1)";
  };

  const txnIcon = (type: Transaction["type"]) => {
    if (type === "deposit") return "⬇️";
    if (type === "crypto")  return "🔗";
    return "🛍️";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #F9F9F9; }
        @media (prefers-color-scheme: dark) { body { background: rgb(15,15,15); } }
        .app { font-family: 'Orbitron', sans-serif; background: #F9F9F9; min-height: 100svh; max-width: 430px; margin: 0 auto; color: rgb(34,34,34); position: relative; overflow-x: hidden; padding: 20px; padding-bottom: 100px; }
        @media (prefers-color-scheme: dark) { .app { background: rgb(15,15,15); color: white; } }
        .screen { min-height: 100svh; }
        .top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; }
        .logo { font-family: 'Orbitron', sans-serif; font-weight: 800; font-size: 18px; letter-spacing: 1px; color: rgb(34,34,34); }
        @media (prefers-color-scheme: dark) { .logo { color: white; } }
        .logo span { color: RGB(0,131,208); }
        .avatar { width: 44px; height: 44px; background: linear-gradient(135deg, RGB(0,131,208), rgb(51,232,191)); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 18px; cursor: pointer; transition: all 0.3s ease; }
        .avatar:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,131,208,0.3); }
        .balance-card { background: linear-gradient(90deg, RGB(0,131,208)); border-radius: 20px; padding: 32px 24px; margin-bottom: 24px; position: relative; overflow: hidden; animation: fadeIn 0.5s ease-in; }
        @media (prefers-color-scheme: dark) { .balance-card { background: black; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .balance-label { font-size: 12px; color: rgba(255,255,255,0.85); text-transform: uppercase; letter-spacing: 1.5px; font-weight: 500; margin-bottom: 8px; text-align: center; }
        .balance-amount { font-family: 'Orbitron', sans-serif; font-size: 36px; font-weight: 700; color: white; display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 16px; }
        .eye-btn { background: rgba(255,255,255,0.2); border: none; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease; color: white; font-size: 16px; }
        .eye-btn:hover { background: rgba(255,255,255,0.3); transform: scale(1.1); }
        .quick-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 28px; }
        .quick-btn { background: white; border: none; border-radius: 16px; padding: 14px 8px; display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; transition: all 0.3s ease; color: inherit; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .quick-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,131,208,0.15); }
        @media (prefers-color-scheme: dark) { .quick-btn { background: rgb(1,1,1); } }
        .quick-btn .qb-icon { font-size: 22px; }
        .quick-btn .qb-label { font-size: 9px; color: grey; font-weight: 500; text-align: center; }
        .section-title { font-family: 'Orbitron', sans-serif; font-size: 14px; font-weight: 600; color: rgb(34,34,34); margin-bottom: 14px; display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        @media (prefers-color-scheme: dark) { .section-title { color: white; } }
        .section-title .see-all { font-size: 11px; color: rgb(36,172,242); font-weight: 500; cursor: pointer; }
        .package-scroll { display: flex; gap: 12px; overflow-x: auto; padding-bottom: 8px; scrollbar-width: none; margin-bottom: 28px; }
        .package-scroll::-webkit-scrollbar { display: none; }
        .pkg-card { min-width: 160px; background: white; border-radius: 20px; padding: 16px; cursor: pointer; transition: all 0.3s ease; flex-shrink: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .pkg-card:hover { transform: translateY(-3px); box-shadow: 0 6px 20px rgba(0,131,208,0.15); }
        @media (prefers-color-scheme: dark) { .pkg-card { background: rgb(1,1,1); } }
        .pkg-icon { font-size: 32px; margin-bottom: 10px; }
        .pkg-tag { font-size: 9px; background: rgba(0,131,208,0.1); color: RGB(0,131,208); border-radius: 6px; padding: 2px 6px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; display: inline-block; margin-bottom: 8px; }
        .pkg-name { font-family: 'Orbitron', sans-serif; font-size: 11px; font-weight: 700; color: rgb(34,34,34); margin-bottom: 4px; line-height: 1.4; }
        @media (prefers-color-scheme: dark) { .pkg-name { color: white; } }
        .pkg-price { font-size: 13px; font-weight: 700; color: rgb(51,232,191); margin-top: 8px; }
        .content-wrapper { background: white; border-radius: 16px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        @media (prefers-color-scheme: dark) { .content-wrapper { background: rgb(1,1,1); } }
        .txn-item { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid rgba(0,0,0,0.05); }
        @media (prefers-color-scheme: dark) { .txn-item { border-bottom-color: rgba(255,255,255,0.05); } }
        .txn-icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
        .txn-info { flex: 1; }
        .txn-desc { font-size: 11px; font-weight: 500; color: rgb(34,34,34); }
        @media (prefers-color-scheme: dark) { .txn-desc { color: rgba(255,255,255,0.85); } }
        .txn-date { font-size: 10px; color: grey; margin-top: 2px; }
        .txn-amt { font-family: 'Orbitron', sans-serif; font-size: 13px; font-weight: 700; }
        .txn-amt.positive { color: rgb(51,232,191); }
        .txn-amt.negative { color: RGB(0,131,208); }
        .vault-card { background: linear-gradient(90deg, RGB(0,131,208)); border-radius: 20px; padding: 28px 24px; margin-bottom: 20px; text-align: center; }
        @media (prefers-color-scheme: dark) { .vault-card { background: black; } }
        .input-row { display: flex; gap: 10px; margin-bottom: 12px; align-items: center; }
        .amt-input { flex: 1; background: white; border: 1px solid rgba(0,131,208,0.2); border-radius: 14px; padding: 14px 16px; color: rgb(34,34,34); font-size: 14px; font-family: 'Orbitron', sans-serif; font-weight: 600; outline: none; transition: border-color 0.2s; }
        .amt-input:focus { border-color: RGB(0,131,208); box-shadow: 0 0 0 3px rgba(0,131,208,0.1); }
        .amt-input::placeholder { color: #bbb; }
        @media (prefers-color-scheme: dark) { .amt-input { background: rgb(1,1,1); border-color: rgba(51,232,191,0.2); color: white; } }
        .btn-primary { background: linear-gradient(135deg, RGB(0,131,208), rgb(36,172,242)); border: none; border-radius: 14px; padding: 14px 20px; color: white; font-family: 'Orbitron', sans-serif; font-size: 12px; font-weight: 700; cursor: pointer; transition: all 0.3s ease; white-space: nowrap; letter-spacing: 0.5px; }
        .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,131,208,0.3); }
        .btn-primary.success { background: linear-gradient(135deg, rgb(51,232,191), rgb(36,200,160)); }
        .plan-header-card { background: white; border-radius: 20px; padding: 20px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        @media (prefers-color-scheme: dark) { .plan-header-card { background: rgb(1,1,1); } }
        .plan-cat-item { background: white; border-radius: 16px; padding: 16px; margin-bottom: 10px; display: flex; align-items: center; gap: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); transition: all 0.3s ease; }
        .plan-cat-item:hover { transform: translateY(-2px); }
        @media (prefers-color-scheme: dark) { .plan-cat-item { background: rgb(1,1,1); } }
        .cat-name { font-size: 11px; font-weight: 600; color: rgb(34,34,34); flex: 1; }
        @media (prefers-color-scheme: dark) { .cat-name { color: white; } }
        .cat-bar-wrap { height: 4px; background: rgba(0,0,0,0.07); border-radius: 2px; margin-top: 6px; overflow: hidden; }
        @media (prefers-color-scheme: dark) { .cat-bar-wrap { background: rgba(255,255,255,0.07); } }
        .cat-bar { height: 100%; border-radius: 2px; transition: width 0.6s ease; }
        .cat-amt { font-family: 'Orbitron', sans-serif; font-size: 12px; font-weight: 700; color: rgb(34,34,34); min-width: 80px; text-align: right; }
        @media (prefers-color-scheme: dark) { .cat-amt { color: white; } }
        .plan-input { background: #f5f5f5; border: 1px solid rgba(0,131,208,0.2); border-radius: 10px; padding: 8px 12px; color: rgb(34,34,34); font-size: 12px; font-family: 'Orbitron', sans-serif; font-weight: 600; outline: none; width: 90px; text-align: right; }
        @media (prefers-color-scheme: dark) { .plan-input { background: rgb(20,20,20); color: white; } }
        .btn-secondary { background: transparent; border: 1px solid rgba(0,131,208,0.3); border-radius: 12px; padding: 10px 18px; color: RGB(0,131,208); font-size: 11px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; font-family: 'Orbitron', sans-serif; }
        .btn-secondary:hover { background: rgba(0,131,208,0.08); transform: translateY(-1px); }
        .market-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .market-card { background: white; border-radius: 20px; padding: 16px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .market-card:hover { transform: translateY(-2px); }
        @media (prefers-color-scheme: dark) { .market-card { background: rgb(1,1,1); } }
        .add-btn { width: 100%; background: rgba(0,131,208,0.08); border: 1px dashed rgba(0,131,208,0.3); border-radius: 10px; padding: 8px; color: RGB(0,131,208); font-size: 10px; font-weight: 700; cursor: pointer; margin-top: 10px; transition: all 0.2s; font-family: 'Orbitron', sans-serif; }
        .cart-float { position: fixed; bottom: 88px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, RGB(0,131,208), rgb(36,172,242)); border-radius: 20px; padding: 14px 28px; display: flex; align-items: center; gap: 12px; cursor: pointer; box-shadow: 0 8px 32px rgba(0,131,208,0.4); z-index: 50; animation: slideUp 0.3s ease; white-space: nowrap; }
        @keyframes slideUp { from { transform: translateX(-50%) translateY(20px); opacity: 0; } to { transform: translateX(-50%) translateY(0); opacity: 1; } }
        .cart-label { font-family: 'Orbitron', sans-serif; font-size: 12px; font-weight: 700; color: white; }
        .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
        .stat-card { background: white; border-radius: 18px; padding: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        @media (prefers-color-scheme: dark) { .stat-card { background: rgb(1,1,1); } }
        .stat-label { font-size: 9px; color: grey; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
        .stat-value { font-family: 'Orbitron', sans-serif; font-size: 22px; font-weight: 700; }
        .stat-value.green { color: rgb(51,232,191); }
        .stat-value.blue  { color: RGB(0,131,208); }
        .stat-value.dark  { color: rgb(34,34,34); }
        @media (prefers-color-scheme: dark) { .stat-value.dark { color: white; } }
        .donut-section { background: white; border-radius: 20px; padding: 20px; margin-bottom: 20px; display: flex; align-items: center; gap: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        @media (prefers-color-scheme: dark) { .donut-section { background: rgb(1,1,1); } }
        .legend-item { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
        .legend-dot  { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .legend-label { font-size: 10px; color: grey; }
        .legend-pct   { font-size: 10px; color: rgb(34,34,34); font-weight: 700; margin-left: auto; }
        @media (prefers-color-scheme: dark) { .legend-pct { color: white; } }
        .progress-row { background: white; border-radius: 16px; padding: 16px; margin-bottom: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        @media (prefers-color-scheme: dark) { .progress-row { background: rgb(1,1,1); } }
        .progress-header { display: flex; justify-content: space-between; margin-bottom: 10px; align-items: center; }
        .progress-name { font-size: 11px; font-weight: 600; color: rgb(34,34,34); }
        @media (prefers-color-scheme: dark) { .progress-name { color: white; } }
        .progress-pct  { font-size: 10px; color: grey; }
        .progress-bar-bg   { height: 6px; background: rgba(0,0,0,0.07); border-radius: 3px; overflow: hidden; }
        @media (prefers-color-scheme: dark) { .progress-bar-bg { background: rgba(255,255,255,0.07); } }
        .progress-bar-fill { height: 100%; border-radius: 3px; transition: width 0.8s ease; }
        .bottom-nav { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 430px; background: white; border-top: 1px solid rgba(0,0,0,0.06); display: flex; justify-content: space-around; padding: 10px 0 20px; z-index: 100; }
        @media (prefers-color-scheme: dark) { .bottom-nav { background: rgb(15,15,15); border-top-color: rgba(255,255,255,0.06); } }
        .nav-item { display: flex; flex-direction: column; align-items: center; gap: 4px; cursor: pointer; padding: 6px 12px; border-radius: 12px; transition: all 0.2s; border: none; background: transparent; color: inherit; font-family: 'Orbitron', sans-serif; }
        .nav-item .nav-icon { display: flex; align-items: center; justify-content: center; color: #aaa; transition: color 0.2s; }
        .nav-item.active .nav-icon { color: RGB(0,131,208); }
        .nav-item .nav-label { font-size: 8px; color: grey; font-weight: 500; }
        .nav-item.active .nav-label { color: RGB(0,131,208); }
        .nav-item.active { background: rgba(0,131,208,0.08); }
        .tag-sdg { display: inline-flex; align-items: center; gap: 4px; background: rgba(51,232,191,0.1); border: 1px solid rgba(51,232,191,0.25); border-radius: 8px; padding: 3px 8px; font-size: 9px; color: rgb(51,232,191); font-weight: 700; letter-spacing: 0.5px; }
        .divider { height: 1px; background: rgba(0,0,0,0.06); margin: 16px 0; }
        @media (prefers-color-scheme: dark) { .divider { background: rgba(255,255,255,0.06); } }
        .warning-banner { background: rgba(232,58,58,0.08); border: 1px solid rgba(232,58,58,0.2); border-radius: 12px; padding: 12px 16px; font-size: 11px; color: #E85A5A; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
      `}</style>

      <div className="app">

        {/* ── HOME ──────────────────────────────────────────────── */}
        {screen === "home" && (
          <div className="screen">
            <div className="top-bar">
              <HeaderIcon href='#/tools'>
                <BsGear style={{ height: '20px', width: '20px' }} />
              </HeaderIcon>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span className="tag-sdg">🌱 SDG 2</span>
                <div className="avatar"><BsPerson /></div>
              </div>
            </div>

            <div className="balance-card">
              <div className="balance-label">Vault Balance</div>
              <div className="balance-amount">
                <BalanceAmount>
                  {hidden ? "••••••" : <AnimatedNumber value={vaultBalance} prefix="₦" />}
                  <button className="eye-btn" onClick={() => setHidden(!hidden)}>
                    {hidden ? "👁" : <BsEyeSlash />}
                  </button>
                </BalanceAmount>
              </div>
            </div>

            <div className="quick-grid">
              <button className="quick-btn" onClick={() => setScreen("deposits")}>
                <span className="qb-icon"><ArrowDownIcon /></span>
                <span className="qb-label">Deposit</span>
              </button>
              <button className="quick-btn" onClick={() => setScreen("Budget")}>
                <span className="qb-icon"><PenSquareIcon /></span>
                <span className="qb-label">Budget</span>
              </button>
              <button className="quick-btn" onClick={() => setScreen("market")}>
                <span className="qb-icon"><ShoppingCart /></span>
                <span className="qb-label">Shop</span>
              </button>
              <button className="quick-btn" onClick={() => setScreen("stats")}>
                <span className="qb-icon"><ChartCandlestickIcon /></span>
                <span className="qb-label">Analytics</span>
              </button>
            </div>

            <div className="section-title">
              Food Packages
              <span className="see-all" onClick={() => setScreen("market")}>See all →</span>
            </div>
            <div className="package-scroll">
              {FOOD_PACKAGES.map((pkg) => (
                <div className="pkg-card" key={pkg.id} onClick={() => setScreen("market")}>
                  <div className="pkg-icon">{pkg.img}</div>
                  <div className="pkg-tag">{pkg.tag}</div>
                  <div className="pkg-name">{pkg.name}</div>
                  <div className="pkg-price">₦{pkg.price.toLocaleString()}</div>
                </div>
              ))}
            </div>

            <div className="section-title">Recent Activity</div>
            {TRANSACTIONS.slice(0, 4).map((t) => (
              <div className="txn-item" key={t.id}>
                <div className="txn-icon" style={{ background: txnBg(t.type) }}>{txnIcon(t.type)}</div>
                <div className="txn-info">
                  <div className="txn-desc">{t.desc}</div>
                  <div className="txn-date">{t.date}</div>
                </div>
                <div className={`txn-amt ${t.amount > 0 ? "positive" : "negative"}`}>
                  {t.amount > 0 ? "+" : ""}₦{Math.abs(t.amount).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
 
        {screen === "deposits" && (
          <UnderConstruction onBack={() => setScreen("home")} />
        )}

        
        {screen === "Coins" && <UnderConstruction onBack={() => setScreen("home")} />}

      
        {screen === "Budget" && (
          <div className="screen">
            <div className="top-bar">
              <button className="btn-secondary" onClick={() => setScreen("home")}>← Back</button>
              <div className="logo" style={{ fontSize: "16px" }}>Budget <span>Plan</span></div>
              <button
                className="btn-primary"
                style={{ padding: "8px 14px", fontSize: "12px" }}
                onClick={() => { setEditBudget({ ...budget }); setPlanEditing(!planEditing); }}
              >
                {planEditing ? "Cancel" : "Edit"}
              </button>
            </div>

            <div className="plan-header-card">
              <div>
                <div style={{ fontSize: "11px", color: "#555", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Monthly Budget</div>
                <div style={{ fontFamily: "Orbitron", fontSize: "28px", fontWeight: 800 }}>₦{totalBudgeted.toLocaleString()}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "11px", color: "#555", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "4px" }}>Remaining</div>
                <div style={{ fontFamily: "Orbitron", fontSize: "28px", fontWeight: 800, color: "#3AE87F" }}>₦{(vaultBalance - totalSpent).toLocaleString()}</div>
              </div>
            </div>

            {totalBudgeted > vaultBalance && (
              <div className="warning-banner">
                ⚠️ Budget exceeds vault balance by ₦{(totalBudgeted - vaultBalance).toLocaleString()}
              </div>
            )}

            {CATEGORIES.map((cat) => {
              const val = planEditing ? editBudget[cat.id] : budget[cat.id];
              const pct = Math.min((val / totalBudgeted) * 100, 100);
              return (
                <div className="plan-cat-item" key={cat.id}>
                  <span style={{ fontSize: "22px" }}>{cat.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div className="cat-name">{cat.label}</div>
                    <div className="cat-bar-wrap">
                      <div className="cat-bar" style={{ width: `${pct}%`, background: cat.color }} />
                    </div>
                  </div>
                  {planEditing ? (
                    <input
                      className="plan-input"
                      type="number"
                      value={editBudget[cat.id]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEditBudget((prev) => ({ ...prev, [cat.id]: Number(e.target.value) }))
                      }
                    />
                  ) : (
                    <div className="cat-amt">₦{val.toLocaleString()}</div>
                  )}
                </div>
              );
            })}

            {planEditing && (
              <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setPlanEditing(false)}>Cancel</button>
                <button className="btn-primary"   style={{ flex: 2 }} onClick={savePlan}>Save Plan</button>
              </div>
            )}
          </div>
        )}

        {/* ── MARKET ────────────────────────────────────────────── */}
        {screen === "market" && (
          <div className="screen">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <button className="btn-secondary" onClick={() => setScreen("home")}>Back</button>
              <div className="logo" style={{ fontSize: "16px" }}>Packages</div>
              <div style={{ width: 60 }} />
            </div>

            <div className="market-grid">
              {FOOD_PACKAGES.map((pkg) => (
                <div className="market-card" key={pkg.id}>
                  <div className="pkg-icon">{pkg.img}</div>
                  <div className="pkg-tag">{pkg.tag}</div>
                  <div className="pkg-name">{pkg.name}</div>
                  <div style={{ fontSize: "11px", color: "#555", marginTop: "4px", lineHeight: "1.4" }}>{pkg.desc}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                    <div className="pkg-price">₦{pkg.price.toLocaleString()}</div>
                    <span style={{ fontSize: "10px", color: "#555" }}>{pkg.portions} meals</span>
                  </div>
                  <button className="add-btn" onClick={() => addToCart(pkg)}>+ Add to Plan</button>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <div className="cart-float">
                <span style={{ fontSize: "20px" }}>🛒</span>
                <div>
                  <div className="cart-label">{cart.reduce((s, c) => s + c.qty, 0)} items · ₦{cartTotal.toLocaleString()}</div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.7)" }}>From your food budget</div>
                </div>
                <span
                  style={{ color: "white", fontFamily: "Orbitron", fontWeight: 700, cursor: "pointer" }}
                  onClick={() => navigate('/checkout', { state: { price: { cartTotal } } })}
                >
                  Pay →
                </span>
              </div>
            )}
          </div>
        )}

        {/* ── STATS ─────────────────────────────────────────────── */}
        {screen === "stats" && (
          <div className="screen">
            <div className="top-bar">
              <button className="btn-secondary" onClick={() => setScreen("home")}>← Back</button>
              <div className="logo" style={{ fontSize: "16px" }}>Analytics</div>
              <div style={{ width: 60 }} />
            </div>

            <div className="stats-grid">
              <div className="stat-card"><div className="stat-label">Budgeted</div><div className="stat-value dark">₦{(totalBudgeted / 1000).toFixed(0)}k</div></div>
              <div className="stat-card"><div className="stat-label">Spent</div><div className="stat-value blue">₦{(totalSpent / 1000).toFixed(0)}k</div></div>
              <div className="stat-card"><div className="stat-label">Saved</div><div className="stat-value green">₦{((totalBudgeted - totalSpent) / 1000).toFixed(0)}k</div></div>
              <div className="stat-card"><div className="stat-label">Save Rate</div><div className="stat-value green">{Math.round(((totalBudgeted - totalSpent) / totalBudgeted) * 100)}%</div></div>
            </div>

            <div className="donut-section">
              <DonutChart data={chartData} />
              <div style={{ flex: 1 }}>
                {CATEGORIES.map((c) => (
                  <div className="legend-item" key={c.id}>
                    <div className="legend-dot" style={{ background: c.color }} />
                    <div className="legend-label">{c.label.split(" ")[0]}</div>
                    <div className="legend-pct">{Math.round((budget[c.id] / totalBudgeted) * 100)}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="section-title">Category Breakdown</div>
            {CATEGORIES.map((c) => {
              const spent = SPENT_BY_CATEGORY[c.id] ?? 0;
              const pct   = Math.min(Math.round((spent / budget[c.id]) * 100), 100);
              return (
                <div className="progress-row" key={c.id}>
                  <div className="progress-header">
                    <div className="progress-name">{c.icon} {c.label}</div>
                    <div className="progress-pct">₦{spent.toLocaleString()} / ₦{budget[c.id].toLocaleString()}</div>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${pct}%`, background: pct > 80 ? "#E85A5A" : c.color }} />
                  </div>
                </div>
              );
            })}

            <div className="section-title" style={{ marginTop: "24px" }}>SDG 2 Impact</div>
            <div style={{ background: "linear-gradient(135deg, rgba(58,232,127,0.05), rgba(58,232,127,0.02))", border: "1px solid rgba(58,232,127,0.15)", borderRadius: "20px", padding: "20px" }}>
              <div style={{ display: "flex", gap: "24px", justifyContent: "space-around" }}>
                {[
                  { icon: "🍽️", value: 28, label: "Meals funded"    },
                  { icon: "📦", value: 3,  label: "Packages bought" },
                  { icon: "💚", value: 14, label: "Days covered"    },
                ].map((item) => (
                  <div key={item.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "32px", marginBottom: "6px" }}>{item.icon}</div>
                    <div style={{ fontFamily: "Orbitron", fontSize: "22px", fontWeight: 800, color: "#3AE87F" }}>{item.value}</div>
                    <div style={{ fontSize: "11px", color: "#555" }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── BOTTOM NAV ────────────────────────────────────────── */}
        <nav className="bottom-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item${screen === item.id ? " active" : ""}`}
              onClick={() => setScreen(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}