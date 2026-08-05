import { useState } from "react";
import {
  ArrowLeft, Send, User, Search, Clock, Check, X,
  Phone, Mail, Wallet, ChevronRight, Plus, Zap,
  ArrowUpRight, Gift, Star, Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

// ─── Types ────────────────────────────────────────────────────────
interface Contact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  avatar?: string;
  initials: string;
  lastTransfer?: string;
}

interface TransferPreset {
  amount: number;
  label: string;
  icon: string;
}

// ─── Data ─────────────────────────────────────────────────────────
const RECENT_CONTACTS: Contact[] = [
  { id: "1", name: "Chidinma Okafor", phone: "+234 803 *** 4521", initials: "CO", lastTransfer: "Yesterday" },
  { id: "2", name: "Amina Bello", phone: "+234 805 *** 7832", initials: "AB", lastTransfer: "Jul 28" },
  { id: "3", name: "Dad", phone: "+234 802 *** 1234", initials: "D", lastTransfer: "Jul 25" },
  { id: "4", name: "Mama Nkechi Kitchen", initials: "MN", lastTransfer: "Jul 20" },
];

const SUGGESTED_CONTACTS: Contact[] = [
  { id: "5", name: "Emeka Nwosu", phone: "+234 806 *** 9102", initials: "EN" },
  { id: "6", name: "Fatima Abdullahi", email: "fatima@email.com", initials: "FA" },
  { id: "7", name: "Campus Green Mart", initials: "CG" },
  { id: "8", name: "Blessing Eze", phone: "+234 809 *** 3344", initials: "BE" },
];

const FOOD_PRESETS: TransferPreset[] = [
  { amount: 500, label: "Snack Pack", icon: "🍪" },
  { amount: 1000, label: "Meal Credit", icon: "🍛" },
  { amount: 2000, label: "Day's Food", icon: "🍽" },
  { amount: 5000, label: "Weekly Plan", icon: "📦" },
];

// ─── Helpers ──────────────────────────────────────────────────────
const formatNaira = (n: number) => `\u20A6${n.toLocaleString()}`;

