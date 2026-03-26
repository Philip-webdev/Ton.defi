import { useState, useEffect, useRef } from "react";
import {
  Home, BookOpen, ShoppingCart, BarChart2, Coins,
  ArrowDownIcon, PenSquareIcon, ChartCandlestickIcon,
  LeafyGreenIcon, SoupIcon, ArrowLeft,
  Copy, CheckCircle, RefreshCw, Sliders, Plus, Minus,
  TrendingUp, TrendingDown, Target, Zap, Bell, Edit3,
  Check, X, ChevronRight, Award, Calendar, DollarSign
} from "lucide-react";
import { BsCash, BsEyeSlash, BsGear, BsPerson } from "react-icons/bs";
import { FaBoxOpen, FaBreadSlice, FaEgg } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────
type CategoryId = "food" | "transport" | "books" | "health" | "savings" | "misc";
interface Category { id: CategoryId; label: string; icon: string; color: string; gradient: string }
interface FoodPackage { id: number; name: string; desc: string; price: number; img: any; tag: string; portions: number; category: string }
interface CartItem extends FoodPackage { qty: number }
interface Transaction { id: number; desc: string; amount: number; date: string; type: "spend" | "deposit"; category: string }
type BudgetMap = Record<CategoryId, number>;
type Screen = "home" | "Coins" | "Budget" | "market" | "stats" | "deposits" | "profile";

// ─── Static Data ─────────────────────────────────────────────────
const CATEGORIES: Category[] = [
  { id: "food",      label: "Food & Meals",    icon: "🍽️", color: "#F97316", gradient: "linear-gradient(135deg,#FED7AA,#FCA572)" },
  { id: "transport", label: "Transport",        icon: "🚌", color: "#3B82F6", gradient: "linear-gradient(135deg,#BFDBFE,#93C5FD)" },
  { id: "books",     label: "Books & Supplies", icon: "📚", color: "#8B5CF6", gradient: "linear-gradient(135deg,#DDD6FE,#C4B5FD)" },
  { id: "health",    label: "Health",           icon: "💊", color: "#EC4899", gradient: "linear-gradient(135deg,#FBCFE8,#F9A8D4)" },
  { id: "savings",   label: "Savings",          icon: "🏦", color: "#10B981", gradient: "linear-gradient(135deg,#A7F3D0,#6EE7B7)" },
  { id: "misc",      label: "Miscellaneous",    icon: "🎯", color: "#F59E0B", gradient: "linear-gradient(135deg,#FDE68A,#FCD34D)" },
];

const FOOD_PACKAGES: FoodPackage[] = [
  { id: 1, name: "Campus Essentials Box",  desc: "Rice, beans, garri, palm oil — weekly staples",   price: 4500, img: <FaBoxOpen />,      tag: "SDG 2",        portions: 7,  category: "food" },
  { id: 2, name: "Protein Power Pack",     desc: "Eggs, canned fish, groundnuts, soy milk",          price: 6200, img: <FaEgg />,          tag: "High Protein", portions: 14, category: "food" },
  { id: 3, name: "Veggie Fresh Bundle",    desc: "Tomatoes, peppers, onions, leafy greens",          price: 3800, img: <LeafyGreenIcon />, tag: "Fresh Daily",  portions: 5,  category: "food" },
  { id: 4, name: "Snack & Study Kit",      desc: "Biscuits, chin-chin, zobo drink, cashews",         price: 2500, img: "🍿",               tag: "Study Fuel",   portions: 10, category: "misc" },
  { id: 5, name: "Breakfast Starter",      desc: "Oats, bread, peanut butter, powdered milk",        price: 3200, img: <FaBreadSlice />,   tag: "Morning Boost",portions: 7,  category: "food" },
  { id: 6, name: "Seminar Meal Prep",      desc: "Pre-cooked stew, frozen veggies, pasta packs",     price: 7800, img: <SoupIcon />,       tag: "Exam Season",  portions: 14, category: "food" },
];

const BUDGET_TIPS = [
  { icon: "💡", tip: "Allocate food budget first — it's your most consistent spend.", accent: "#F97316" },
  { icon: "🏦", tip: "Set aside at least 10% of income to savings every month.", accent: "#10B981" },
  { icon: "📊", tip: "Track spending weekly so small leaks don't become big holes.", accent: "#3B82F6" },
  { icon: "🎯", tip: "Batch-cook on weekends to cut your food spend by up to 30%.", accent: "#8B5CF6" },
];

// ─── Helpers ──────────────────────────────────────────────────────
function normaliseTransaction(raw: any, index: number): Transaction {
  const desc = raw.description ?? raw.narration ?? raw.note ?? raw.remark ?? raw.title ?? raw.name ?? "Transaction";
  const amount = raw.amount != null ? Number(raw.amount) : raw.credit != null ? Number(raw.credit) : raw.debit != null ? -Number(raw.debit) : 0;
  let date: string = raw.date ?? raw.created_at ?? raw.createdAt ?? raw.transaction_date ?? "";
  if (date) { const p = new Date(date); if (!isNaN(p.getTime())) date = p.toLocaleDateString("en-NG", { month: "short", day: "numeric" }) }
  return { id: raw.id ?? index, desc, amount, date, type: amount >= 0 ? "deposit" : "spend", category: raw.category ?? raw.type ?? (amount >= 0 ? "vault" : "misc") };
}

// ─── Animated Number ──────────────────────────────────────────────
function AnimatedNumber({ value, prefix = "" }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (value === 0) { setDisplay(0); return; }
    const steps = 50, inc = value / steps; let cur = 0;
    const t = setInterval(() => { cur += inc; if (cur >= value) { setDisplay(value); clearInterval(t); } else setDisplay(Math.floor(cur)); }, 25);
    return () => clearInterval(t);
  }, [value]);
  return <span>{prefix}{display.toLocaleString()}</span>;
}

