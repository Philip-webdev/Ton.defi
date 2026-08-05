import { useState, useEffect } from "react";
import {
  ArrowLeft, ArrowUpRight, ArrowDownLeft, Plus, Wallet,
  Receipt, Clock, Filter, ChevronRight, Check, X,
  CreditCard, Banknote, Smartphone, Download, Eye, EyeOff,
  TrendingUp, TrendingDown, ShoppingCart, Send, Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { fetchFoodWallet, fetchFoodTransactions, topUpFoodWallet } from "../services/api";

// ─── Types ────────────────────────────────────────────────────────
type TransactionType = "topup" | "send" | "receive" | "redemption" | "refund";

interface Transaction {
  id: string;
  _id?: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
  time: string;
  status: "completed" | "pending" | "failed";
  reference?: string;
  vendor?: string;
  recipient?: string;
  createdAt?: string;
}

interface WalletData {
  balance: number;
  totalTopups: number;
  totalSpent: number;
  totalSent: number;
  totalReceived: number;
}

const TOPUP_METHODS = [
  { id: "card", label: "Debit Card", icon: CreditCard, desc: "Visa, Mastercard" },
  { id: "bank", label: "Bank Transfer", icon: Banknote, desc: "All banks" },
  { id: "ussd", label: "USSD", icon: Smartphone, desc: "*737# etc" },
];

// ─── Helpers ──────────────────────────────────────────────────────
const formatNaira = (n: number) => `\u20A6${n.toLocaleString()}`;

const txIcon: Record<TransactionType, typeof ArrowUpRight> = {
  topup: ArrowDownLeft,
  send: ArrowUpRight,
  receive: ArrowDownLeft,
  redemption: ShoppingCart,
  refund: ArrowDownLeft,
};

const txColor = (type: TransactionType, accent: string, success: string, error: string) => {
  if (type === "topup" || type === "receive" || type === "refund") return success;
  if (type === "send") return accent;
  return error;
};

// ─── Main Component ───────────────────────────────────────────────
export default function FoodWallet() {
  const { colors } = useTheme();
  const navigate = useNavigate();

  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "topup" | "send" | "receive" | "redemption">("all");
  const [showTopup, setShowTopup] = useState(false);
  const [topupAmount, setTopupAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [wallet, setWallet] = useState<WalletData>({ balance: 0, totalTopups: 0, totalSpent: 0, totalSent: 0, totalReceived: 0 });
  const [loading, setLoading] = useState(true);
  const [topping, setTopping] = useState(false);

  const email = localStorage.getItem("email") || "";

  useEffect(() => {
    loadData();
  }, [email]);

  const loadData = async () => {
    if (!email) {
      setLoading(false);
      return;
    }
    try {
      const [walletData, txData] = await Promise.all([
        fetchFoodWallet(email),
        fetchFoodTransactions(email),
      ]);
      setWallet(walletData);
      setTransactions(Array.isArray(txData) ? txData : []);
    } catch (e) {
      console.error("Failed to load wallet data:", e);
    }
    setLoading(false);
  };

  const handleTopUp = async () => {
    const amount = Number(topupAmount);
    if (!amount || amount < 100 || !email) return;
    setTopping(true);
    try {
      const result = await topUpFoodWallet(email, amount, selectedMethod);
      if (result.wallet) {
        setWallet(result.wallet);
      }
      await loadData();
      setShowTopup(false);
      setTopupAmount("");
    } catch (e) {
      console.error("Top-up failed:", e);
    }
    setTopping(false);
  };

  const balance = wallet.balance;
  const filteredTx = activeTab === "all"
    ? transactions
    : transactions.filter(tx => tx.type === activeTab);
  const totalSpent = wallet.totalSpent + wallet.totalSent;
  const totalTopup = wallet.totalTopups;

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .wallet-shell {
          font-family: 'Sora', sans-serif;
          background: ${colors.bg};
          min-height: 100svh;
          max-width: 430px;
          margin: 0 auto;
          color: ${colors.text};
          padding: 0 20px 100px;
        }
        .wallet-anim { animation: fadeIn .35s ease both; }
        .balance-card {
          background: linear-gradient(135deg, ${colors.accent}18, ${colors.accent}08);
          border: 1px solid ${colors.accent}25;
          border-radius: 24px;
          padding: 28px 24px;
          position: relative;
          overflow: hidden;
        }
        .balance-card::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -30%;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: ${colors.accent}08;
        }
        .topup-sheet {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 430px;
          background: ${colors.surface};
          border-radius: 24px 24px 0 0;
          border-top: 1px solid ${colors.border};
          padding: 24px 20px max(24px, env(safe-area-inset-bottom));
          z-index: 200;
          animation: slideUp .3s ease;
        }
        .topup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 199;
        }
        .amount-input {
          width: 100%;
          background: ${colors.inputBg};
          border: 1px solid ${colors.border};
          border-radius: 16px;
          padding: 16px 18px;
          font-size: 28px;
          font-weight: 700;
          color: ${colors.text};
          font-family: 'Sora', sans-serif;
          outline: none;
          text-align: center;
        }
        .amount-input:focus { border-color: ${colors.accent}; }
        .amount-input::placeholder { color: ${colors.textMuted}; }
        .method-btn {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 18px;
          border-radius: 16px;
          border: 1px solid ${colors.border};
          background: ${colors.surface};
          cursor: pointer;
          transition: all .2s;
          width: 100%;
          text-align: left;
          color: ${colors.text};
          font-family: 'Sora', sans-serif;
        }
        .method-btn.selected {
          border-color: ${colors.accent};
          background: ${colors.accentSoft};
        }
        .tx-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 0;
          border-bottom: 1px solid ${colors.border};
          cursor: pointer;
          transition: opacity .2s;
        }
        .tx-row:last-child { border-bottom: none; }
        .tx-row:active { opacity: 0.7; }
        .pill-filter {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 7px 14px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          border: 1px solid ${colors.border};
          background: ${colors.surface};
          color: ${colors.textMuted};
          cursor: pointer;
          transition: all .2s;
          white-space: nowrap;
          font-family: 'Sora', sans-serif;
        }
        .pill-filter.active {
          background: ${colors.accent};
          color: #0A0A0A;
          border-color: ${colors.accent};
        }
        .pill-scroll {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          scrollbar-width: none;
          padding: 4px 0;
        }
        .pill-scroll::-webkit-scrollbar { display: none; }
        .receipt-sheet {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 430px;
          background: ${colors.surface};
          border-radius: 24px 24px 0 0;
          border-top: 1px solid ${colors.border};
          padding: 24px 20px max(32px, env(safe-area-inset-bottom));
          z-index: 200;
          animation: slideUp .3s ease;
          max-height: 80vh;
          overflow-y: auto;
        }
        .stat-card {
          flex: 1;
          background: ${colors.surface};
          border: 1px solid ${colors.border};
          border-radius: 16px;
          padding: 14px;
          text-align: center;
        }
      `}</style>

      <div className="wallet-shell">
        {/* ─── HEADER ─────────────────────────────────────────── */}
        <div className="wallet-anim" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", marginBottom: 8 }}>
          <button onClick={() => navigate("/home")} style={{
            width: 42, height: 42, borderRadius: "50%", border: `1px solid ${colors.border}`,
            background: colors.surface, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: colors.text,
          }}>
            <ArrowLeft size={17} />
          </button>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Food Wallet</span>
          <button onClick={() => setShowTopup(true)} style={{
            width: 42, height: 42, borderRadius: "50%", border: `1px solid ${colors.accent}`,
            background: colors.accentSoft, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: colors.accent,
          }}>
            <Plus size={17} />
          </button>
        </div>

        {/* ─── BALANCE CARD ───────────────────────────────────── */}
        <div className="balance-card wallet-anim" style={{ marginBottom: 24, animationDelay: ".05s" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: colors.accent, letterSpacing: "1px", textTransform: "uppercase" }}>Food Credit Balance</span>
            <button onClick={() => setShowBalance(!showBalance)} style={{
              background: "none", border: "none", cursor: "pointer", color: colors.textMuted, padding: 4,
            }}>
              {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
          <div style={{ fontSize: 40, fontWeight: 200, color: colors.text, letterSpacing: "-1.5px", marginBottom: 4 }}>
            {showBalance ? formatNaira(balance) : "••••••"}
          </div>
          <div style={{ fontSize: 11, color: colors.textMuted }}>Available for food redemption</div>

          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <button onClick={() => setShowTopup(true)} style={{
              flex: 1, padding: "12px 0", borderRadius: 12, border: "none",
              background: colors.accent, color: "#0A0A0A", fontSize: 13, fontWeight: 700,
              cursor: "pointer", fontFamily: "'Sora', sans-serif",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}>
              <Plus size={14} /> Top Up
            </button>
            <button onClick={() => navigate("/send")} style={{
              flex: 1, padding: "12px 0", borderRadius: 12,
              border: `1px solid ${colors.accent}`, background: "transparent",
              color: colors.accent, fontSize: 13, fontWeight: 700,
              cursor: "pointer", fontFamily: "'Sora', sans-serif",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}>
              <Send size={14} /> Send Food
            </button>
          </div>
        </div>

        {/* ─── STATS ROW ──────────────────────────────────────── */}
        <div className="wallet-anim" style={{ display: "flex", gap: 10, marginBottom: 24, animationDelay: ".1s" }}>
          <div className="stat-card">
            <TrendingUp size={16} color={colors.success} style={{ marginBottom: 6 }} />
            <div style={{ fontSize: 16, fontWeight: 700, color: colors.text }}>{formatNaira(totalTopup)}</div>
            <div style={{ fontSize: 10, color: colors.textMuted, marginTop: 2 }}>Total Top-up</div>
          </div>
          <div className="stat-card">
            <TrendingDown size={16} color={colors.accent} style={{ marginBottom: 6 }} />
            <div style={{ fontSize: 16, fontWeight: 700, color: colors.text }}>{formatNaira(totalSpent)}</div>
            <div style={{ fontSize: 10, color: colors.textMuted, marginTop: 2 }}>Total Spent</div>
          </div>
          <div className="stat-card">
            <Receipt size={16} color={colors.warning} style={{ marginBottom: 6 }} />
            <div style={{ fontSize: 16, fontWeight: 700, color: colors.text }}>{transactions.length}</div>
            <div style={{ fontSize: 10, color: colors.textMuted, marginTop: 2 }}>Transactions</div>
          </div>
        </div>

        {/* ─── FILTER PILLS ───────────────────────────────────── */}
        <div className="wallet-anim" style={{ marginBottom: 16, animationDelay: ".15s" }}>
          <div className="pill-scroll">
            {(["all", "topup", "send", "receive", "redemption"] as const).map(tab => (
              <button
                key={tab}
                className={`pill-filter${activeTab === tab ? " active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "all" ? "All" : tab === "topup" ? "Top-up" : tab === "send" ? "Sent" : tab === "receive" ? "Received" : "Redemptions"}
              </button>
            ))}
          </div>
        </div>

        {/* ─── TRANSACTION LIST ───────────────────────────────── */}
        <div className="wallet-anim" style={{ animationDelay: ".2s" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 12 }}>
            Recent Activity
          </div>

          {filteredTx.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <Clock size={40} color={colors.textMuted} style={{ marginBottom: 12 }} />
              <div style={{ fontSize: 14, color: colors.textMuted }}>No transactions yet</div>
            </div>
          ) : (
            filteredTx.map(tx => {
              const Icon = txIcon[tx.type];
              const color = txColor(tx.type, colors.accent, colors.success, colors.error);
              const isCredit = tx.type === "topup" || tx.type === "receive" || tx.type === "refund";

              return (
                <div key={tx.id} className="tx-row" onClick={() => setSelectedTx(tx)}>
                  <div style={{
                    width: 42, height: 42, borderRadius: "50%",
                    background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Icon size={18} color={color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: colors.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {tx.description}
                    </div>
                    <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>
                      {tx.date} · {tx.time}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: isCredit ? colors.success : colors.text }}>
                      {isCredit ? "+" : "-"}{formatNaira(tx.amount)}
                    </div>
                    <div style={{ fontSize: 10, color: tx.status === "completed" ? colors.success : tx.status === "pending" ? colors.warning : colors.error, marginTop: 2, fontWeight: 600 }}>
                      {tx.status === "completed" ? "Completed" : tx.status === "pending" ? "Pending" : "Failed"}
                    </div>
                  </div>
                  <ChevronRight size={14} color={colors.textMuted} />
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ─── TOP-UP SHEET ─────────────────────────────────────── */}
      {showTopup && (
        <>
          <div className="topup-overlay" onClick={() => setShowTopup(false)} />
          <div className="topup-sheet">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>Top Up Food Wallet</span>
              <button onClick={() => setShowTopup(false)} style={{
                width: 32, height: 32, borderRadius: "50%", border: `1px solid ${colors.border}`,
                background: colors.surface, display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: colors.text,
              }}>
                <X size={14} />
              </button>
            </div>

            <input
              type="number"
              className="amount-input"
              placeholder="0"
              value={topupAmount}
              onChange={e => setTopupAmount(e.target.value)}
            />

            <div style={{ display: "flex", gap: 8, marginTop: 12, marginBottom: 24, justifyContent: "center" }}>
              {[1000, 2000, 5000, 10000].map(amt => (
                <button key={amt} onClick={() => setTopupAmount(String(amt))} style={{
                  padding: "8px 14px", borderRadius: 100, border: `1px solid ${colors.border}`,
                  background: topupAmount === String(amt) ? colors.accentSoft : colors.surface,
                  color: topupAmount === String(amt) ? colors.accent : colors.textMuted,
                  fontSize: 12, fontWeight: 600, cursor: "pointer",
                  fontFamily: "'Sora', sans-serif",
                  borderColor: topupAmount === String(amt) ? colors.accent : colors.border,
                }}>
                  {formatNaira(amt)}
                </button>
              ))}
            </div>

            <div style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, marginBottom: 12, letterSpacing: "0.5px", textTransform: "uppercase" }}>
              Payment Method
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {TOPUP_METHODS.map(m => (
                <button
                  key={m.id}
                  className={`method-btn${selectedMethod === m.id ? " selected" : ""}`}
                  onClick={() => setSelectedMethod(m.id)}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: selectedMethod === m.id ? colors.accent : colors.surfaceElevated,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: selectedMethod === m.id ? "#0A0A0A" : colors.textMuted,
                  }}>
                    <m.icon size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{m.label}</div>
                    <div style={{ fontSize: 11, color: colors.textMuted }}>{m.desc}</div>
                  </div>
                </button>
              ))}
            </div>

            <button
              disabled={!topupAmount || Number(topupAmount) < 100 || topping}
              onClick={handleTopUp}
              style={{
                width: "100%", padding: "16px", borderRadius: 14,
                background: topupAmount && Number(topupAmount) >= 100 ? colors.accent : colors.surfaceElevated,
                color: topupAmount && Number(topupAmount) >= 100 ? "#0A0A0A" : colors.textMuted,
                fontSize: 14, fontWeight: 700, border: "none",
                cursor: topupAmount && Number(topupAmount) >= 100 ? "pointer" : "not-allowed",
                fontFamily: "'Sora', sans-serif",
                boxShadow: topupAmount && Number(topupAmount) >= 100 ? `0 8px 32px ${colors.accent}30` : "none",
              }}
            >
              <Zap size={16} style={{ marginRight: 6, verticalAlign: "middle" }} />
              {topping ? "Processing..." : `Top Up ${topupAmount ? formatNaira(Number(topupAmount)) : ""}`}
            </button>
          </div>
        </>
      )}

      {/* ─── RECEIPT SHEET ────────────────────────────────────── */}
      {selectedTx && (
        <>
          <div className="topup-overlay" onClick={() => setSelectedTx(null)} />
          <div className="receipt-sheet">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>Transaction Details</span>
              <button onClick={() => setSelectedTx(null)} style={{
                width: 32, height: 32, borderRadius: "50%", border: `1px solid ${colors.border}`,
                background: colors.surface, display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: colors.text,
              }}>
                <X size={14} />
              </button>
            </div>

            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: `${txColor(selectedTx.type, colors.accent, colors.success, colors.error)}15`,
                display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 12,
              }}>
                {(() => {
                  const Icon = txIcon[selectedTx.type];
                  return <Icon size={24} color={txColor(selectedTx.type, colors.accent, colors.success, colors.error)} />;
                })()}
              </div>
              <div style={{ fontSize: 32, fontWeight: 200, color: colors.text, letterSpacing: "-1px" }}>
                {formatNaira(selectedTx.amount)}
              </div>
              <div style={{
                fontSize: 11, fontWeight: 600, marginTop: 6,
                color: selectedTx.status === "completed" ? colors.success : colors.warning,
                background: `${selectedTx.status === "completed" ? colors.success : colors.warning}15`,
                padding: "4px 12px", borderRadius: 100, display: "inline-block",
              }}>
                {selectedTx.status === "completed" ? "Completed" : "Pending"}
              </div>
            </div>

            <div style={{ background: colors.surfaceElevated, borderRadius: 16, padding: 18 }}>
              {[
                { label: "Description", value: selectedTx.description },
                { label: "Date", value: `${selectedTx.date} · ${selectedTx.time}` },
                { label: "Reference", value: selectedTx.reference || "—" },
                { label: "Type", value: selectedTx.type.charAt(0).toUpperCase() + selectedTx.type.slice(1) },
                ...(selectedTx.vendor ? [{ label: "Vendor", value: selectedTx.vendor }] : []),
                ...(selectedTx.recipient ? [{ label: selectedTx.type === "send" ? "Recipient" : "Sender", value: selectedTx.recipient }] : []),
              ].map((row, i, arr) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "12px 0",
                  borderBottom: i < arr.length - 1 ? `1px solid ${colors.border}` : "none",
                }}>
                  <span style={{ fontSize: 12, color: colors.textMuted }}>{row.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: colors.text, textAlign: "right" }}>{row.value}</span>
                </div>
              ))}
            </div>

            <button style={{
              width: "100%", padding: "14px", borderRadius: 14,
              border: `1px solid ${colors.border}`, background: colors.surface,
              color: colors.text, fontSize: 13, fontWeight: 600, marginTop: 16,
              cursor: "pointer", fontFamily: "'Sora', sans-serif",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              <Download size={14} /> Download Receipt
            </button>
          </div>
        </>
      )}
    </>
  );
}
