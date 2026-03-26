import { useState, useEffect } from "react";
import {
  Home, BookOpen, ShoppingCart, BarChart2, Coins,
  ArrowDownIcon, PenSquareIcon, ChartCandlestickIcon,
  LeafyGreenIcon, SoupIcon, Construction, ArrowLeft,
  Copy, CheckCircle, RefreshCw, Sliders
} from "lucide-react";
import Homme from "./web3";
import { BsEyeSlash, BsGear, BsPerson } from "react-icons/bs";
import styled, { keyframes } from "styled-components";
import { FaBoxOpen, FaBreadSlice, FaEgg } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BudgetSection from "./BudgetSection";

// ── Animations ────────────────────────────────────────────────────
const spin = keyframes`from { transform: rotate(0deg); } to { transform: rotate(360deg); }`;

// ── Styled Components ─────────────────────────────────────────────
const Container = styled.div`
  display: flex; font-family: orbitron; flex-direction: column;
  align-items: center; justify-content: center; min-height: 100vh;
  padding: 20px; text-align: center; background: white;
  @media (prefers-color-scheme: dark) { background: rgb(1,1,1); color: white; }
`;
const IconWrapper = styled.div`
  margin-bottom: 24px;
  animation: bounce 2s infinite;
  @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
`;
const Title       = styled.h1`font-size:28px;font-weight:bold;margin-bottom:12px;color:rgb(36,172,242)`;
const Message     = styled.p`font-size:16px;color:#666;margin-bottom:32px;max-width:400px;@media(prefers-color-scheme:dark){color:#999}`;
const BackButton  = styled.button`
  display:flex;align-items:center;gap:8px;padding:12px 24px;
  background:rgb(36,172,242);color:black;border:none;border-radius:8px;
  font-size:16px;font-weight:600;cursor:pointer;transition:all .3s;
  &:hover{opacity:.9;transform:translateY(-2px)}
`;
const ComingSoonBadge = styled.span`
  display:inline-block;padding:6px 12px;background:rgba(51,232,191,.1);
  border:1px solid rgb(36,172,242);border-radius:20px;font-size:12px;
  color:rgb(36,172,242);margin-bottom:16px;font-weight:600;
`;
const BalanceAmount = styled.div`
  display:flex;justify-self:center;align-items:center;justify-content:center;
  gap:12px;font-size:48px;font-weight:700;color:white;margin-bottom:16px;
`;
const HeaderIcon = styled.a`
  display:flex;align-items:center;justify-content:center;width:44px;height:44px;
  background:white;border-radius:12px;transition:all .3s;text-decoration:none;color:inherit;
  &:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,.1)}
  @media(prefers-color-scheme:dark){background:rgb(1,1,1);
    &:hover{box-shadow:0 4px 12px rgba(51,232,191,.2)}}
`;

// ── Types ─────────────────────────────────────────────────────────
type CategoryId = "food"|"transport"|"books"|"health"|"savings"|"misc";
interface Category  { id:CategoryId; label:string; icon:string; color:string }
interface FoodPackage { id:number; name:string; desc:string; price:number; img:any; tag:string; portions:number; category:string }
interface CartItem extends FoodPackage { qty:number }
interface Transaction { id:number; desc:string; amount:number; date:string; type:"spend"|"deposit"; category:string }
interface ChartDatum  { label:string; value:number; color:string }
type BudgetMap = Record<CategoryId,number>;
type Screen = "home"|"Coins"|"Budget"|"market"|"stats"|"deposits";

// ── Static Data ───────────────────────────────────────────────────
const CATEGORIES: Category[] = [
  { id:"food",      label:"Food & Meals",    icon:"🍽️", color:"#E8763A" },
  { id:"transport", label:"Transport",        icon:"🚌", color:"#3A8FE8" },
  { id:"books",     label:"Books & Supplies", icon:"📚", color:"#8F3AE8" },
  { id:"health",    label:"Health",           icon:"💊", color:"#E83A6B" },
  { id:"savings",   label:"Savings",          icon:"🏦", color:"#3AE87F" },
  { id:"misc",      label:"Miscellaneous",    icon:"🎯", color:"#E8D43A" },
];
const FOOD_PACKAGES: FoodPackage[] = [
  { id:1, name:"Campus Essentials Box",  desc:"Rice, beans, garri, palm oil — weekly staples",  price:4500, img:<FaBoxOpen />,      tag:"SDG 2",         portions:7,  category:"food" },
  { id:2, name:"Protein Power Pack",     desc:"Eggs, canned fish, groundnuts, soy milk",        price:6200, img:<FaEgg />,          tag:"High Protein",  portions:14, category:"food" },
  { id:3, name:"Veggie Fresh Bundle",    desc:"Tomatoes, peppers, onions, leafy greens",        price:3800, img:<LeafyGreenIcon />, tag:"Fresh Daily",   portions:5,  category:"food" },
  { id:4, name:"Snack & Study Kit",      desc:"Biscuits, chin-chin, zobo drink, cashews",       price:2500, img:"🍿",               tag:"Study Fuel",    portions:10, category:"misc" },
  { id:5, name:"Breakfast Starter",      desc:"Oats, bread, peanut butter, powdered milk",      price:3200, img:<FaBreadSlice />,   tag:"Morning Boost", portions:7,  category:"food" },
  { id:6, name:"Seminar Week Meal Prep", desc:"Pre-cooked stew, frozen veggies, pasta packs",   price:7800, img:<SoupIcon />,       tag:"Exam Season",   portions:14, category:"food" },
];
const SPENT_BY_CATEGORY: Partial<Record<CategoryId,number>> = { food:0, transport:0, books:0, health:0 };