// ─── Donut Chart ─────────────────────────────────────────────────
function DonutChart({ data, size = 140 }: { data: { label: string; value: number; color: string }[]; size?: number }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  if (total === 0) return <div style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center", color: "#888", fontSize: 11 }}>No data</div>;
  const cx = size / 2, cy = size / 2, r = size * 0.36, stroke = size * 0.1, circ = 2 * Math.PI * r;
  let cum = 0;
  const segs = data.map(d => { const pct = d.value / total, dash = pct * circ, gap = circ - dash, offset = circ - cum * circ; cum += pct; return { ...d, dash, gap, offset }; });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
      {segs.map((s, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth={stroke}
          strokeDasharray={`${s.dash} ${s.gap}`} strokeDashoffset={s.offset}
          style={{ transition: "stroke-dasharray .8s cubic-bezier(.4,0,.2,1)" }} transform={`rotate(-90 ${cx} ${cy})`} />
      ))}
      <text x={cx} y={cy - 6} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize={size * 0.075} fontFamily="'Sora',sans-serif" fontWeight="500">SPENT</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="white" fontSize={size * 0.1} fontFamily="'Sora',sans-serif" fontWeight="700">₦{(total / 1000).toFixed(0)}k</text>
    </svg>
  );
}

// ─── Budget Edit Modal ────────────────────────────────────────────
function BudgetModal({ budget, onSave, onClose, vaultBalance }: {
  budget: BudgetMap; onSave: (b: BudgetMap) => void; onClose: () => void; vaultBalance: number;
}) {
  const [draft, setDraft] = useState<BudgetMap>({ ...budget });
  const total = Object.values(draft).reduce((a, b) => a + b, 0);
  const over = total > vaultBalance;

  const adjust = (id: CategoryId, delta: number) => {
    setDraft(prev => ({ ...prev, [id]: Math.max(0, (prev[id] ?? 0) + delta) }));
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "rgb(15,17,23)", borderRadius: "24px 24px 0 0", padding: "28px 24px 40px", width: "100%", maxWidth: 430, maxHeight: "80vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 17, fontWeight: 700, color: "white" }}>Adjust Budget</div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}><X size={16} /></button>
        </div>

        <div style={{ background: over ? "rgba(239,68,68,0.1)" : "rgba(16,185,129,0.08)", border: `1px solid ${over ? "rgba(239,68,68,0.3)" : "rgba(16,185,129,0.2)"}`, borderRadius: 14, padding: "12px 16px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginBottom: 2, textTransform: "uppercase", letterSpacing: 1 }}>Total Allocated</div>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 22, fontWeight: 800, color: over ? "#EF4444" : "#10B981" }}>₦{total.toLocaleString()}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginBottom: 2, textTransform: "uppercase", letterSpacing: 1 }}>Vault Balance</div>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 22, fontWeight: 800, color: "white" }}>₦{vaultBalance.toLocaleString()}</div>
          </div>
        </div>

        {CATEGORIES.map(cat => (
          <div key={cat.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: cat.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{cat.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.8)", marginBottom: 4 }}>{cat.label}</div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", background: cat.color, width: `${total > 0 ? Math.min((draft[cat.id] / total) * 100, 100) : 0}%`, transition: "width .4s", borderRadius: 2 }} />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button onClick={() => adjust(cat.id, -500)} style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}><Minus size={12} /></button>
              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 12, fontWeight: 700, color: "white", minWidth: 52, textAlign: "center" }}>₦{(draft[cat.id] / 1000).toFixed(1)}k</div>
              <button onClick={() => adjust(cat.id, 500)} style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}><Plus size={12} /></button>
            </div>
          </div>
        ))}

        <button disabled={over} onClick={() => { onSave(draft); onClose(); }} style={{ width: "100%", padding: "15px", background: over ? "rgba(255,255,255,0.08)" : "linear-gradient(135deg,#0083D0,#24ACF2)", border: "none", borderRadius: 14, fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 700, color: over ? "#666" : "white", cursor: over ? "not-allowed" : "pointer", transition: "all .2s", marginTop: 8 }}>
          {over ? "Total exceeds vault balance" : "Save Budget Plan"}
        </button>
      </div>
    </div>
  );
}

