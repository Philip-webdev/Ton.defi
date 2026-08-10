import { useState, useEffect } from "react";
import {
  ArrowLeft, Shield, ChevronRight, Eye,
  Check, Clock, AlertTriangle, FileText, Download, Lock,
  ArrowUpRight, ArrowDownLeft, ShoppingCart, Send, Wallet, Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { fetchAuditLogs, fetchAuditTrail } from "../services/api";

// ─── Types ────────────────────────────────────────────────────────
type Tab = "trail" | "traceability" | "transparency";

interface AuditRecord {
  id: string;
  type: "purchase" | "transfer" | "redemption" | "refund" | "expiry";
  amount: number;
  from: string;
  to: string;
  timestamp: string;
  status: "verified" | "pending" | "flagged";
  hash: string;
  program?: string;
  vendor?: string;
  location?: string;
}

interface TraceabilityRecord {
  id: string;
  creditId: string;
  origin: string;
  currentHolder: string;
  purchaseDate: string;
  expiryDate: string;
  totalTransfers: number;
  lastRedemption?: string;
  status: "active" | "redeemed" | "expired";
  timeline: { event: string; date: string; actor: string }[];
}

interface TransparencyReport {
  id: string;
  program: string;
  period: string;
  totalBudget: number;
  distributed: number;
  redeemed: number;
  unspent: number;
  beneficiaries: number;
  avgRedemption: number;
}

// ─── Data ─────────────────────────────────────────────────────────
const SAMPLE_AUDIT: AuditRecord[] = [];

const SAMPLE_TRACEABILITY: TraceabilityRecord[] = [];

const SAMPLE_TRANSPARENCY: TransparencyReport[] = [];

// ─── Helpers ──────────────────────────────────────────────────────
const formatNaira = (n: number) => `\u20A6${n.toLocaleString()}`;

const typeIcon = (type: string) => {
  const icons: Record<string, typeof ArrowUpRight> = {
    purchase: Wallet,
    transfer: Send,
    redemption: ShoppingCart,
    refund: ArrowDownLeft,
    expiry: Clock,
  };
  return icons[type] || Zap;
};

const typeColor = (type: string, colors: any) => {
  const map: Record<string, string> = {
    purchase: colors.accent,
    transfer: colors.text,
    redemption: colors.success,
    refund: colors.warning,
    expiry: colors.error,
  };
  return map[type] || colors.textMuted;
};

// ─── Main Component ───────────────────────────────────────────────
export default function TrustLayer() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const email = localStorage.getItem("email") || "";

  const [activeTab, setActiveTab] = useState<Tab>("trail");
  const [selectedRecord, setSelectedRecord] = useState<AuditRecord | null>(null);
  const [selectedTrace, setSelectedTrace] = useState<TraceabilityRecord | null>(null);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAuditLogs();
  }, [email]);

  const loadAuditLogs = async () => {
    try {
      const data = await fetchAuditLogs({ email, limit: 50 });
      if (data?.logs) {
        setAuditLogs(data.logs);
      }
    } catch {}
    setLoading(false);
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .trust-shell {
          font-family: 'Sora', sans-serif;
          background: ${colors.bg};
          min-height: 100svh;
          max-width: 430px;
          margin: 0 auto;
          color: ${colors.text};
          padding: 0 20px 100px;
        }
        .trust-anim { animation: fadeIn .35s ease both; }
        .tab-btn {
          flex: 1;
          padding: 10px 6px;
          border-radius: 12px;
          border: none;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all .2s;
          font-family: 'Sora', sans-serif;
          background: transparent;
          color: ${colors.textMuted};
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .tab-btn.active {
          background: ${colors.accentSoft};
          color: ${colors.accent};
        }
        .audit-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 0;
          border-bottom: 1px solid ${colors.border};
          cursor: pointer;
          transition: opacity .2s;
        }
        .audit-row:active { opacity: 0.7; }
        .hash-badge {
          font-family: 'Courier New', monospace;
          font-size: 10px;
          color: colors.textMuted;
          background: colors.surfaceElevated;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .timeline-item {
          display: flex;
          gap: 16px;
          position: relative;
        }
        .timeline-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: ${colors.accent};
          flex-shrink: 0;
          margin-top: 4px;
        }
        .timeline-line {
          position: absolute;
          left: 5px;
          top: 16px;
          width: 2px;
          height: calc(100% + 8px);
          background: ${colors.border};
        }
        .transparency-card {
          background: ${colors.surface};
          border: 1px solid ${colors.border};
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 12;
        }
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 199;
        }
        .detail-sheet {
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
      `}</style>

      <div className="trust-shell">
        {/* ─── HEADER ─────────────────────────────────────────── */}
        <div className="trust-anim" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", marginBottom: 8 }}>
          <button onClick={() => navigate("/home")} style={{
            width: 42, height: 42, borderRadius: "50%", border: `1px solid ${colors.border}`,
            background: colors.surface, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: colors.text,
          }}>
            <ArrowLeft size={17} />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Shield size={18} color={colors.accent} />
            <span style={{ fontSize: 14, fontWeight: 600 }}>Trust Layer</span>
          </div>
          <div style={{ width: 42 }} />
        </div>

        {/* ─── TAB NAV ────────────────────────────────────────── */}
        <div className="trust-anim" style={{ display: "flex", gap: 4, marginBottom: 24, animationDelay: ".05s" }}>
          {([
            { id: "trail" as Tab, icon: FileText, label: "Audit Trail" },
            { id: "traceability" as Tab, icon: Eye, label: "Trace" },
            { id: "transparency" as Tab, icon: Lock, label: "Reports" },
          ]).map(tab => (
            <button
              key={tab.id}
              className={`tab-btn${activeTab === tab.id ? " active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ─── TAB: AUDIT TRAIL ───────────────────────────────── */}
        {activeTab === "trail" && (
          <div className="trust-anim" style={{ animationDelay: ".1s" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 12 }}>
              All Transactions ({auditLogs.length})
            </div>

            {auditLogs.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 20px", color: colors.textMuted }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>No audit records yet</div>
                <div style={{ fontSize: 12 }}>Your transaction history will appear here</div>
              </div>
            ) : auditLogs.map((record: any) => {
              const recordType = record.eventType || "transfer";
              const Icon = typeIcon(recordType);
              const color = typeColor(recordType, colors);

              return (
                <div key={record._id || record.id} className="audit-row" onClick={() => setSelectedRecord(record)}>
                  <div style={{
                    width: 42, height: 42, borderRadius: "50%",
                    background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Icon size={18} color={color} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: colors.text, textTransform: "capitalize" }}>
                      {record.action || record.eventType}
                    </div>
                    <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>
                      {record.actorEmail}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                      <span className="hash-badge">{record.hash ? record.hash.slice(0, 10) + "..." : "—"}</span>
                      <span style={{ fontSize: 9, fontWeight: 600, color: colors.success }}>
                        Verified
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{formatNaira(record.amount)}</div>
                    <div style={{ fontSize: 10, color: colors.textMuted, marginTop: 2 }}>{record.timestamp}</div>
                  </div>
                  <ChevronRight size={14} color={colors.textMuted} />
                </div>
              );
            })}
          </div>
        )}

        {/* ─── TAB: TRACEABILITY ──────────────────────────────── */}
        {activeTab === "traceability" && (
          <div className="trust-anim" style={{ animationDelay: ".1s" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 12 }}>
              Credit Lifecycle
            </div>

            {SAMPLE_TRACEABILITY.map(trace => (
              <div key={trace.id} onClick={() => setSelectedTrace(trace)} style={{
                background: colors.surface, border: `1px solid ${colors.border}`,
                borderRadius: 16, padding: 16, marginBottom: 10, cursor: "pointer",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{trace.creditId}</div>
                    <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>From: {trace.origin}</div>
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 600,
                    color: trace.status === "active" ? colors.success : trace.status === "redeemed" ? colors.accent : colors.error,
                    background: trace.status === "active" ? `${colors.success}15` : trace.status === "redeemed" ? colors.accentSoft : `${colors.error}15`,
                    padding: "4px 10px", borderRadius: 100,
                  }}>
                    {trace.status.charAt(0).toUpperCase() + trace.status.slice(1)}
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: colors.textMuted }}>
                  <span>Transfers: {trace.totalTransfers}</span>
                  <span>Expires: {trace.expiryDate}</span>
                </div>

                {trace.lastRedemption && (
                  <div style={{ fontSize: 11, color: colors.success, marginTop: 6 }}>
                    Last redemption: {trace.lastRedemption}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ─── TAB: TRANSPARENCY ──────────────────────────────── */}
        {activeTab === "transparency" && (
          <div className="trust-anim" style={{ animationDelay: ".1s" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 12 }}>
              Program Transparency Reports
            </div>

            {SAMPLE_TRANSPARENCY.map(report => (
              <div key={report.id} className="transparency-card">
                <div style={{ fontSize: 14, fontWeight: 700, color: colors.text, marginBottom: 4 }}>{report.program}</div>
                <div style={{ fontSize: 11, color: colors.textMuted, marginBottom: 16 }}>{report.period}</div>

                {/* Fund Flow */}
                <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                  <div style={{ flex: 1, textAlign: "center", background: colors.surfaceElevated, borderRadius: 12, padding: 12 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{formatNaira(report.totalBudget)}</div>
                    <div style={{ fontSize: 9, color: colors.textMuted, marginTop: 2 }}>Total Budget</div>
                  </div>
                  <div style={{ flex: 1, textAlign: "center", background: colors.surfaceElevated, borderRadius: 12, padding: 12 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: colors.accent }}>{formatNaira(report.distributed)}</div>
                    <div style={{ fontSize: 9, color: colors.textMuted, marginTop: 2 }}>Distributed</div>
                  </div>
                  <div style={{ flex: 1, textAlign: "center", background: colors.surfaceElevated, borderRadius: 12, padding: 12 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: colors.success }}>{formatNaira(report.redeemed)}</div>
                    <div style={{ fontSize: 9, color: colors.textMuted, marginTop: 2 }}>Redeemed</div>
                  </div>
                </div>

                {/* Utilization Bar */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: colors.textSecondary }}>Utilization</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: colors.text }}>
                      {Math.round((report.redeemed / report.distributed) * 100)}%
                    </span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: colors.surfaceElevated }}>
                    <div style={{
                      height: "100%", borderRadius: 3,
                      width: `${(report.redeemed / report.distributed) * 100}%`,
                      background: `linear-gradient(90deg, ${colors.accent}, ${colors.success})`,
                    }} />
                  </div>
                </div>

                {/* Stats */}
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12, borderTop: `1px solid ${colors.border}` }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{report.beneficiaries}</div>
                    <div style={{ fontSize: 9, color: colors.textMuted }}>Beneficiaries</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{formatNaira(report.avgRedemption)}</div>
                    <div style={{ fontSize: 9, color: colors.textMuted }}>Avg Redemption</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: colors.warning }}>{formatNaira(report.unspent)}</div>
                    <div style={{ fontSize: 9, color: colors.textMuted }}>Unspent</div>
                  </div>
                </div>
              </div>
            ))}

            <button style={{
              width: "100%", padding: "14px", borderRadius: 14,
              border: `1px solid ${colors.border}`, background: colors.surface,
              color: colors.text, fontSize: 13, fontWeight: 600, marginTop: 20,
              cursor: "pointer", fontFamily: "'Sora', sans-serif",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              <Download size={14} /> Export Full Report
            </button>
          </div>
        )}
      </div>

      {/* ─── AUDIT DETAIL SHEET ───────────────────────────────── */}
      {selectedRecord && (
        <>
          <div className="overlay" onClick={() => setSelectedRecord(null)} />
          <div className="detail-sheet">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>Transaction Details</span>
              <button onClick={() => setSelectedRecord(null)} style={{
                width: 32, height: 32, borderRadius: "50%", border: `1px solid ${colors.border}`,
                background: colors.surface, display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: colors.text,
              }}>
                <span style={{ fontSize: 14 }}>X</span>
              </button>
            </div>

            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: `${typeColor(selectedRecord.type, colors)}15`,
                display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 12,
              }}>
                {(() => { const Icon = typeIcon(selectedRecord.type); return <Icon size={24} color={typeColor(selectedRecord.type, colors)} />; })()}
              </div>
              <div style={{ fontSize: 28, fontWeight: 200, color: colors.text, letterSpacing: "-1px" }}>
                {formatNaira(selectedRecord.amount)}
              </div>
              <div style={{
                fontSize: 11, fontWeight: 600, marginTop: 6, textTransform: "capitalize",
                color: selectedRecord.status === "verified" ? colors.success : colors.error,
                background: `${selectedRecord.status === "verified" ? colors.success : colors.error}15`,
                padding: "4px 12px", borderRadius: 100, display: "inline-block",
              }}>
                {selectedRecord.status === "verified" ? "Verified" : "Flagged"}
              </div>
            </div>

            <div style={{ background: colors.surfaceElevated, borderRadius: 16, padding: 18 }}>
              {[
                { label: "Type", value: selectedRecord.type.charAt(0).toUpperCase() + selectedRecord.type.slice(1) },
                { label: "From", value: selectedRecord.from },
                { label: "To", value: selectedRecord.to },
                { label: "Timestamp", value: selectedRecord.timestamp },
                { label: "Transaction Hash", value: selectedRecord.hash },
                ...(selectedRecord.vendor ? [{ label: "Vendor", value: selectedRecord.vendor }] : []),
                ...(selectedRecord.location ? [{ label: "Location", value: selectedRecord.location }] : []),
              ].map((row, i, arr) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "12px 0",
                  borderBottom: i < arr.length - 1 ? `1px solid ${colors.border}` : "none",
                }}>
                  <span style={{ fontSize: 12, color: colors.textMuted }}>{row.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: colors.text, textAlign: "right", maxWidth: "60%" }}>
                    {row.label === "Transaction Hash" ? <span className="hash-badge">{row.value}</span> : row.value}
                  </span>
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

      {/* ─── TRACEABILITY DETAIL SHEET ────────────────────────── */}
      {selectedTrace && (
        <>
          <div className="overlay" onClick={() => setSelectedTrace(null)} />
          <div className="detail-sheet">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>Credit Lifecycle</span>
              <button onClick={() => setSelectedTrace(null)} style={{
                width: 32, height: 32, borderRadius: "50%", border: `1px solid ${colors.border}`,
                background: colors.surface, display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: colors.text,
              }}>
                <span style={{ fontSize: 14 }}>X</span>
              </button>
            </div>

            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 16, fontWeight: 700, color: colors.accent, marginBottom: 8 }}>
                {selectedTrace.creditId}
              </div>
              <div style={{
                fontSize: 11, fontWeight: 600,
                color: selectedTrace.status === "active" ? colors.success : colors.accent,
                background: selectedTrace.status === "active" ? `${colors.success}15` : colors.accentSoft,
                padding: "4px 12px", borderRadius: 100, display: "inline-block",
              }}>
                {selectedTrace.status.charAt(0).toUpperCase() + selectedTrace.status.slice(1)}
              </div>
            </div>

            <div style={{ background: colors.surfaceElevated, borderRadius: 16, padding: 18, marginBottom: 20 }}>
              {[
                { label: "Origin", value: selectedTrace.origin },
                { label: "Current Holder", value: selectedTrace.currentHolder },
                { label: "Purchased", value: selectedTrace.purchaseDate },
                { label: "Expires", value: selectedTrace.expiryDate },
                { label: "Total Transfers", value: String(selectedTrace.totalTransfers) },
              ].map((row, i, arr) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "10px 0",
                  borderBottom: i < arr.length - 1 ? `1px solid ${colors.border}` : "none",
                }}>
                  <span style={{ fontSize: 12, color: colors.textMuted }}>{row.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{row.value}</span>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 12 }}>
              Timeline
            </div>

            {selectedTrace.timeline.map((event, i) => (
              <div key={i} className="timeline-item" style={{ marginBottom: i < selectedTrace.timeline.length - 1 ? 20 : 0 }}>
                <div className="timeline-dot" />
                {i < selectedTrace.timeline.length - 1 && <div className="timeline-line" />}
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{event.event}</div>
                  <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>{event.date}</div>
                  <div style={{ fontSize: 11, color: colors.textSecondary, marginTop: 1 }}>{event.actor}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
