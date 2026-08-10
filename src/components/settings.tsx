import '../index.css';
import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { ArrowLeft, ChevronRight, Moon, Sun, Phone, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { saveAddress } from "../services/api";

function Settings() {
  const { toggle, colors } = useTheme();
  const navigate = useNavigate();
  const [phoneNum, setPhone] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [showPhone, setShowPhone] = useState(false);
  const [showMonnify, setShowMonnify] = useState(false);
  const [saving, setSaving] = useState(false);

  const email = localStorage.getItem("email") || "";

  const handleSaveAddress = async () => {
    if (!email || !phoneNum || !walletAddress) return;
    setSaving(true);
    try {
      await saveAddress(phoneNum, walletAddress);
      setShowPhone(false);
    } catch (e) {
      console.error("Failed to save:", e);
    }
    setSaving(false);
  };

  const circleBtn: React.CSSProperties = {
    width: 42, height: 42, borderRadius: "50%",
    border: `1px solid ${colors.border}`, background: colors.surface,
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", color: colors.text,
  };

  const card: React.CSSProperties = {
    background: colors.surface, border: `1px solid ${colors.border}`,
    borderRadius: 20, overflow: "hidden", marginBottom: 12,
  };

  return (
    <div style={{
      background: colors.bg, minHeight: "100vh", padding: 20,
      fontFamily: "'Sora', sans-serif", color: colors.text,
      transition: "background .3s ease",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, paddingTop: 8 }}>
        <button onClick={() => navigate("/home")} style={circleBtn}>
          <ArrowLeft size={17} />
        </button>
        <span style={{ fontSize: 14, fontWeight: 600 }}>Settings</span>
        <div style={{ width: 42 }} />
      </div>

      {/* Theme Toggle */}
      <div style={{ ...card, padding: "18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: colors.accentSoft, display: "flex",
            alignItems: "center", justifyContent: "center", color: colors.accent,
          }}>
            {colors.isDark ? <Moon size={18} /> : <Sun size={18} />}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Theme</div>
            <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 1 }}>{colors.isDark ? "Dark" : "Light"}</div>
          </div>
        </div>
        <button onClick={toggle} style={{
          width: 48, height: 28, borderRadius: 14, border: "none",
          background: colors.isDark ? colors.accent : "rgba(0,0,0,0.15)",
          position: "relative", cursor: "pointer", transition: "background .3s",
        }}>
          <div style={{
            width: 22, height: 22, borderRadius: "50%", background: "white",
            position: "absolute", top: 3, left: colors.isDark ? 23 : 3,
            transition: "left .3s ease", boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }} />
        </button>
      </div>

      {/* Phone Address */}
      <div style={card}>
        <div onClick={() => setShowPhone(!showPhone)} style={{ padding: "18px", display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: colors.accentSoft, display: "flex",
            alignItems: "center", justifyContent: "center", color: colors.accent,
          }}><Phone size={18} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Phone & Address</div>
            <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 1 }}>Set delivery details</div>
          </div>
          <ChevronRight size={16} color={colors.textMuted} style={{ transform: showPhone ? "rotate(90deg)" : "none", transition: "transform .2s" }} />
        </div>
        {showPhone && (
          <div style={{ padding: "0 18px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
            <input placeholder="Phone number" value={phoneNum} onChange={e => setPhone(e.target.value)} style={{
              padding: "12px 16px", borderRadius: 14, border: `1px solid ${colors.border}`,
              background: colors.inputBg, color: colors.text, fontSize: 13,
              fontFamily: "'Sora', sans-serif", outline: "none",
            }} />
            <input placeholder="Delivery address" value={walletAddress} onChange={e => setWalletAddress(e.target.value)} style={{
              padding: "12px 16px", borderRadius: 14, border: `1px solid ${colors.border}`,
              background: colors.inputBg, color: colors.text, fontSize: 13,
              fontFamily: "'Sora', sans-serif", outline: "none",
            }} />
            <button onClick={handleSaveAddress} disabled={saving} style={{
              padding: "12px", borderRadius: 14, border: "none",
              background: colors.accent, color: "#0A0A0A", fontSize: 13,
              fontWeight: 700, cursor: "pointer", fontFamily: "'Sora', sans-serif",
            }}>Save Address</button>
          </div>
        )}
      </div>

      {/* Fiat Account */}
      <div style={card}>
        <div onClick={() => setShowMonnify(!showMonnify)} style={{ padding: "18px", display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: colors.accentSoft, display: "flex",
            alignItems: "center", justifyContent: "center", color: colors.accent,
          }}><CreditCard size={18} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Fiat Account</div>
            <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 1 }}>Virtual account details</div>
          </div>
          <ChevronRight size={16} color={colors.textMuted} style={{ transform: showMonnify ? "rotate(90deg)" : "none", transition: "transform .2s" }} />
        </div>
        {showMonnify && (
          <div style={{ padding: "0 18px 18px", fontSize: 12, color: colors.textMuted }}>
            {localStorage.getItem("monnifyAccountNumber") || "No account linked yet"}
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;