// ─── Profile Screen ───────────────────────────────────────────────
function ProfileScreen({ onBack }: { onBack: () => void }) {
  const email = localStorage.getItem("email") ?? "user@gmail.com";
  const storedName = localStorage.getItem("userName") ?? "";
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState(storedName || email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase()));
  const [tempName, setTempName] = useState(name);
  const [joined] = useState("March 2025");

  const saveName = () => { setName(tempName); localStorage.setItem("userName", tempName); setEditingName(false); };
  const initials = name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  const badges = [
    { icon: "🏆", label: "First Deposit", earned: true },
    { icon: "📊", label: "Budget Pro", earned: true },
    { icon: "🎯", label: "Goal Setter", earned: false },
    { icon: "🌱", label: "SDG Champion", earned: false },
  ];

  const stats = [
    { label: "Saved", value: "₦0", icon: <TrendingUp size={14} />, color: "#10B981" },
    { label: "Deposited", value: "₦0", icon: <BsCash size={14} />, color: "#08c938" },
    { label: "Packages", value: "0", icon: <Award size={14} />, color: "#8B5CF6" },
   
  ];

  return (
    <div className="screen" style={{ paddingBottom: 40 }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
        <button className="btn-ghost" style={{marginLeft: '-4px'}} onClick={onBack}><ArrowLeft size={18} /></button>
        <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 15, fontWeight: 700, color: "white", position:'absolute', left:'45%' }}>Profile</div>
        <div style={{ width: 36 }} />
      </div>

      {/* Hero card */}
      <div style={{ background: "transparent", borderRadius: 28, padding: "32px 24px 28px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ position: "absolute", bottom: -20, left: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, position: "relative" }}>
          <div style={{ width: 80, height: 80, borderRadius: 24, background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora',sans-serif", fontSize: 28, fontWeight: 800, color: "white", backdropFilter: "blur(10px)" }}>
            {initials}
          </div>

          {editingName ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input value={tempName} onChange={e => setTempName(e.target.value)} onKeyDown={e => e.key === "Enter" && saveName()}
                style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 10, padding: "8px 12px", color: "white", fontFamily: "'Sora',sans-serif", fontSize: 16, fontWeight: 700, textAlign: "center", outline: "none", width: 180 }} />
              <button onClick={saveName} style={{ background: "rgba(16,185,129,0.3)", border: "none", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#6EE7B7" }}><Check size={14} /></button>
              <button onClick={() => setEditingName(false)} style={{ background: "rgba(239,68,68,0.2)", border: "none", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#FCA5A5" }}><X size={14} /></button>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 22, fontWeight: 800, color: "white" }}>{name}</div>
              <button onClick={() => { setTempName(name); setEditingName(true); }} style={{ background: "rgba(255,255,255,0.12)", border: "none", borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.7)" }}><Edit3 size={12} /></button>
            </div>
          )}

          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", letterSpacing: 0.3 }}>{email}</div>
          {/* <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(16,185,129,0.2)", border: "1px solid rgba(16,185,129,0.35)", borderRadius: 20, padding: "4px 12px" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
          </div> */}
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: "rgb(20,22,30)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 18, padding: "16px 14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <span style={{ color: s.color }}>{s.icon}</span>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 0.8 }}>{s.label}</span>
            </div>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 16, fontWeight: 800, color: "white" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Badges */}
      {/* <div style={{ background: "rgb(20,22,30)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: 20, marginBottom: 16 }}>
        <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 700, color: "white", marginBottom: 16 }}>Achievements</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {badges.map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: b.earned ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)", border: `1px solid ${b.earned ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)"}`, borderRadius: 12 }}>
              <span style={{ fontSize: 22, opacity: b.earned ? 1 : 0.25 }}>{b.icon}</span>
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, color: b.earned ? "white" : "rgba(255,255,255,0.3)" }}>{b.label}</div>
                <div style={{ fontSize: 9, color: b.earned ? "#10B981" : "rgba(255,255,255,0.2)", marginTop: 2 }}>{b.earned ? "Earned" : "Locked"}</div>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* Account section */}
      {/* <div style={{ background: "rgb(20,22,30)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, overflow: "hidden", marginBottom: 16 }}>
        {[
          { icon: "🔔", label: "Notifications", sub: "Budget alerts & reminders" },
          { icon: "🔒", label: "Privacy & Security", sub: "PIN, biometrics" },
          { icon: "🎨", label: "Appearance", sub: "Theme & display" },
          { icon: "💬", label: "Help & Support", sub: "FAQs, contact us" },
        ].map((item, i, arr) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", cursor: "pointer" }}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "white" }}>{item.label}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{item.sub}</div>
            </div>
            <ChevronRight size={14} color="rgba(255,255,255,0.3)" />
          </div>
        ))}
      </div> */}

      {/* <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 16, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 700, color: "#EF4444" }}>Sign Out</span>
      </div> */}
    </div>
  );
}

// Deposit Screen 
function DepositScreen({ accountNumber, bankName, vaultBalance, onBack, onRefresh, refreshing }: {
  accountNumber: string; bankName: string; vaultBalance: number;
  onBack: () => void; onRefresh: () => void; refreshing: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const accountReady = accountNumber && accountNumber !== "****";

  const copyAccount = () => {
    if (accountReady && navigator?.clipboard) {
      navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="screen">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <button className="btn-ghost" onClick={onBack}><ArrowLeft size={18} /></button>
        <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 15, fontWeight: 700, color: "white" }}>Fund Vault</div>
        <button onClick={onRefresh} style={{ background: "none", border: "none", cursor: "pointer", color: "#24ACF2", display: "flex", alignItems: "center", gap: 4, fontFamily: "'Sora',sans-serif", fontSize: 11, fontWeight: 700 }}>
          <RefreshCw size={14} style={{ animation: refreshing ? "spin 1s linear infinite" : "none" }} />
          {refreshing ? "..." : "Refresh"}
        </button>
      </div>

      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>Current Vault Balance</div>
        <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 38, fontWeight: 800, color: "white" }}>₦{vaultBalance.toLocaleString()}</div>
      </div>

      <div style={{ background: "linear-gradient(135deg,rgb(0,95,165),rgb(0,60,110))", borderRadius: 24, padding: "28px 24px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: 2, marginBottom: 18 }}>Your Dedicated Account</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginBottom: 6 }}>{accountReady ? bankName || "Wema Bank" : "Loading..."}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 28, fontWeight: 800, color: "white", letterSpacing: 4 }}>
            {accountReady ? accountNumber.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3") : "—— ——— ———"}
          </div>
          {accountReady && (
            <button onClick={copyAccount} style={{ background: copied ? "rgba(16,185,129,0.25)" : "rgba(255,255,255,0.12)", border: `1px solid ${copied ? "rgba(16,185,129,0.4)" : "rgba(255,255,255,0.2)"}`, borderRadius: 10, padding: "8px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: "white", fontSize: 11, fontWeight: 700, fontFamily: "'Sora',sans-serif" }}>
              {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
        </div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Account Name</div>
        <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 700, color: "white" }}>{accountReady ? (bankName || "Nekstpei User") : "—"}</div>
      </div>

      <div style={{ borderRadius: 20, marginBottom: 16 }}>
        <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 700, marginBottom: 16, color: "white" }}>How to Fund Your Vault</div>
        {[
          { step: "01", text: "Open your bank app or USSD", icon: "📱" },
          { step: "02", text: "Transfer any amount to the account number above", icon: "💸" },
          { step: "03", text: "Your vault balance updates automatically", icon: "✅" },
        ].map(s => (
          <div key={s.step} style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 16 }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(0,131,208,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: 9, color: "#24ACF2", fontWeight: 700, letterSpacing: 1, marginBottom: 2 }}>STEP {s.step}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>{s.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.18)", borderRadius: 14, padding: "12px 16px", display: "flex", gap: 10, alignItems: "flex-start" }}>
        <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
          This is a <strong style={{ color: "rgba(255,255,255,0.8)" }}>dedicated virtual account</strong> assigned only to you. Transfers reflect within minutes. Use Refresh to update your balance.
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────
export default function CampusPlanner() {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const [accountNumber, setNumber] = useState("****");
  const [bankName, setName] = useState("");
  const [screen, setScreen] = useState<Screen>("home");
  const [vaultBalance, setVaultBalance] = useState<number>(0);
  const [budget, setBudget] = useState<BudgetMap>({ food: 15000, transport: 5000, books: 3000, health: 2000, savings: 5000, misc: 2000 });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hidden, setHidden] = useState(false);
  const [balRefreshing, setBalRefreshing] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [txnLoading, setTxnLoading] = useState(true);
  const [txnError, setTxnError] = useState<string | null>(null);
  const [txnRetry, setTxnRetry] = useState(0);
  const [activeFilter, setActiveFilter] = useState<"all" | "deposit" | "spend">("all");

  const fetchBalance = async (showSpinner = false) => {
    if (showSpinner) setBalRefreshing(true);
    try {
      const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/currentBalance/${email}`);
      const result = await req.json();
      setVaultBalance(result.Balance ?? 0);
      setNumber(result.data?.bank_account ?? result.account_number ?? "****");
      setName(result.data?.bank_name ?? "");
    } catch (e) { console.error("Failed to load balance:", e); }
    finally { if (showSpinner) setBalRefreshing(false); }
  };

  useEffect(() => { fetchBalance(); }, [email]);

  useEffect(() => {
    if (vaultBalance == null) return;
    const sync = async () => {
      try {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/updateBalance/${email}`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ balance: vaultBalance }),
        });
      } catch (e) { console.error("Sync error:", e); }
    };
    sync();
  }, [vaultBalance]);

  useEffect(() => {
    if (!email) return;
    let cancelled = false;
    const fetchTxns = async () => {
      setTxnLoading(true); setTxnError(null);
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/transactions/${email}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const raw: any[] = Array.isArray(json) ? json : Array.isArray(json.data) ? json.data : Array.isArray(json.transactions) ? json.transactions : [];
        if (!cancelled) setTransactions(raw.map((r, i) => normaliseTransaction(r, i)));
      } catch (e: any) {
        if (!cancelled) setTxnError("No recent activity.");
      } finally {
        if (!cancelled) setTxnLoading(false);
      }
    };
    fetchTxns();
    return () => { cancelled = true; };
  }, [email, txnRetry]);

  const totalBudgeted = Object.values(budget).reduce((a, b) => a + (b ?? 0), 0);
  const totalSpent = 0;
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = (pkg: FoodPackage) => {
    setCart(prev => {
      const ex = prev.find(c => c.id === pkg.id);
      if (ex) return prev.map(c => c.id === pkg.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...pkg, qty: 1 }];
    });
  };

  const filteredTxns = transactions.filter(t => activeFilter === "all" ? true : t.type === activeFilter);
  const chartData = CATEGORIES.map(c => ({ label: c.label, value: budget[c.id], color: c.color }));

  const navItems: { id: Screen; icon: React.ReactNode; label: string }[] = [
    { id: "home",   icon: <Home size={18} />,         label: "Home" },
    { id: "Coins",  icon: <Coins size={18} />,        label: "Wallet" },
    { id: "Budget", icon: <BookOpen size={18} />,     label: "Budget" },
    { id: "market", icon: <ShoppingCart size={18} />, label: "Market" },
    { id: "stats",  icon: <BarChart2 size={18} />,    label: "Stats" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: rgb(10,12,18) !important; }

        .app {
          font-family: 'Sora', sans-serif;
          background: rgb(10,12,18);
          min-height: 100svh;
          max-width: 430px;
          margin: 0 auto;
          color: white;
          position: relative;
          overflow-x: hidden;
          padding: 24px 20px 100px;
        }

        .screen { min-height: 100svh; }

        /* ── Buttons ── */
        .btn-ghost {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: white; transition: all .2s;
        }
        .btn-ghost:hover { background: rgba(255,255,255,0.12); }
        .btn-primary {
          background: linear-gradient(135deg,#0083D0,#24ACF2);
          border: none; border-radius: 14px;
          padding: 14px 22px; color: white;
          font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 700;
          cursor: pointer; transition: all .25s; letter-spacing: .3px;
        }
        .btn-primary:hover { opacity: .9; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,131,208,.3); }
        .btn-secondary {
          background: transparent;
          border: 1px solid rgba(0,131,208,.35);
          border-radius: 12px; padding: 9px 18px;
          color: #24ACF2; font-size: 12px; font-weight: 700;
          cursor: pointer; transition: all .2s; font-family: 'Sora', sans-serif;
        }
        .btn-secondary:hover { background: rgba(0,131,208,.08); }

        /* ── Balance card ── */
        .balance-card {
          background: linear-gradient(145deg, rgb(0,65,120), rgb(0,45,90));
          border-radius: 24px; padding: 28px 24px;
          margin-bottom: 20px; position: relative; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .balance-card::before {
          content: ''; position: absolute;
          top: -50%; right: -20%;
          width: 200px; height: 200px; border-radius: 50%;
          background: rgba(36,172,242,.08);
        }

        /* ── Quick grid ── */
        .quick-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; margin-bottom: 28px; }
        .quick-btn {
          background: rgb(18,21,30);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 18px; padding: 16px 8px;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          cursor: pointer; transition: all .25s; color: white;
        }
        .quick-btn:hover { transform: translateY(-2px); border-color: rgba(36,172,242,.3); background: rgb(20,25,38); }
        .quick-btn .qb-icon { font-size: 20px; color: #24ACF2; }
        .quick-btn .qb-label { font-size: 9px; color: rgba(255,255,255,.45); font-weight: 600; text-align: center; letter-spacing: .3px; }

        /* ── Section title ── */
        .section-title {
          font-family: 'Sora', sans-serif; font-size: 14px; font-weight: 700;
          color: white; margin-bottom: 14px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .see-all { font-size: 11px; color: #24ACF2; font-weight: 600; cursor: pointer; }

        /* ── Package scroll ── */
        .package-scroll { display: flex; gap: 12px; overflow-x: auto; padding-bottom: 8px; scrollbar-width: none; margin-bottom: 28px; }
        .package-scroll::-webkit-scrollbar { display: none; }
        .pkg-card {
          min-width: 155px; background: rgb(18,21,30);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px; padding: 16px; cursor: pointer;
          transition: all .25s; flex-shrink: 0;
        }
        .pkg-card:hover { transform: translateY(-3px); border-color: rgba(36,172,242,.25); }
        .pkg-icon { font-size: 28px; margin-bottom: 10px; }
        .pkg-tag { font-size: 9px; background: rgba(0,131,208,.12); color: #24ACF2; border-radius: 6px; padding: 3px 7px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase; display: inline-block; margin-bottom: 8px; }
        .pkg-name { font-size: 11px; font-weight: 700; color: white; margin-bottom: 4px; line-height: 1.4; }
        .pkg-price { font-size: 14px; font-weight: 800; color: #10B981; margin-top: 8px; }

        /* ── Transactions ── */
        .txn-item { display: flex; align-items: center; gap: 12px; padding: 13px 0; border-bottom: 1px solid rgba(255,255,255,.04); }
        .txn-icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
        .txn-info { flex: 1; }
        .txn-desc { font-size: 12px; font-weight: 600; color: rgba(255,255,255,.85); }
        .txn-date { font-size: 10px; color: rgba(255,255,255,.35); margin-top: 3px; }
        .txn-amt { font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 800; }
        .txn-amt.positive { color: #10B981; }
        .txn-amt.negative { color: #24ACF2; }
        .txn-skeleton { display: flex; align-items: center; gap: 12px; padding: 13px 0; border-bottom: 1px solid rgba(255,255,255,.04); }
        .skeleton { background: linear-gradient(90deg,rgba(255,255,255,.04) 25%,rgba(255,255,255,.08) 50%,rgba(255,255,255,.04) 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: 8px; }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .skel-icon { width: 40px; height: 40px; border-radius: 12px; flex-shrink: 0; }
        .skel-lines { flex: 1; display: flex; flex-direction: column; gap: 8px; }
        .skel-line { height: 10px; border-radius: 5px; }

        /* ── Market ── */
        .market-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .market-card { background: rgb(18,21,30); border: 1px solid rgba(255,255,255,.06); border-radius: 20px; padding: 16px; cursor: pointer; transition: all .25s; }
        .market-card:hover { transform: translateY(-2px); border-color: rgba(36,172,242,.2); }
        .add-btn { width: 100%; background: rgba(0,131,208,.08); border: 1px dashed rgba(0,131,208,.25); border-radius: 10px; padding: 8px; color: #24ACF2; font-size: 10px; font-weight: 700; cursor: pointer; margin-top: 10px; font-family: 'Sora', sans-serif; transition: all .2s; }
        .add-btn:hover { background: rgba(0,131,208,.14); }

        /* ── Budget plan ── */
        .plan-cat-item { display: flex; align-items: center; gap: 12px; background: rgb(18,21,30); border: 1px solid rgba(255,255,255,.05); border-radius: 18px; padding: 16px; margin-bottom: 10px; transition: all .2s; }
        .plan-cat-item:hover { border-color: rgba(255,255,255,.1); }
        .cat-name { font-size: 12px; font-weight: 600; color: white; margin-bottom: 6px; }
        .cat-bar-wrap { height: 5px; background: rgba(255,255,255,.06); border-radius: 3px; overflow: hidden; }
        .cat-bar { height: 100%; border-radius: 3px; transition: width .8s cubic-bezier(.4,0,.2,1); }
        .cat-amt { font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 800; color: white; flex-shrink: 0; min-width: 64px; text-align: right; }

        /* ── Stats ── */
        .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
        .stat-card { background: rgb(18,21,30); border: 1px solid rgba(255,255,255,.05); border-radius: 18px; padding: 18px; }
        .stat-label { font-size: 10px; color: rgba(255,255,255,.4); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
        .stat-value { font-family: 'Sora', sans-serif; font-size: 22px; font-weight: 800; }
        .donut-section { background: rgb(18,21,30); border: 1px solid rgba(255,255,255,.05); border-radius: 22px; padding: 20px; margin-bottom: 18px; display: flex; align-items: center; gap: 20px; }
        .legend-item { display: flex; align-items: center; gap: 8px; margin-bottom: 9px; }
        .legend-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
        .legend-label { font-size: 10px; color: rgba(255,255,255,.45); flex: 1; }
        .legend-pct { font-size: 10px; color: white; font-weight: 700; }
        .progress-row { background: rgb(18,21,30); border: 1px solid rgba(255,255,255,.05); border-radius: 18px; padding: 16px; margin-bottom: 10px; }
        .progress-header { display: flex; justify-content: space-between; margin-bottom: 10px; align-items: center; }
        .progress-name { font-size: 12px; font-weight: 600; color: white; }
        .progress-pct { font-size: 10px; color: rgba(255,255,255,.4); }
        .progress-bar-bg { height: 5px; background: rgba(255,255,255,.07); border-radius: 3px; overflow: hidden; }
        .progress-bar-fill { height: 100%; border-radius: 3px; transition: width .8s cubic-bezier(.4,0,.2,1); }

        /* ── Cart float ── */
        .cart-float { position: fixed; bottom: 92px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg,#0083D0,#24ACF2); border-radius: 20px; padding: 14px 24px; display: flex; align-items: center; gap: 14px; cursor: pointer; box-shadow: 0 10px 40px rgba(0,131,208,.45); z-index: 50; animation: slideUp .3s ease; white-space: nowrap; }
        @keyframes slideUp { from{transform:translateX(-50%) translateY(20px);opacity:0} to{transform:translateX(-50%) translateY(0);opacity:1} }
        .cart-label { font-family: 'Sora', sans-serif; font-size: 12px; font-weight: 700; color: white; }

        /* ── Bottom nav ── */
        .bottom-nav { position: fixed; bottom: 0; left: 50%; transform: translateX(-50%); width: 100%; max-width: 430px; background: rgb(12,14,22); border-top: 1px solid rgba(255,255,255,.06); display: flex; justify-content: space-around; padding: 10px 0 22px; z-index: 100; }
        .nav-item { display: flex; flex-direction: column; align-items: center; gap: 5px; cursor: pointer; padding: 7px 14px; border-radius: 14px; transition: all .2s; border: none; background: transparent; color: inherit; font-family: 'Sora', sans-serif; }
        .nav-item .nav-icon { color: rgba(255,255,255,.3); transition: color .2s; }
        .nav-item.active .nav-icon { color: #24ACF2; }
        .nav-item .nav-label { font-size: 9px; color: rgba(255,255,255,.3); font-weight: 600; letter-spacing: .3px; }
        .nav-item.active .nav-label { color: #24ACF2; }
        .nav-item.active { background: rgba(36,172,242,.08); }

        /* ── Misc ── */
        .divider { height: 1px; background: rgba(255,255,255,.06); margin: 16px 0; }
        .tag-sdg { display: inline-flex; align-items: center; gap: 4px; background: rgba(16,185,129,.12); border: 1px solid rgba(16,185,129,.25); border-radius: 8px; padding: 3px 9px; font-size: 9px; color: #6EE7B7; font-weight: 700; letter-spacing: .5px; }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .filter-chip { padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 600; border: 1px solid rgba(255,255,255,.08); background: transparent; color: rgba(255,255,255,.45); cursor: pointer; font-family: 'Sora', sans-serif; transition: all .2s; }
        .filter-chip.active { background: rgba(36,172,242,.12); border-color: rgba(36,172,242,.3); color: #24ACF2; }
        .sdg-impact { background: linear-gradient(135deg,rgba(16,185,129,.06),rgba(16,185,129,.02)); border: 1px solid rgba(16,185,129,.15); border-radius: 20px; padding: 20px; margin-bottom: 16px; }
        .tip-card { background: rgb(18,21,30); border: 1px solid rgba(255,255,255,.05); border-radius: 14px; padding: 14px 16px; display: flex; gap: 12px; align-items: flex-start; margin-bottom: 10px; transition: transform .2s; }
        .tip-card:hover { transform: translateY(-1px); }
      `}</style>

      <div className="app">
        {screen === "home" && (
          <div className="screen">
            {/* Top bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <button className="btn-ghost"   style={{ marginLeft: "-4px" }} onClick={() => window.location.href = '#/tools'}>
                <BsGear style={{width: 18, height: 18 }} />
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="tag-sdg">♻️</span>
                <button className="btn-ghost" onClick={() => setScreen("profile")}>
                  <BsPerson style={{ width: 18, height: 18 }} />
                </button>
              </div>
            </div>

            {/* Balance card */}
            <div className="balance-card">
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.55)", textTransform: "uppercase", letterSpacing: 2, marginBottom: 10, textAlign: "center" }}>Vault Balance</div>
              <div style={{display: "flex", justifySelf:'center', gap:18, fontSize: 40, fontWeight: 800, color: "white", marginBottom: 18 }}>
                {hidden ? "••••••" : <AnimatedNumber value={vaultBalance} prefix="₦" />}
                <button onClick={() => setHidden(!hidden)} style={{ background: "rgba(255,255,255,.12)", border: "none", borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", marginLeft:'-2px', cursor: "pointer", color: "white", fontSize: 16 }}>
                  {hidden ? "👁" : <BsEyeSlash />}
                </button>
              </div>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", marginBottom: 4 }}>BUDGETED</div>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 700, color: "#24ACF2" }}>₦{(totalBudgeted / 1000).toFixed(0)}k</div>
                </div>
                <div style={{ width: 1, background: "rgba(255,255,255,.1)" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", marginBottom: 4 }}>SPENT</div>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 700, color: "#F97316" }}>₦{(totalSpent / 1000).toFixed(0)}k</div>
                </div>
                <div style={{ width: 1, background: "rgba(255,255,255,.1)" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", marginBottom: 4 }}>SAVED</div>
                  <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 700, color: "#10B981" }}>₦{((vaultBalance - totalSpent) / 1000).toFixed(0)}k</div>
                </div>
              </div>
            </div>

            {/* Quick actions */}
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
                <span className="qb-label">Stats</span>
              </button>
            </div>

            {/* Food packages */}
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

            {/* Recent activity */}
            <div className="section-title">
              Recent Activity
              {!txnLoading && transactions.length > 0 && (
                <div style={{ display: "flex", gap: 6 }}>
                  {(["all", "deposit", "spend"] as const).map(f => (
                    <button key={f} className={`filter-chip ${activeFilter === f ? "active" : ""}`} onClick={() => setActiveFilter(f)}>
                      {f === "all" ? "All" : f === "deposit" ? "In" : "Out"}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {txnLoading && [1, 2, 3].map(n => (
              <div className="txn-skeleton" key={n}>
                <div className="skeleton skel-icon" />
                <div className="skel-lines">
                  <div className="skeleton skel-line" style={{ width: "58%" }} />
                  <div className="skeleton skel-line" style={{ width: "32%" }} />
                </div>
                <div className="skeleton" style={{ width: 58, height: 14, borderRadius: 6 }} />
              </div>
            ))}

            {!txnLoading && txnError && (
              <div style={{ textAlign: "center", padding: "28px 0", color: "rgba(255,255,255,.4)", fontSize: 12 }}>
                <div style={{ fontSize: 34, marginBottom: 8 }}>⚠️</div>
                <div>{txnError}</div>
                <button style={{ background: "none", border: "1px solid rgba(36,172,242,.35)", borderRadius: 8, padding: "6px 16px", color: "#24ACF2", fontSize: 10, fontFamily: "'Sora',sans-serif", fontWeight: 700, cursor: "pointer", marginTop: 10 }} onClick={() => setTxnRetry(n => n + 1)}>Retry</button>
              </div>
            )}

            {!txnLoading && !txnError && transactions.length === 0 && (
              <>
                {/* Budget snapshot */}
                <div style={{ background: "rgb(18,21,30)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 20, padding: 18, marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>Budget Snapshot</div>
                    <button onClick={() => setShowBudgetModal(true)} style={{ background: "rgba(0,131,208,.1)", border: "none", borderRadius: 8, padding: "4px 10px", color: "#24ACF2", fontFamily: "'Sora',sans-serif", fontSize: 9, fontWeight: 700, cursor: "pointer" }}>EDIT →</button>
                  </div>
                  {CATEGORIES.slice(0, 3).map(c => {
                    const val = budget[c.id] ?? 0;
                    const pct = totalBudgeted > 0 ? Math.round((val / totalBudgeted) * 100) : 0;
                    return (
                      <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                        <span style={{ fontSize: 16 }}>{c.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                            <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,.7)" }}>{c.label}</span>
                            <span style={{ fontSize: 11, fontWeight: 800, color: c.color }}>₦{(val / 1000).toFixed(0)}k</span>
                          </div>
                          <div style={{ height: 4, background: "rgba(255,255,255,.06)", borderRadius: 2, overflow: "hidden" }}>
                            <div style={{ height: "100%", borderRadius: 2, background: c.color, width: `${pct}%`, transition: "width .6s" }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", marginTop: 4, paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>Total planned</span>
                    <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 13, fontWeight: 800, color: "#24ACF2" }}>₦{(totalBudgeted ?? 0).toLocaleString()}</span>
                  </div>
                </div>

                {/* SDG impact */}
                <div className="sdg-impact">
                  <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 12, fontWeight: 700, color: "#6EE7B7", marginBottom: 14 }}>🌱 Your Plan Could Cover</div>
                  <div style={{ display: "flex", justifyContent: "space-around" }}>
                    {[
                      { icon: "🍽️", value: Math.floor((budget.food ?? 0) / 320), label: "Meals" },
                      { icon: "📦", value: Math.floor((budget.food ?? 0) / 4500), label: "Packages" },
                      { icon: "📅", value: Math.floor((budget.food ?? 0) / 643), label: "Days fed" },
                    ].map(item => (
                      <div key={item.label} style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 26, marginBottom: 6 }}>{item.icon}</div>
                        <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 20, fontWeight: 800, color: "#10B981" }}>{item.value}</div>
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", marginTop: 3 }}>{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                <div className="section-title" style={{ marginTop: 4 }}>Quick Tips</div>
                {BUDGET_TIPS.map((t, i) => (
                  <div key={i} className="tip-card" style={{ borderLeft: `3px solid ${t.accent}` }}>
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{t.icon}</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,.65)", lineHeight: 1.6 }}>{t.tip}</span>
                  </div>
                ))}

                <button className="btn-primary" style={{ width: "100%", marginTop: 18 }} onClick={() => setScreen("deposits")}>
                  + Fund Your Vault to Get Started
                </button>
              </>
            )}

            {!txnLoading && !txnError && filteredTxns.slice(0, 5).map(t => (
              <div className="txn-item" key={t.id}>
                <div className="txn-icon" style={{ background: t.type === "deposit" ? "rgba(16,185,129,.1)" : "rgba(249,115,22,.1)" }}>{t.type === "deposit" ? "⬇️" : "🛍️"}</div>
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

        {/* ── DEPOSITS ─────────────────────────────────────────── */}
        {screen === "deposits" && (
          <DepositScreen accountNumber={accountNumber} bankName={bankName} vaultBalance={vaultBalance}
            onBack={() => setScreen("home")} onRefresh={() => fetchBalance(true)} refreshing={balRefreshing} />
        )}

        {/* ── CHAIN WALLET (placeholder) ───────────────────────── */}
        {screen === "Coins" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", textAlign: "center" }}>
            <div style={{ fontSize: 72, marginBottom: 24 }}>⛓️</div>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 22, fontWeight: 800, color: "#24ACF2", marginBottom: 12 }}>Coming Soon</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,.45)", maxWidth: 280, lineHeight: 1.7, marginBottom: 28 }}>Chain wallet integration is on the way. Stay tuned for crypto & DeFi features.</div>
            <button className="btn-secondary" onClick={() => setScreen("home")}>← Go Back</button>
          </div>
        )}

        {/* ── BUDGET ───────────────────────────────────────────── */}
        {screen === "Budget" && (
          <div className="screen">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <button className="btn-ghost" onClick={() => setScreen("home")}><ArrowLeft size={18} /></button>
              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 15, fontWeight: 700 }}>Budget Plan</div>
              <button className="btn-primary" style={{ padding: "8px 14px", fontSize: 11 }} onClick={() => setShowBudgetModal(true)}>
                <Sliders size={12} style={{ display: "inline", marginRight: 5 }} />Edit
              </button>
            </div>

            <div style={{ background: "rgb(18,21,30)", border: "1px solid rgba(255,255,255,.05)", borderRadius: 22, padding: "20px 22px", marginBottom: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Total Budget</div>
                <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 28, fontWeight: 800 }}>₦{totalBudgeted.toLocaleString()}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Remaining</div>
                <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 28, fontWeight: 800, color: "#10B981" }}>₦{(vaultBalance - totalSpent).toLocaleString()}</div>
              </div>
            </div>

            {CATEGORIES.map(cat => {
              const val = budget[cat.id] ?? 0;
              const pct = Math.min((val / totalBudgeted) * 100, 100);
              return (
                <div className="plan-cat-item" key={cat.id}>
                  <div style={{ width: 42, height: 42, borderRadius: 13, background: cat.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{cat.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div className="cat-name">{cat.label}</div>
                    <div className="cat-bar-wrap">
                      <div className="cat-bar" style={{ width: `${pct}%`, background: cat.color }} />
                    </div>
                  </div>
                  <div className="cat-amt">₦{val.toLocaleString()}</div>
                </div>
              );
            })}

            <button className="btn-primary" style={{ width: "100%", marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }} onClick={() => setShowBudgetModal(true)}>
              <Sliders size={14} /> Adjust Budget
            </button>
          </div>
        )}

        {/* ── MARKET ───────────────────────────────────────────── */}
        {screen === "market" && (
          <div className="screen">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
              <button className="btn-ghost" style={{marginLeft:'-4px'}} onClick={() => setScreen("home")}><ArrowLeft size={18} /></button>
              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 15, fontWeight: 700 , position:'absolute', left:'38%' }}>Food Packages</div>
              <div style={{ width: 38 }} />
            </div>
            <div className="market-grid">
              {FOOD_PACKAGES.map(pkg => (
                <div className="market-card" key={pkg.id}>
                  <div className="pkg-icon">{pkg.img}</div>
                  <div className="pkg-tag">{pkg.tag}</div>
                  <div className="pkg-name">{pkg.name}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.45)", marginTop: 4, lineHeight: 1.5 }}>{pkg.desc}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                    <div className="pkg-price">₦{pkg.price.toLocaleString()}</div>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,.35)" }}>{pkg.portions} meals</span>
                  </div>
                  <button className="add-btn" onClick={() => addToCart(pkg)}>+ Add to Plan</button>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="cart-float">
                <span style={{ fontSize: 20 }}>🛒</span>
                <div>
                  <div className="cart-label">{cart.reduce((s, c) => s + c.qty, 0)} items · ₦{cartTotal.toLocaleString()}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,.65)" }}>From your food budget</div>
                </div>
                <span style={{ color: "white", fontFamily: "'Sora',sans-serif", fontWeight: 700, cursor: "pointer" }}
                  onClick={() => navigate("/checkout", { state: { cartTotal } })}>Pay →</span>
              </div>
            )}
          </div>
        )}

        {/* ── STATS ────────────────────────────────────────────── */}
        {screen === "stats" && (
          <div className="screen">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <button className="btn-ghost" style={{marginLeft:'-4px'}} onClick={() => setScreen("home")}><ArrowLeft size={18} /></button>
              <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 15, fontWeight: 700 , position:'absolute', left:'40%' }}>Analytics</div>
              <div style={{ width: 38 }} />
            </div>

            <div className="stats-grid">
              <div className="stat-card"><div className="stat-label">Budgeted</div><div className="stat-value" style={{ color: "white" }}>₦{(totalBudgeted / 1000).toFixed(0)}k</div></div>
              <div className="stat-card"><div className="stat-label">Spent</div><div className="stat-value" style={{ color: "#24ACF2" }}>₦{(totalSpent / 1000).toFixed(0)}k</div></div>
              <div className="stat-card"><div className="stat-label">Saved</div><div className="stat-value" style={{ color: "#10B981" }}>₦{((totalBudgeted - totalSpent) / 1000).toFixed(0)}k</div></div>
              <div className="stat-card"><div className="stat-label">Save Rate</div><div className="stat-value" style={{ color: "#10B981" }}>{totalBudgeted > 0 ? Math.round(((totalBudgeted - totalSpent) / totalBudgeted) * 100) : 0}%</div></div>
            </div>

            <div className="donut-section">
              <DonutChart data={chartData} size={130} />
              <div style={{ flex: 1 }}>
                {CATEGORIES.map(c => (
                  <div className="legend-item" key={c.id}>
                    <div className="legend-dot" style={{ background: c.color }} />
                    <div className="legend-label">{c.label.split(" ")[0]}</div>
                    <div className="legend-pct">{Math.round((budget[c.id] / totalBudgeted) * 100)}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="section-title">Category Breakdown</div>
            {CATEGORIES.map(c => {
              const spent = 0;
              const base = budget[c.id] || 1;
              const pct = Math.min(Math.round((spent / base) * 100), 100);
              return (
                <div className="progress-row" key={c.id}>
                  <div className="progress-header">
                    <div className="progress-name">{c.icon} {c.label}</div>
                    <div className="progress-pct">₦{spent.toLocaleString()} / ₦{budget[c.id].toLocaleString()}</div>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${pct}%`, background: pct > 80 ? "#EF4444" : c.color }} />
                  </div>
                </div>
              );
            })}

            <div className="section-title" style={{ marginTop: 24 }}>SDG 2 Impact</div>
            <div className="sdg-impact">
              <div style={{ display: "flex", gap: 24, justifyContent: "space-around" }}>
                {[{ icon: "🍽️", value: 28, label: "Meals funded" }, { icon: "📦", value: 3, label: "Packages bought" }, { icon: "💚", value: 14, label: "Days covered" }].map(item => (
                  <div key={item.label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 30, marginBottom: 6 }}>{item.icon}</div>
                    <div style={{ fontFamily: "'Sora',sans-serif", fontSize: 22, fontWeight: 800, color: "#10B981" }}>{item.value}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,.45)" }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── PROFILE ──────────────────────────────────────────── */}
        {screen === "profile" && <ProfileScreen onBack={() => setScreen("home")} />}

        {/* ── BOTTOM NAV ───────────────────────────────────────── */}
        {screen !== "profile" && (
          <nav className="bottom-nav">
            {navItems.map(item => (
              <button key={item.id} className={`nav-item${screen === item.id ? " active" : ""}`} onClick={() => setScreen(item.id)}>
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            ))}
          </nav>
        )}
      </div>

      {/* Budget modal */}
      {showBudgetModal && (
        <BudgetModal budget={budget} vaultBalance={vaultBalance}
          onSave={(b) => setBudget(b)} onClose={() => setShowBudgetModal(false)} />
      )}
    </>
  );
}