// ── Under Construction ────────────────────────────────────────────
const UnderConstruction = ({ onBack }: { onBack:()=>void }) => (
  <Container>
    <ComingSoonBadge>COMING SOON</ComingSoonBadge>
    <IconWrapper><Construction size={80} color="rgb(36,172,242)" /></IconWrapper>
    <Title>We're Building Something Great!</Title>
    <Message>This feature is currently under construction. We're working hard to bring you an amazing experience. Check back soon!</Message>
    <BackButton onClick={onBack}><ArrowLeft size={20} />Go Back</BackButton>
  </Container>
);

// ── Animated Number ───────────────────────────────────────────────
function AnimatedNumber({ value, prefix="" }: { value:number; prefix?:string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if(value===0){setDisplay(0);return}
    const steps=40, inc=value/steps; let cur=0;
    const t=setInterval(()=>{ cur+=inc; if(cur>=value){setDisplay(value);clearInterval(t)}else setDisplay(Math.floor(cur)) },30);
    return ()=>clearInterval(t);
  },[value]);
  return <span>{prefix}{display.toLocaleString()}</span>;
}

// ── Donut Chart ───────────────────────────────────────────────────
function DonutChart({ data }: { data:ChartDatum[] }) {
  
  const total=data.reduce((s,d)=>s+d.value,0);
  if (total === 0) {
  return <div style={{ color: "#888", fontSize: 12 }}>No data</div>;
}
  let cum=0; const cx=60,cy=60,r=48,stroke=14,circ=2*Math.PI*r;
  const segs=data.map(d=>{ const pct=d.value/total,dash=pct*circ,gap=circ-dash,offset=circ-cum*circ; cum+=pct; return{...d,dash,gap,offset} });
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1a1a1a" strokeWidth={stroke} />
      {segs.map((s,i)=>(
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth={stroke}
          strokeDasharray={`${s.dash} ${s.gap}`} strokeDashoffset={s.offset}
          style={{transition:"stroke-dasharray .6s ease"}} transform={`rotate(-90 ${cx} ${cy})`} />
      ))}
      <text x={cx} y={cy-4}  textAnchor="middle" fill="white"          fontSize="9" fontWeight="700" fontFamily="Orbitron">SPENT</text>
      <text x={cx} y={cy+10} textAnchor="middle" fill="rgb(0,131,208)" fontSize="8" fontFamily="Orbitron">₦{(total/1000).toFixed(0)}k</text>
    </svg>
  );
}

// ── Normalise transaction ─────────────────────────────────────────
function normaliseTransaction(raw:any, index:number): Transaction {
  const desc = raw.description??raw.narration??raw.note??raw.remark??raw.title??raw.name??"Transaction";
  const amount = raw.amount!=null?Number(raw.amount):raw.credit!=null?Number(raw.credit):raw.debit!=null?-Number(raw.debit):0;
  let date:string = raw.date??raw.created_at??raw.createdAt??raw.transaction_date??"";
  if(date){ const p=new Date(date); if(!isNaN(p.getTime())) date=p.toLocaleDateString("en-NG",{month:"short",day:"numeric"}) }
  const type:Transaction["type"] = amount>=0?"deposit":"spend";
  const category = raw.category??raw.type??(amount>=0?"vault":"misc");
  return { id:raw.id??index, desc, amount, date, type, category };
}