// ─── Main Component ───────────────────────────────────────────────
export default function FoodTransfer() {
  const { colors } = useTheme();
  const navigate = useNavigate();

  const [step, setStep] = useState<"recipient" | "amount" | "confirm" | "success">("recipient");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [transferType, setTransferType] = useState<"credits" | "package">("credits");
  const [sending, setSending] = useState(false);

  const filteredContacts = [...RECENT_CONTACTS, ...SUGGESTED_CONTACTS].filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone?.includes(searchQuery) ||
    c.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSend = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setStep("success");
    }, 1500);
  };

  const resetTransfer = () => {
    setStep("recipient");
    setSelectedContact(null);
    setAmount("");
    setNote("");
    setTransferType("credits");
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .transfer-shell {
          font-family: 'Sora', sans-serif;
          background: ${colors.bg};
          min-height: 100svh;
          max-width: 430px;
          margin: 0 auto;
          color: ${colors.text};
          padding: 0 20px 40px;
        }
        .transfer-anim { animation: fadeIn .35s ease both; }
        .contact-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 0;
          border-bottom: 1px solid ${colors.border};
          cursor: pointer;
          transition: opacity .2s;
        }
        .contact-row:last-child { border-bottom: none; }
        .contact-row:active { opacity: 0.7; }
        .search-input {
          width: 100%;
          background: ${colors.inputBg};
          border: 1px solid ${colors.border};
          border-radius: 14px;
          padding: 14px 16px 14px 44px;
          font-size: 14px;
          color: ${colors.text};
          font-family: 'Sora', sans-serif;
          outline: none;
        }
        .search-input:focus { border-color: ${colors.accent}; }
        .search-input::placeholder { color: ${colors.textMuted}; }
        .amount-input {
          width: 100%;
          background: transparent;
          border: none;
          font-size: 44px;
          font-weight: 200;
          color: ${colors.text};
          font-family: 'Sora', sans-serif;
          outline: none;
          text-align: center;
          letter-spacing: -2px;
        }
        .amount-input::placeholder { color: ${colors.textMuted}; }
        .preset-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 14px 10px;
          border-radius: 16px;
          border: 1px solid ${colors.border};
          background: ${colors.surface};
          cursor: pointer;
          transition: all .2s;
          flex: 1;
          min-width: 0;
          color: ${colors.text};
          font-family: 'Sora', sans-serif;
        }
        .preset-btn.selected {
          border-color: ${colors.accent};
          background: ${colors.accentSoft};
        }
        .type-toggle {
          display: flex;
          background: ${colors.surface};
          border: 1px solid ${colors.border};
          border-radius: 14px;
          padding: 4px;
          gap: 4px;
        }
        .type-toggle button {
          flex: 1;
          padding: 10px;
          border-radius: 11px;
          border: none;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all .2s;
          font-family: 'Sora', sans-serif;
          background: transparent;
          color: ${colors.textMuted};
        }
        .type-toggle button.active {
          background: ${colors.accent};
          color: #0A0A0A;
        }
        .success-check {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: ${colors.success};
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          animation: scaleIn .4s ease both;
        }
        .note-input {
          width: 100%;
          background: ${colors.inputBg};
          border: 1px solid ${colors.border};
          border-radius: 14px;
          padding: 14px 16px;
          font-size: 13px;
          color: ${colors.text};
          font-family: 'Sora', sans-serif;
          outline: none;
          resize: none;
          min-height: 60px;
        }
        .note-input:focus { border-color: ${colors.accent}; }
        .note-input::placeholder { color: ${colors.textMuted}; }
      `}</style>

      <div className="transfer-shell">
        {/* ─── HEADER ─────────────────────────────────────────── */}
        <div className="transfer-anim" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", marginBottom: 8 }}>
          <button onClick={() => step === "recipient" ? navigate("/home") : setStep(step === "amount" ? "recipient" : "amount")} style={{
            width: 42, height: 42, borderRadius: "50%", border: `1px solid ${colors.border}`,
            background: colors.surface, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: colors.text,
          }}>
            <ArrowLeft size={17} />
          </button>
          <span style={{ fontSize: 14, fontWeight: 600 }}>
            {step === "recipient" ? "Send Food Value" : step === "amount" ? "Enter Amount" : step === "confirm" ? "Confirm Transfer" : "Transfer Sent"}
          </span>
          <div style={{ width: 42 }} />
        </div>

        {/* ─── PROGRESS ───────────────────────────────────────── */}
        {step !== "success" && (
          <div className="transfer-anim" style={{ display: "flex", gap: 6, marginBottom: 28, animationDelay: ".05s" }}>
            {["recipient", "amount", "confirm"].map((s, i) => (
              <div key={s} style={{
                flex: 1, height: 3, borderRadius: 3,
                background: (["recipient", "amount", "confirm"].indexOf(step) >= i) ? colors.accent : colors.surfaceElevated,
                transition: "background .3s",
              }} />
            ))}
          </div>
        )}

        {/* ─── STEP: RECIPIENT ────────────────────────────────── */}
        {step === "recipient" && (
          <div className="transfer-anim" style={{ animationDelay: ".1s" }}>
            {/* Search */}
            <div style={{ position: "relative", marginBottom: 24 }}>
              <Search size={16} color={colors.textMuted} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
              <input
                className="search-input"
                placeholder="Search by name, phone, or email"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Recent Transfers */}
            {!searchQuery && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <Clock size={14} color={colors.textMuted} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, letterSpacing: "0.5px", textTransform: "uppercase" }}>Recent</span>
                </div>
                {RECENT_CONTACTS.map(contact => (
                  <div key={contact.id} className="contact-row" onClick={() => { setSelectedContact(contact); setStep("amount"); }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%",
                      background: `linear-gradient(135deg, ${colors.accent}25, ${colors.accent}10)`,
                      border: `1px solid ${colors.accent}20`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 14, fontWeight: 700, color: colors.accent, flexShrink: 0,
                    }}>
                      {contact.initials}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>{contact.name}</div>
                      <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 1 }}>
                        {contact.phone || contact.email}
                        {contact.lastTransfer && ` · Last: ${contact.lastTransfer}`}
                      </div>
                    </div>
                    <ChevronRight size={16} color={colors.textMuted} />
                  </div>
                ))}
              </div>
            )}

            {/* Search Results / Suggestions */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <Users size={14} color={colors.textMuted} />
                <span style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                  {searchQuery ? "Results" : "Suggested"}
                </span>
              </div>
              {filteredContacts.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <User size={36} color={colors.textMuted} style={{ marginBottom: 12 }} />
                  <div style={{ fontSize: 14, color: colors.textMuted }}>No contacts found</div>
                  <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 4 }}>Try searching by name or phone</div>
                </div>
              ) : (
                (searchQuery ? filteredContacts : SUGGESTED_CONTACTS).map(contact => (
                  <div key={contact.id} className="contact-row" onClick={() => { setSelectedContact(contact); setStep("amount"); }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%",
                      background: colors.surfaceElevated,
                      border: `1px solid ${colors.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 14, fontWeight: 700, color: colors.textSecondary, flexShrink: 0,
                    }}>
                      {contact.initials}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>{contact.name}</div>
                      <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 1 }}>
                        {contact.phone || contact.email}
                      </div>
                    </div>
                    <ChevronRight size={16} color={colors.textMuted} />
                  </div>
                ))
              )}
            </div>

            {/* Add New Contact */}
            <div style={{
              marginTop: 20, padding: "16px", borderRadius: 16,
              border: `1px dashed ${colors.border}`, textAlign: "center",
              cursor: "pointer", transition: "all .2s",
            }}>
              <Plus size={20} color={colors.textMuted} style={{ marginBottom: 6 }} />
              <div style={{ fontSize: 13, fontWeight: 600, color: colors.textMuted }}>Add New Recipient</div>
              <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>Phone, email, or Nekstpei ID</div>
            </div>
          </div>
        )}

        {/* ─── STEP: AMOUNT ───────────────────────────────────── */}
        {step === "amount" && selectedContact && (
          <div className="transfer-anim" style={{ animationDelay: ".1s" }}>
            {/* Recipient Badge */}
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: `linear-gradient(135deg, ${colors.accent}25, ${colors.accent}10)`,
                border: `2px solid ${colors.accent}30`,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, fontWeight: 700, color: colors.accent, marginBottom: 12,
              }}>
                {selectedContact.initials}
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: colors.text }}>{selectedContact.name}</div>
              <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}>{selectedContact.phone || selectedContact.email}</div>
            </div>

            {/* Transfer Type Toggle */}
            <div className="type-toggle" style={{ marginBottom: 28 }}>
              <button className={transferType === "credits" ? "active" : ""} onClick={() => setTransferType("credits")}>
                <Wallet size={14} style={{ marginRight: 4, verticalAlign: "middle" }} /> Food Credits
              </button>
              <button className={transferType === "package" ? "active" : ""} onClick={() => setTransferType("package")}>
                <Gift size={14} style={{ marginRight: 4, verticalAlign: "middle" }} /> Food Package
              </button>
            </div>

            {/* Amount Input */}
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 11, color: colors.textMuted, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>
                Amount
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                <span style={{ fontSize: 28, fontWeight: 200, color: colors.textMuted }}>\u20A6</span>
                <input
                  className="amount-input"
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
              </div>
              <div style={{ height: 1, background: colors.border, marginTop: 4 }} />
            </div>

            {/* Balance Info */}
            <div style={{ textAlign: "center", fontSize: 12, color: colors.textMuted, marginBottom: 28 }}>
              Available: {formatNaira(23000)}
            </div>

            {/* Quick Presets */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              {FOOD_PRESETS.map(preset => (
                <button
                  key={preset.amount}
                  className={`preset-btn${amount === String(preset.amount) ? " selected" : ""}`}
                  onClick={() => setAmount(String(preset.amount))}
                >
                  <span style={{ fontSize: 20 }}>{preset.icon}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: colors.textMuted }}>{preset.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: colors.text }}>{formatNaira(preset.amount)}</span>
                </button>
              ))}
            </div>

            {/* Note */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, marginBottom: 8, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                Note (optional)
              </div>
              <textarea
                className="note-input"
                placeholder="e.g. For lunch this week"
                value={note}
                onChange={e => setNote(e.target.value)}
                rows={2}
              />
            </div>

            {/* Send Button */}
            <button
              disabled={!amount || Number(amount) < 100}
              onClick={() => setStep("confirm")}
              style={{
                width: "100%", padding: "16px", borderRadius: 14,
                background: amount && Number(amount) >= 100 ? colors.accent : colors.surfaceElevated,
                color: amount && Number(amount) >= 100 ? "#0A0A0A" : colors.textMuted,
                fontSize: 14, fontWeight: 700, border: "none",
                cursor: amount && Number(amount) >= 100 ? "pointer" : "not-allowed",
                fontFamily: "'Sora', sans-serif",
                boxShadow: amount && Number(amount) >= 100 ? `0 8px 32px ${colors.accent}30` : "none",
              }}
            >
              Continue
            </button>
          </div>
        )}

        {/* ─── STEP: CONFIRM ──────────────────────────────────── */}
        {step === "confirm" && selectedContact && (
          <div className="transfer-anim" style={{ animationDelay: ".1s" }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: `linear-gradient(135deg, ${colors.accent}25, ${colors.accent}10)`,
                border: `2px solid ${colors.accent}30`,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, fontWeight: 700, color: colors.accent, marginBottom: 12,
              }}>
                {selectedContact.initials}
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: colors.text }}>{selectedContact.name}</div>
              <div style={{ fontSize: 36, fontWeight: 200, color: colors.text, marginTop: 16, letterSpacing: "-1.5px" }}>
                {formatNaira(Number(amount))}
              </div>
              <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 4 }}>
                {transferType === "credits" ? "Food Credits" : "Food Package"}
              </div>
            </div>

            {/* Summary */}
            <div style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 16, padding: 18, marginBottom: 24 }}>
              {[
                { label: "Recipient", value: selectedContact.name },
                { label: "Amount", value: formatNaira(Number(amount)) },
                { label: "Type", value: transferType === "credits" ? "Food Credits" : "Food Package" },
                { label: "From", value: "Food Wallet" },
                ...(note ? [{ label: "Note", value: note }] : []),
              ].map((row, i, arr) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "12px 0",
                  borderBottom: i < arr.length - 1 ? `1px solid ${colors.border}` : "none",
                }}>
                  <span style={{ fontSize: 12, color: colors.textMuted }}>{row.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={sending}
              style={{
                width: "100%", padding: "16px", borderRadius: 14,
                background: colors.accent, color: "#0A0A0A",
                fontSize: 14, fontWeight: 700, border: "none",
                cursor: "pointer", fontFamily: "'Sora', sans-serif",
                boxShadow: `0 8px 32px ${colors.accent}30`,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                opacity: sending ? 0.7 : 1,
              }}
            >
              {sending ? (
                <>Sending...</>
              ) : (
                <>
                  <Send size={16} /> Send {formatNaira(Number(amount))}
                </>
              )}
            </button>
          </div>
        )}

        {/* ─── STEP: SUCCESS ──────────────────────────────────── */}
        {step === "success" && selectedContact && (
          <div className="transfer-anim" style={{ animationDelay: ".1s", textAlign: "center", paddingTop: 40 }}>
            <div className="success-check">
              <Check size={36} color="#0A0A0A" strokeWidth={3} />
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: colors.text, marginBottom: 8 }}>Food Value Sent!</div>
            <div style={{ fontSize: 14, color: colors.textMuted, marginBottom: 32 }}>
              {formatNaira(Number(amount))} sent to {selectedContact.name}
            </div>

            <div style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 16, padding: 18, marginBottom: 24, textAlign: "left" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 14 }}>Transfer Details</div>
              {[
                { label: "Reference", value: `TXN-${Date.now().toString(36).toUpperCase()}` },
                { label: "Recipient", value: selectedContact.name },
                { label: "Amount", value: formatNaira(Number(amount)) },
                { label: "Status", value: "Completed" },
                { label: "Date", value: new Date().toLocaleString() },
              ].map((row, i, arr) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "10px 0",
                  borderBottom: i < arr.length - 1 ? `1px solid ${colors.border}` : "none",
                }}>
                  <span style={{ fontSize: 12, color: colors.textMuted }}>{row.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: row.label === "Status" ? colors.success : colors.text }}>{row.value}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={resetTransfer} style={{
                flex: 1, padding: "14px", borderRadius: 14,
                border: `1px solid ${colors.accent}`, background: "transparent",
                color: colors.accent, fontSize: 13, fontWeight: 700,
                cursor: "pointer", fontFamily: "'Sora', sans-serif",
              }}>
                Send Again
              </button>
              <button onClick={() => navigate("/home")} style={{
                flex: 1, padding: "14px", borderRadius: 14,
                background: colors.accent, color: "#0A0A0A",
                fontSize: 13, fontWeight: 700, border: "none",
                cursor: "pointer", fontFamily: "'Sora', sans-serif",
              }}>
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