// ── Deposit Screen ────────────────────────────────────────────────
function DepositScreen({
  accountNumber, bankName, vaultBalance, onBack, onRefresh, refreshing,
}: {
  accountNumber: string;
  bankName: string;
  vaultBalance: number;
  onBack: () => void;
  onRefresh: () => void;
  refreshing: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const copyAccount = () => {
    if (accountNumber && accountNumber !== "****") {
if (navigator?.clipboard) {
  navigator.clipboard.writeText(accountNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      };
    }
  };

  const accountReady = accountNumber && accountNumber !== "****";

  return (
    <div className="screen">
      {/* Top bar */}
      <div className="top-bar">
        <button className="btn-secondary" onClick={onBack}>← Back</button>
        <div className="logo" style={{ fontSize: "16px" }}>Fund Vault</div>
        <button
          onClick={onRefresh}
          style={{ background: "none", border: "none", cursor: "pointer", color: "RGB(0,131,208)", display: "flex", alignItems: "center", gap: 4, fontFamily: "Orbitron", fontSize: 10, fontWeight: 700 }}
        >
          <RefreshCw size={14} style={{ animation: refreshing ? `spin 1s linear infinite` : "none" }} />
          {refreshing ? "..." : "Refresh"}
        </button>
      </div>

      {/* Current balance pill */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 6 }}>Current Vault Balance</div>
        <div style={{ fontFamily: "Orbitron", fontSize: 32, fontWeight: 800, color: "white" }}>
          ₦{vaultBalance.toLocaleString()}
        </div>
      </div>

      {/* Virtual account card */}
      <div style={{
        background: "linear-gradient(135deg, RGB(0,131,208), rgb(0,90,160))",
        borderRadius: 24, padding: "28px 24px", marginBottom: 20, position: "relative", overflow: "hidden",
      }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,.06)" }} />
        <div style={{ position: "absolute", bottom: -20, left: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,.04)" }} />

        <div style={{ fontSize: 10, color: "rgba(255,255,255,.7)", textTransform: "uppercase", letterSpacing: 2, marginBottom: 20 }}>
          Your Dedicated Account
        </div>

        {/* Bank name */}
        <div style={{ fontSize: 11, color: "rgba(255,255,255,.75)", marginBottom: 6, letterSpacing: 0.5 }}>
          {accountReady ? bankName || "Wema Bank" : "Loading..."}
        </div>

        {/* Account number */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ fontFamily: "Orbitron", fontSize: 28, fontWeight: 800, color: "white", letterSpacing: 3 }}>
            {accountReady
              ? accountNumber.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3")
              : "—— ——— ———"}
          </div>
          {accountReady && (
            <button onClick={copyAccount} style={{
              background: copied ? "rgba(58,232,127,.25)" : "rgba(255,255,255,.15)",
              border: `1px solid ${copied ? "rgba(58,232,127,.5)" : "rgba(255,255,255,.25)"}`,
              borderRadius: 10, padding: "8px 12px", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6, transition: "all .2s",
              color: "white", fontFamily: "Orbitron", fontSize: 10, fontWeight: 700,
            }}>
              {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
        </div>

        {/* Account name */}
        <div style={{ fontSize: 10, color: "rgba(255,255,255,.6)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Account Name</div>
        <div style={{ fontFamily: "Orbitron", fontSize: 13, fontWeight: 700, color: "white" }}>
          {accountReady ? (bankName || "Nekstpei User") : "—"}
        </div>
      </div>

      {/* How to deposit steps */}
      <div style={{ background: "transparent", borderRadius: 20, padding: "20px", marginBottom: 16, boxShadow: "0 2px 8px rgba(0,0,0,.05)" }}>
        <div style={{ fontFamily: "Orbitron", fontSize: 12, fontWeight: 700, marginBottom: 16, color: "white" }}>
          How to Fund Your Vault
        </div>
        {[
          { step: "01", text: "Open your bank app or USSD", icon: "✅" },
          { step: "02", text: "Transfer any amount to the account number above", icon: "✅"},
          { step: "03", text: "Your vault balance updates automatically", icon: "✅" },
        ].map((s) => (
          <div key={s.step} style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: "rgba(0,131,208,.08)", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 18,
            }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: 9, color: "RGB(0,131,208)", fontWeight: 700, letterSpacing: 1, marginBottom: 2 }}>STEP {s.step}</div>
              <div style={{ fontSize: 12, color: "rgb(34,34,34)", fontWeight: 500, lineHeight: 1.4 }}>{s.text}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Info note */}
      <div style={{
        background: "rgba(58,232,127,.06)", border: "1px solid rgba(58,232,127,.2)",
        borderRadius: 14, padding: "12px 16px", display: "flex", gap: 10, alignItems: "flex-start",
      }}>
        <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
        <div style={{ fontSize: 10, color: "#555", lineHeight: 1.6 }}>
          This is a <strong>dedicated virtual account</strong> assigned only to you. Transfers reflect within minutes. Use the Refresh button above to update your balance after a transfer.
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────
export default function CampusPlanner() {
  const email    = localStorage.getItem("email");
  const navigate = useNavigate();

  const [accountNumber, setNumber]      = useState("****");
  const [bankName,      setName]        = useState("");
  const [screen,        setScreen]      = useState<Screen>("home");
  const [vaultBalance,  setVaultBalance]= useState<number>(0);
  const [budget,        setBudget]      = useState<BudgetMap>({ food:15000, transport:5000, books:3000, health:2000, savings:5000, misc:2000 });
  const [cart,          setCart]        = useState<CartItem[]>([]);
  const [depositAmt,    setDepositAmt]  = useState<string>("");
  const [depositDone,   setDepositDone] = useState<boolean>(false);
  const [planEditing,   setPlanEditing] = useState<boolean>(false);
  const [editBudget,    setEditBudget]  = useState<BudgetMap>({ ...budget });
  const [hidden,        setHidden]      = useState<boolean>(false);
  const [balRefreshing, setBalRefreshing] = useState<boolean>(false);
  const [showBudgetModal, setShowBudgetModal] = useState<boolean>(false);

  // Transactions state
  const [transactions,  setTransactions] = useState<Transaction[]>([]);
  const [txnLoading,    setTxnLoading]   = useState<boolean>(true);
  const [txnError,      setTxnError]     = useState<string|null>(null);
  const [txnRetry,      setTxnRetry]     = useState<number>(0);

  // ── Shared balance + account fetch ───────────────────────────
  const fetchBalance = async (showSpinner = false) => {
    if (showSpinner) setBalRefreshing(true);
    try {
      const req    = await fetch(`${import.meta.env.VITE_BACKEND_URL}/currentBalance/${email}`);
      const result = await req.json();
      setVaultBalance(result.Balance ?? 0);
      // Account details live on the same endpoint
      setNumber(result.data?.bank_account ?? result.account_number ?? "****");
      setName(result.data?.bank_name ?? "");
    } catch(e) {
      console.error("Failed to load balance:", e);
    } finally {
      if (showSpinner) setBalRefreshing(false);
    }
  };

  useEffect(() => { fetchBalance(); }, [email]);

  // ── Sync balance to DB ────────────────────────────────────────
  useEffect(() => {
 if (vaultBalance == null) return;
    const sync = async () => {
      try {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/updateBalance/${email}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ balance: vaultBalance }),
        });
      } catch(e) { console.error("Sync error:", e) }
    };
    sync();
  }, [vaultBalance]);

  // ── Fetch transactions ────────────────────────────────────────
  useEffect(() => {
    if (!email) return;
    let cancelled = false;
    const fetchTxns = async () => {
      setTxnLoading(true); setTxnError(null);
      try {
        const res  = await fetch(`${import.meta.env.VITE_BACKEND_URL}/transactions/${email}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const raw: any[] =
          Array.isArray(json)              ? json :
          Array.isArray(json.data)         ? json.data :
          Array.isArray(json.transactions) ? json.transactions : [];
        if (!cancelled) setTransactions(raw.map((r, i) => normaliseTransaction(r, i)));
      } catch(e:any) {
        if (!cancelled) setTxnError("No recent activity.");
      } finally {
        if (!cancelled) setTxnLoading(false);
      }
    };
    fetchTxns();
    return () => { cancelled = true };
  }, [email, txnRetry]);

  // ── Derived ───────────────────────────────────────────────────
  const totalBudgeted = Object.values(budget).reduce((a,b)=>a+(b??0),0);
  const totalSpent    = 0;
  const cartTotal     = cart.reduce((s,i)=>s+i.price*i.qty,0);

  const addToCart = (pkg: FoodPackage) => {
    setCart(prev => {
      const ex = prev.find(c=>c.id===pkg.id);
      if(ex) return prev.map(c=>c.id===pkg.id?{...c,qty:c.qty+1}:c);
      return [...prev, {...pkg, qty:1}];
    });
  };

  const savePlan = () => {
    const total = Object.values(editBudget).reduce((a,b)=>a+b,0);
    if(total<=vaultBalance){ setBudget({...editBudget}); setPlanEditing(false) }
  };

  const chartData: ChartDatum[] = CATEGORIES.map(c=>({ label:c.label, value:budget[c.id], color:c.color }));

  const navItems: { id:Screen; icon:React.ReactNode; label:string }[] = [
    { id:"home",   icon:<Home size={20}/>,         label:"Home"         },
    { id:"Coins",  icon:<Coins size={20}/>,        label:"Chain Wallet" },
    { id:"Budget", icon:<BookOpen size={20}/>,     label:"Budget"       },
    { id:"market", icon:<ShoppingCart size={20}/>, label:"Market"       },
    { id:"stats",  icon:<BarChart2 size={20}/>,    label:"Stats"        },
  ];

  const txnBg   = (type:Transaction["type"]) => type==="deposit"?"rgba(58,232,127,.1)":"rgba(232,118,58,.1)";
  const txnIcon = (type:Transaction["type"]) => type==="deposit"?"⬇️":"🛍️";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #F9F9F9; }
        @media (prefers-color-scheme: dark) { body { background: rgb(15,15,15); } }
        .app { font-family:'Orbitron',sans-serif; background:#F9F9F9; min-height:100svh; max-width:430px; margin:0 auto; color:rgb(34,34,34); position:relative; overflow-x:hidden; padding:20px; padding-bottom:100px; }
        @media (prefers-color-scheme:dark) { .app { background:rgb(15,15,15); color:white; } }
        .screen { min-height:100svh; }
        .top-bar { display:flex; justify-content:space-between; align-items:center; margin-bottom:28px; }
        .logo { font-family:'Orbitron',sans-serif; font-weight:800; font-size:18px; letter-spacing:1px; color:rgb(34,34,34); }
        @media (prefers-color-scheme:dark) { .logo { color:white; } }
        .logo span { color:RGB(0,131,208); }
        .avatar { width:44px; height:44px;  border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:18px; cursor:pointer; transition:all .3s; }
        .avatar:hover { transform:translateY(-2px); box-shadow:0 4px 12px rgba(0,131,208,.3); }
        .balance-card { background:linear-gradient(90deg,RGB(0,131,208)); border-radius:20px; padding:32px 24px; margin-bottom:24px; position:relative; overflow:hidden; animation:fadeIn .5s ease-in; }
        @media (prefers-color-scheme:dark) { .balance-card { background:black; } }
        @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .balance-label { font-size:12px; color:rgba(255,255,255,.85); text-transform:uppercase; letter-spacing:1.5px; font-weight:500; margin-bottom:8px; text-align:center; }
        .balance-amount { font-family:'Orbitron',sans-serif; font-size:36px; font-weight:700; color:white; display:flex; align-items:center; justify-content:center; gap:12px; margin-bottom:16px; }
        .eye-btn { background:rgba(255,255,255,.2); border:none; border-radius:50%; width:40px; height:40px; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all .3s; color:white; font-size:16px; }
        .eye-btn:hover { background:rgba(255,255,255,.3); transform:scale(1.1); }
        .quick-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin-bottom:28px; }
        .quick-btn { background:white; border:none; border-radius:16px; padding:14px 8px; display:flex; flex-direction:column; align-items:center; gap:8px; cursor:pointer; transition:all .3s; color:inherit; box-shadow:0 2px 8px rgba(0,0,0,.05); }
        .quick-btn:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(0,131,208,.15); }
        @media (prefers-color-scheme:dark) { .quick-btn { background:rgb(1,1,1); } }
        .quick-btn .qb-icon { font-size:22px; }
        .quick-btn .qb-label { font-size:9px; color:grey; font-weight:500; text-align:center; }
        .section-title { font-family:'Orbitron',sans-serif; font-size:14px; font-weight:600; color:rgb(34,34,34); margin-bottom:14px; display:flex; align-items:center; justify-content:space-between; gap:8px; }
        @media (prefers-color-scheme:dark) { .section-title { color:white; } }
        .section-title .see-all { font-size:11px; color:rgb(36,172,242); font-weight:500; cursor:pointer; }
        .package-scroll { display:flex; gap:12px; overflow-x:auto; padding-bottom:8px; scrollbar-width:none; margin-bottom:28px; }
        .package-scroll::-webkit-scrollbar { display:none; }
        .pkg-card { min-width:160px; background:white; border-radius:20px; padding:16px; cursor:pointer; transition:all .3s; flex-shrink:0; box-shadow:0 2px 8px rgba(0,0,0,.05); }
        .pkg-card:hover { transform:translateY(-3px); box-shadow:0 6px 20px rgba(0,131,208,.15); }
        @media (prefers-color-scheme:dark) { .pkg-card { background:rgb(1,1,1); } }
        .pkg-icon { font-size:32px; margin-bottom:10px; }
        .pkg-tag { font-size:9px; background:rgba(0,131,208,.1); color:RGB(0,131,208); border-radius:6px; padding:2px 6px; font-weight:700; letter-spacing:.5px; text-transform:uppercase; display:inline-block; margin-bottom:8px; }
        .pkg-name { font-family:'Orbitron',sans-serif; font-size:11px; font-weight:700; color:rgb(34,34,34); margin-bottom:4px; line-height:1.4; }
        @media (prefers-color-scheme:dark) { .pkg-name { color:white; } }
        .pkg-price { font-size:13px; font-weight:700; color:rgb(51,232,191); margin-top:8px; }
        .txn-item { display:flex; align-items:center; gap:12px; padding:12px 0; border-bottom:1px solid rgba(0,0,0,.05); }
        @media (prefers-color-scheme:dark) { .txn-item { border-bottom-color:rgba(255,255,255,.05); } }
        .txn-icon { width:40px; height:40px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; }
        .txn-info { flex:1; }
        .txn-desc { font-size:11px; font-weight:500; color:rgb(34,34,34); }
        @media (prefers-color-scheme:dark) { .txn-desc { color:rgba(255,255,255,.85); } }
        .txn-date { font-size:10px; color:grey; margin-top:2px; }
        .txn-amt { font-family:'Orbitron',sans-serif; font-size:13px; font-weight:700; }
        .txn-amt.positive { color:rgb(51,232,191); }
        .txn-amt.negative { color:RGB(0,131,208); }
        .txn-skeleton { display:flex; align-items:center; gap:12px; padding:12px 0; border-bottom:1px solid rgba(0,0,0,.04); }
        .skeleton { background:linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%); background-size:200% 100%; animation:shimmer 1.4s infinite; border-radius:8px; }
        @media (prefers-color-scheme:dark) { .skeleton { background:linear-gradient(90deg,#1c1c1c 25%,#242424 50%,#1c1c1c 75%); background-size:200% 100%; } }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .skel-icon { width:40px; height:40px; border-radius:12px; flex-shrink:0; }
        .skel-lines { flex:1; display:flex; flex-direction:column; gap:7px; }
        .skel-line { height:10px; border-radius:5px; }
        .skel-amt { width:58px; height:14px; border-radius:6px; }
        .txn-empty { text-align:center; padding:28px 0 16px; color:#aaa; font-size:11px; line-height:1.6; }
        .txn-empty-icon { font-size:34px; margin-bottom:8px; }
        .txn-retry { background:none; border:1px solid rgba(0,131,208,.35); border-radius:8px; padding:6px 16px; color:RGB(0,131,208); font-size:10px; font-family:'Orbitron',sans-serif; font-weight:600; cursor:pointer; margin-top:10px; }

        /* Empty state cards */
        .empty-budget-card { background:white; border-radius:20px; padding:18px; margin-bottom:12px; box-shadow:0 2px 8px rgba(0,0,0,.05); }
        @media (prefers-color-scheme:dark) { .empty-budget-card { background:rgb(1,1,1); } }
        .tip-card { background:white; border-radius:16px; padding:16px; display:flex; gap:12px; align-items:flex-start; box-shadow:0 2px 8px rgba(0,0,0,.05); margin-bottom:10px; transition:transform .2s; }
        .tip-card:hover { transform:translateY(-1px); }
        @media (prefers-color-scheme:dark) { .tip-card { background:rgb(1,1,1); } }

        .btn-primary { background:linear-gradient(135deg,RGB(0,131,208),rgb(36,172,242)); border:none; border-radius:14px; padding:14px 20px; color:white; font-family:'Orbitron',sans-serif; font-size:12px; font-weight:700; cursor:pointer; transition:all .3s; white-space:nowrap; letter-spacing:.5px; }
        .btn-primary:hover { opacity:.9; transform:translateY(-1px); box-shadow:0 4px 12px rgba(0,131,208,.3); }
        .btn-secondary { background:transparent; border:1px solid rgba(0,131,208,.3); border-radius:12px; padding:10px 18px; color:RGB(0,131,208); font-size:11px; font-weight:600; cursor:pointer; transition:all .3s; font-family:'Orbitron',sans-serif; }
        .btn-secondary:hover { background:rgba(0,131,208,.08); transform:translateY(-1px); }
        .market-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .market-card { background:white; border-radius:20px; padding:16px; cursor:pointer; transition:all .3s; box-shadow:0 2px 8px rgba(0,0,0,.05); }
        .market-card:hover { transform:translateY(-2px); }
        @media (prefers-color-scheme:dark) { .market-card { background:rgb(1,1,1); } }
        .add-btn { width:100%; background:rgba(0,131,208,.08); border:1px dashed rgba(0,131,208,.3); border-radius:10px; padding:8px; color:RGB(0,131,208); font-size:10px; font-weight:700; cursor:pointer; margin-top:10px; transition:all .2s; font-family:'Orbitron',sans-serif; }
        .cart-float { position:fixed; bottom:88px; left:50%; transform:translateX(-50%); background:linear-gradient(135deg,RGB(0,131,208),rgb(36,172,242)); border-radius:20px; padding:14px 28px; display:flex; align-items:center; gap:12px; cursor:pointer; box-shadow:0 8px 32px rgba(0,131,208,.4); z-index:50; animation:slideUp .3s ease; white-space:nowrap; }
        @keyframes slideUp { from{transform:translateX(-50%) translateY(20px);opacity:0} to{transform:translateX(-50%) translateY(0);opacity:1} }
        .cart-label { font-family:'Orbitron',sans-serif; font-size:12px; font-weight:700; color:white; }
        .stats-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:20px; }
        .stat-card { background:white; border-radius:18px; padding:18px; box-shadow:0 2px 8px rgba(0,0,0,.05); }
        @media (prefers-color-scheme:dark) { .stat-card { background:rgb(1,1,1); } }
        .stat-label { font-size:9px; color:grey; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px; }
        .stat-value { font-family:'Orbitron',sans-serif; font-size:22px; font-weight:700; }
        .stat-value.green { color:rgb(51,232,191); }
        .stat-value.blue  { color:RGB(0,131,208); }
        .stat-value.dark  { color:rgb(34,34,34); }
        @media (prefers-color-scheme:dark) { .stat-value.dark { color:white; } }
        .donut-section { background:white; border-radius:20px; padding:20px; margin-bottom:20px; display:flex; align-items:center; gap:20px; box-shadow:0 2px 8px rgba(0,0,0,.05); }
        @media (prefers-color-scheme:dark) { .donut-section { background:rgb(1,1,1); } }
        .legend-item { display:flex; align-items:center; gap:8px; margin-bottom:8px; }
        .legend-dot  { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
        .legend-label { font-size:10px; color:grey; }
        .legend-pct   { font-size:10px; color:rgb(34,34,34); font-weight:700; margin-left:auto; }
        @media (prefers-color-scheme:dark) { .legend-pct { color:white; } }
        .progress-row { background:white; border-radius:16px; padding:16px; margin-bottom:10px; box-shadow:0 2px 8px rgba(0,0,0,.05); }
        @media (prefers-color-scheme:dark) { .progress-row { background:rgb(1,1,1); } }
        .progress-header { display:flex; justify-content:space-between; margin-bottom:10px; align-items:center; }
        .progress-name { font-size:11px; font-weight:600; color:rgb(34,34,34); }
        @media (prefers-color-scheme:dark) { .progress-name { color:white; } }
        .progress-pct  { font-size:10px; color:grey; }
        .progress-bar-bg   { height:6px; background:rgba(0,0,0,.07); border-radius:3px; overflow:hidden; }
        @media (prefers-color-scheme:dark) { .progress-bar-bg { background:rgba(255,255,255,.07); } }
        .progress-bar-fill { height:100%; border-radius:3px; transition:width .8s ease; }
        .bottom-nav { position:fixed; bottom:0; left:50%; transform:translateX(-50%); width:100%; max-width:430px; background:white; border-top:1px solid rgba(0,0,0,.06); display:flex; justify-content:space-around; padding:10px 0 20px; z-index:100; }
        @media (prefers-color-scheme:dark) { .bottom-nav { background:rgb(15,15,15); border-top-color:rgba(255,255,255,.06); } }
        .nav-item { display:flex; flex-direction:column; align-items:center; gap:4px; cursor:pointer; padding:6px 12px; border-radius:12px; transition:all .2s; border:none; background:transparent; color:inherit; font-family:'Orbitron',sans-serif; }
        .nav-item .nav-icon { display:flex; align-items:center; justify-content:center; color:#aaa; transition:color .2s; }
        .nav-item.active .nav-icon { color:RGB(0,131,208); }
        .nav-item .nav-label { font-size:8px; color:grey; font-weight:500; }
        .nav-item.active .nav-label { color:RGB(0,131,208); }
        .nav-item.active { background:rgba(0,131,208,.08); }
        .tag-sdg { display:inline-flex; align-items:center; gap:4px; background:rgba(51,232,191,.1); border:1px solid rgba(51,232,191,.25); border-radius:8px; padding:3px 8px; font-size:9px; color:rgb(51,232,191); font-weight:700; letter-spacing:.5px; }
        .divider { height:1px; background:rgba(0,0,0,.06); margin:16px 0; }
        @media (prefers-color-scheme:dark) { .divider { background:rgba(255,255,255,.06); } }
      `}</style>

      <div className="app">

        {/* ── HOME ──────────────────────────────────────────────── */}
        {screen === "home" && (
          <div className="screen">
            <div className="top-bar">
              <HeaderIcon href="#/tools">
                <BsGear style={{ height:"20px", width:"20px" }} />
              </HeaderIcon>
              <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                <span className="tag-sdg">🌱 SDG 2</span>
                <div className="avatar"> <HeaderIcon><BsPerson /></HeaderIcon></div>
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
              {FOOD_PACKAGES.map(pkg => (
                <div className="pkg-card" key={pkg.id} onClick={() => setScreen("market")}>
                  <div className="pkg-icon">{pkg.img}</div>
                  <div className="pkg-tag">{pkg.tag}</div>
                  <div className="pkg-name">{pkg.name}</div>
                  <div className="pkg-price">₦{pkg.price.toLocaleString()}</div>
                </div>
              ))}
            </div>

            {/* ── Recent Activity ──────────────────────────────── */}
            <div className="section-title">
              Recent Activity
              {!txnLoading && transactions.length > 4 && (
                <span className="see-all">See all →</span>
              )}
            </div>

            {/* Loading skeletons */}
            {txnLoading && [1,2,3].map(n => (
              <div className="txn-skeleton" key={n}>
                <div className="skeleton skel-icon" />
                <div className="skel-lines">
                  <div className="skeleton skel-line" style={{ width:"58%" }} />
                  <div className="skeleton skel-line" style={{ width:"32%" }} />
                </div>
                <div className="skeleton skel-amt" />
              </div>
            ))}

            {/* Error */}
            {!txnLoading && txnError && (
              <div className="txn-empty">
                <div className="txn-empty-icon">⚠️</div>
                <div>{txnError}</div>
                <button className="txn-retry" onClick={() => setTxnRetry(n=>n+1)}>Retry</button>
              </div>
            )}

            {/* ── Empty state — shown when no transactions yet ── */}
            {!txnLoading && !txnError && transactions.length === 0 && (
              <>
                {/* Budget snapshot */}
                <div className="empty-budget-card">
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                    <div style={{ fontFamily:"Orbitron", fontSize:12, fontWeight:700 }}>Budget Snapshot</div>
                    <button onClick={() => setScreen("Budget")} style={{ background:"rgba(0,131,208,.1)", border:"none", borderRadius:8, padding:"4px 10px", color:"RGB(0,131,208)", fontFamily:"Orbitron", fontSize:9, fontWeight:700, cursor:"pointer" }}>
                      EDIT →
                    </button>
                  </div>
                  {CATEGORIES.slice(0,3).map(c => {
                    const val = (budget[c.id] ?? 0);
                    const pct = totalBudgeted > 0 ? Math.round((val / totalBudgeted) * 100) : 0;
                    return (
                    <div key={c.id} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                      <span style={{ fontSize:16 }}>{c.icon}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                          <span style={{ fontSize:10, fontWeight:600 }}>{c.label}</span>
                          <span style={{ fontFamily:"Orbitron", fontSize:10, fontWeight:700, color:c.color }}>₦{(val/1000).toFixed(0)}k</span>
                        </div>
                        <div style={{ height:4, background:"rgba(0,0,0,.07)", borderRadius:2, overflow:"hidden" }}>
                          <div style={{ height:"100%", borderRadius:2, background:c.color, width:`${pct}%`, transition:"width .6s" }} />
                        </div>
                      </div>
                    </div>
                    );
                  })}
                  <div style={{ borderTop:"1px solid rgba(0,0,0,.06)", marginTop:4, paddingTop:12, display:"flex", justifyContent:"space-between" }}>
                    <span style={{ fontSize:10, color:"#888" }}>Total planned</span>
                    <span style={{ fontFamily:"Orbitron", fontSize:11, fontWeight:800, color:"RGB(0,131,208)" }}>₦{(totalBudgeted ?? 0).toLocaleString()}</span>
                  </div>
                </div>

                {/* SDG impact projection */}
                <div style={{ background:"linear-gradient(135deg,rgba(58,232,127,.07),rgba(58,232,127,.02))", border:"1px solid rgba(58,232,127,.18)", borderRadius:20, padding:"16px 20px", marginBottom:12 }}>
                  <div style={{ fontFamily:"Orbitron", fontSize:11, fontWeight:700, color:"#3AE87F", marginBottom:12 }}>🌱 Your Plan Could Cover</div>
                  <div style={{ display:"flex", justifyContent:"space-around" }}>
                    {[
                      { icon:"🍽️", value: Math.floor((budget.food ?? 0) / 320),  label:"Meals" },
                      { icon:"📦", value: Math.floor((budget.food ?? 0) / 4500), label:"Packages" },
                      { icon:"📅", value: Math.floor((budget.food ?? 0) / 643),  label:"Days fed" },
                    ].map(item => (
                      <div key={item.label} style={{ textAlign:"center" }}>
                        <div style={{ fontSize:24, marginBottom:4 }}>{item.icon}</div>
                        <div style={{ fontFamily:"Orbitron", fontSize:18, fontWeight:800, color:"#3AE87F" }}>{item.value}</div>
                        <div style={{ fontSize:9, color:"#666", marginTop:2 }}>{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Finance tips */}
                <div className="section-title" style={{ marginTop:4 }}>Quick Tips</div>
                {[
                  { icon:"💡", tip:"Allocate food budget first — it's your most consistent spend.", color:"rgba(232,118,58,.08)", border:"rgba(232,118,58,.2)" },
                  { icon:"🏦", tip:"Set aside at least 10% of your income to savings every month.", color:"rgba(58,232,127,.08)", border:"rgba(58,232,127,.2)" },
                  { icon:"📊", tip:"Track spending weekly so small leaks don't become big holes.", color:"rgba(0,131,208,.08)", border:"rgba(0,131,208,.2)" },
                ].map((t,i) => (
                  <div key={i} className="tip-card" style={{ background:t.color, border:`1px solid ${t.border}`, borderRadius:14 }}>
                    <span style={{ fontSize:22, flexShrink:0 }}>{t.icon}</span>
                    <span style={{ fontSize:11, color:"rgb(34,34,34)", lineHeight:1.5 }}>{t.tip}</span>
                  </div>
                ))}

                {/* CTA */}
                <button className="btn-primary" style={{ width:"100%", marginTop:16 }} onClick={() => setScreen("deposits")}>
                  + Fund Your Vault to Get Started
                </button>
              </>
            )}

            {/* Live transaction rows */}
            {!txnLoading && !txnError && transactions.slice(0,4).map(t => (
              <div className="txn-item" key={t.id}>
                <div className="txn-icon" style={{ background:txnBg(t.type) }}>{txnIcon(t.type)}</div>
                <div className="txn-info">
                  <div className="txn-desc">{t.desc}</div>
                  <div className="txn-date">{t.date}</div>
                </div>
                <div className={`txn-amt ${t.amount>0?"positive":"negative"}`}>
                  {t.amount>0?"+":""}₦{Math.abs(t.amount).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── DEPOSITS ──────────────────────────────────────────── */}
        {screen === "deposits" && (
          <DepositScreen
            accountNumber={accountNumber}
            bankName={bankName}
            vaultBalance={vaultBalance}
            onBack={() => setScreen("home")}
            onRefresh={() => fetchBalance(true)}
            refreshing={balRefreshing}
          />
        )}

        {screen === "Coins" && <UnderConstruction onBack={() => setScreen("home")} />}

        {screen === "Budget" && (
          <div className="screen">
            <div className="top-bar">
              <button className="btn-secondary" onClick={()=>setScreen("home")}>← Back</button>
              <div className="logo" style={{fontSize:"16px"}}>Budget <span>Plan</span></div>
              <button className="btn-primary" style={{padding:"8px 14px",fontSize:"11px"}} onClick={()=>setShowBudgetModal(true)}>
                <Sliders size={12} style={{display:"inline",marginRight:4}} />Edit
              </button>
            </div>
 
            <div style={{background:"white",borderRadius:20,padding:"20px 24px",marginBottom:16,boxShadow:"0 2px 8px rgba(0,0,0,.05)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:11,color:"#555",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Total Budget</div>
                <div style={{fontFamily:"Orbitron",fontSize:28,fontWeight:800}}>₦{totalBudgeted.toLocaleString()}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:11,color:"#555",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Remaining</div>
                <div style={{fontFamily:"Orbitron",fontSize:28,fontWeight:800,color:"#3AE87F"}}>₦{(vaultBalance-totalSpent).toLocaleString()}</div>
              </div>
            </div>
 
            {CATEGORIES.map(cat=>{
              const val=budget[cat.id] ?? 0;
              const pct=Math.min((val/totalBudgeted)*100,100);
              return (
                <div className="plan-cat-item" key={cat.id}>
                  <span style={{fontSize:22}}>{cat.icon}</span>
                  <div style={{flex:1}}>
                    <div className="cat-name">{cat.label}</div>
                    <div className="cat-bar-wrap">
                      <div className="cat-bar" style={{width:`${pct}%`,background:cat.color}} />
                    </div>
                  </div>
                  <div className="cat-amt">₦{val.toLocaleString()}</div>
                </div>
              );
            })}
 
            <button className="btn-primary" style={{width:"100%",marginTop:16,display:"flex",alignItems:"center",justifyContent:"center",gap:8}} onClick={()=>setShowBudgetModal(true)}>
              <Sliders size={14}/> Adjust Budget
            </button>
          </div>
        )}

        {/* ── MARKET ────────────────────────────────────────────── */}
        {screen === "market" && (
          <div className="screen">
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <button className="btn-secondary" onClick={() => setScreen("home")}>Back</button>
              <div className="logo" style={{ fontSize:"16px" }}>Packages</div>
              <div style={{ width:60 }} />
            </div>
            <div className="market-grid">
              {FOOD_PACKAGES.map(pkg => (
                <div className="market-card" key={pkg.id}>
                  <div className="pkg-icon">{pkg.img}</div>
                  <div className="pkg-tag">{pkg.tag}</div>
                  <div className="pkg-name">{pkg.name}</div>
                  <div style={{ fontSize:"11px", color:"#555", marginTop:"4px", lineHeight:"1.4" }}>{pkg.desc}</div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"10px" }}>
                    <div className="pkg-price">₦{pkg.price.toLocaleString()}</div>
                    <span style={{ fontSize:"10px", color:"#555" }}>{pkg.portions} meals</span>
                  </div>
                  <button className="add-btn" onClick={() => addToCart(pkg)}>+ Add to Plan</button>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="cart-float">
                <span style={{ fontSize:"20px" }}>🛒</span>
                <div>
                  <div className="cart-label">{cart.reduce((s,c)=>s+c.qty,0)} items · ₦{cartTotal.toLocaleString()}</div>
                  <div style={{ fontSize:"10px", color:"rgba(255,255,255,.7)" }}>From your food budget</div>
                </div>
                <span style={{ color:"white", fontFamily:"Orbitron", fontWeight:700, cursor:"pointer" }}
                  onClick={() =>navigate("/checkout",{ state:{ cartTotal } })}>Pay →</span>
              </div>
            )}
          </div>
        )}

        {/* ── STATS ─────────────────────────────────────────────── */}
        {screen === "stats" && (
          <div className="screen">
            <div className="top-bar">
              <button className="btn-secondary" onClick={() => setScreen("home")}>← Back</button>
              <div className="logo" style={{ fontSize:"16px" }}>Analytics</div>
              <div style={{ width:60 }} />
            </div>
            <div className="stats-grid">
              <div className="stat-card"><div className="stat-label">Budgeted</div><div className="stat-value dark">₦{(totalBudgeted/1000).toFixed(0)}k</div></div>
              <div className="stat-card"><div className="stat-label">Spent</div><div className="stat-value blue">₦{(totalSpent/1000).toFixed(0)}k</div></div>
              <div className="stat-card"><div className="stat-label">Saved</div><div className="stat-value green">₦{((totalBudgeted-totalSpent)/1000).toFixed(0)}k</div></div>
              <div className="stat-card"><div className="stat-label">Save Rate</div><div className="stat-value green">{totalBudgeted > 0 ? Math.round(((totalBudgeted - totalSpent) / totalBudgeted) * 100): 0}%</div></div>
            </div>
            <div className="donut-section">
              <DonutChart data={chartData} />
              <div style={{ flex:1 }}>
                {CATEGORIES.map(c => (
                  <div className="legend-item" key={c.id}>
                    <div className="legend-dot" style={{ background:c.color }} />
                    <div className="legend-label">{c.label.split(" ")[0]}</div>
                    <div className="legend-pct">{Math.round((budget[c.id]/totalBudgeted)*100)}%</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="section-title">Category Breakdown</div>
            {CATEGORIES.map(c => {
              const spent=SPENT_BY_CATEGORY[c.id]??0;
             const base = budget[c.id] || 1;
             const pct = Math.min(Math.round((spent / base) * 100), 100);
              return (
                <div className="progress-row" key={c.id}>
                  <div className="progress-header">
                    <div className="progress-name">{c.icon} {c.label}</div>
                    <div className="progress-pct">₦{spent.toLocaleString()} / ₦{budget[c.id].toLocaleString()}</div>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width:`${pct}%`, background:pct>80?"#E85A5A":c.color }} />
                  </div>
                </div>
              );
            })}
            <div className="section-title" style={{ marginTop:"24px" }}>SDG 2 Impact</div>
            <div style={{ background:"linear-gradient(135deg,rgba(58,232,127,.05),rgba(58,232,127,.02))", border:"1px solid rgba(58,232,127,.15)", borderRadius:"20px", padding:"20px" }}>
              <div style={{ display:"flex", gap:"24px", justifyContent:"space-around" }}>
                {[{ icon:"🍽️",value:28,label:"Meals funded"},{icon:"📦",value:3,label:"Packages bought"},{icon:"💚",value:14,label:"Days covered"}].map(item => (
                  <div key={item.label} style={{ textAlign:"center" }}>
                    <div style={{ fontSize:"32px", marginBottom:"6px" }}>{item.icon}</div>
                    <div style={{ fontFamily:"Orbitron", fontSize:"22px", fontWeight:800, color:"#3AE87F" }}>{item.value}</div>
                    <div style={{ fontSize:"11px", color:"#555" }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── BOTTOM NAV ────────────────────────────────────────── */}
        <nav className="bottom-nav">
          {navItems.map(item => (
            <button key={item.id} className={`nav-item${screen===item.id?" active":""}`} onClick={() => setScreen(item.id)}>
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}