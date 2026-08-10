import { useState } from "react";
import {
  ArrowLeft, Building2, Users, Wallet, BarChart3, Settings,
  ChevronRight, Download, Plus, TrendingUp, Clock, Check, X, Zap, Search
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

// ─── Types ────────────────────────────────────────────────────────
type Tab = "overview" | "beneficiaries" | "programs" | "reports";

interface Program {
  id: string;
  name: string;
  type: "meal_plan" | "food_support" | "scholarship" | "emergency";
  budget: number;
  spent: number;
  beneficiaries: number;
  status: "active" | "paused" | "completed";
  startDate: string;
  endDate: string;
}

interface Beneficiary {
  id: string;
  name: string;
  email: string;
  department?: string;
  allocatedCredits: number;
  usedCredits: number;
  status: "active" | "inactive" | "suspended";
  lastRedemption: string;
}

interface Distribution {
  id: string;
  date: string;
  amount: number;
  program: string;
  beneficiaries: number;
  status: "completed" | "pending" | "failed";
}

// ─── Data ─────────────────────────────────────────────────────────
const SAMPLE_PROGRAMS: Program[] = [];

const SAMPLE_BENEFICIARIES: Beneficiary[] = [];

const SAMPLE_DISTRIBUTIONS: Distribution[] = [];

// ─── Helpers ──────────────────────────────────────────────────────
const formatNaira = (n: number) => `\u20A6${n.toLocaleString()}`;

// ─── Main Component ───────────────────────────────────────────────
export default function InstitutionalDashboard() {
  const { colors } = useTheme();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const totalBudget = SAMPLE_PROGRAMS.reduce((s, p) => s + p.budget, 0);
  const totalSpent = SAMPLE_PROGRAMS.reduce((s, p) => s + p.spent, 0);
  const totalBeneficiaries = SAMPLE_PROGRAMS.reduce((s, p) => s + p.beneficiaries, 0);
  const activePrograms = SAMPLE_PROGRAMS.filter(p => p.status === "active").length;

  const filteredBeneficiaries = SAMPLE_BENEFICIARIES.filter(b =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.department?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .inst-shell {
          font-family: 'Sora', sans-serif;
          background: ${colors.bg};
          min-height: 100svh;
          max-width: 430px;
          margin: 0 auto;
          color: ${colors.text};
          padding: 0 20px 100px;
        }
        .inst-anim { animation: fadeIn .35s ease both; }
        .stat-card {
          flex: 1;
          background: ${colors.surface};
          border: 1px solid ${colors.border};
          border-radius: 16px;
          padding: 14px;
          text-align: center;
        }
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
        .program-card {
          background: ${colors.surface};
          border: 1px solid ${colors.border};
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 10px;
        }
        .beneficiary-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 0;
          border-bottom: 1px solid ${colors.border};
        }
        .distribution-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 0;
          border-bottom: 1px solid ${colors.border};
        }
        .search-input {
          width: 100%;
          background: ${colors.inputBg};
          border: 1px solid ${colors.border};
          border-radius: 14px;
          padding: 12px 16px 12px 40px;
          font-size: 13px;
          color: ${colors.text};
          font-family: 'Sora', sans-serif;
          outline: none;
        }
        .search-input:focus { border-color: ${colors.accent}; }
        .search-input::placeholder { color: ${colors.textMuted}; }
      `}</style>

      <div className="inst-shell">
        {/* ─── HEADER ─────────────────────────────────────────── */}
        <div className="inst-anim" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", marginBottom: 8 }}>
          <button onClick={() => navigate("/home")} style={{
            width: 42, height: 42, borderRadius: "50%", border: `1px solid ${colors.border}`,
            background: colors.surface, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: colors.text,
          }}>
            <ArrowLeft size={17} />
          </button>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Institutional Dashboard</span>
          <button onClick={() => alert("Settings coming soon!")} style={{
            width: 42, height: 42, borderRadius: "50%", border: `1px solid ${colors.border}`,
            background: colors.surface, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: colors.text,
          }}>
            <Settings size={17} />
          </button>
        </div>

        {/* ─── OVERVIEW STATS ─────────────────────────────────── */}
        <div className="inst-anim" style={{ display: "flex", gap: 10, marginBottom: 20, animationDelay: ".05s" }}>
          <div className="stat-card">
            <Wallet size={16} color={colors.accent} style={{ marginBottom: 6 }} />
            <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{formatNaira(totalBudget)}</div>
            <div style={{ fontSize: 10, color: colors.textMuted, marginTop: 2 }}>Total Budget</div>
          </div>
          <div className="stat-card">
            <TrendingUp size={16} color={colors.warning} style={{ marginBottom: 6 }} />
            <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{formatNaira(totalSpent)}</div>
            <div style={{ fontSize: 10, color: colors.textMuted, marginTop: 2 }}>Total Spent</div>
          </div>
          <div className="stat-card">
            <Users size={16} color={colors.success} style={{ marginBottom: 6 }} />
            <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{totalBeneficiaries}</div>
            <div style={{ fontSize: 10, color: colors.textMuted, marginTop: 2 }}>Beneficiaries</div>
          </div>
        </div>

        {/* ─── TAB NAV ────────────────────────────────────────── */}
        <div className="inst-anim" style={{ display: "flex", gap: 4, marginBottom: 24, animationDelay: ".1s" }}>
          {([
            { id: "overview" as Tab, icon: BarChart3, label: "Overview" },
            { id: "beneficiaries" as Tab, icon: Users, label: "People" },
            { id: "programs" as Tab, icon: Zap, label: "Programs" },
            { id: "reports" as Tab, icon: Download, label: "Reports" },
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

        {/* ─── TAB: OVERVIEW ──────────────────────────────────── */}
        {activeTab === "overview" && (
          <div className="inst-anim" style={{ animationDelay: ".15s" }}>
            {/* Budget Utilization */}
            <div style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 16, padding: 18, marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 14 }}>
                Budget Utilization
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: colors.textSecondary }}>Spent</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{Math.round((totalSpent / totalBudget) * 100)}%</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: colors.surfaceElevated, marginBottom: 16 }}>
                <div style={{
                  height: "100%", borderRadius: 4,
                  width: `${(totalSpent / totalBudget) * 100}%`,
                  background: `linear-gradient(90deg, ${colors.accent}, ${colors.accent}80)`,
                  transition: "width .5s ease",
                }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span style={{ color: colors.textMuted }}>{formatNaira(totalSpent)} spent</span>
                <span style={{ color: colors.textMuted }}>{formatNaira(totalBudget - totalSpent)} remaining</span>
              </div>
            </div>

            {/* Active Programs */}
            <div style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 12 }}>
              Active Programs ({activePrograms})
            </div>

            {SAMPLE_PROGRAMS.filter(p => p.status === "active").map(program => (
              <div key={program.id} className="program-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{program.name}</div>
                    <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>
                      {program.type.replace("_", " ").toUpperCase()} · {program.beneficiaries} beneficiaries
                    </div>
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 600, color: colors.success,
                    background: `${colors.success}15`, padding: "4px 10px", borderRadius: 100,
                  }}>
                    Active
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12 }}>
                  <span style={{ color: colors.textSecondary }}>Budget Used</span>
                  <span style={{ fontWeight: 600, color: colors.text }}>{Math.round((program.spent / program.budget) * 100)}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: colors.surfaceElevated }}>
                  <div style={{
                    height: "100%", borderRadius: 3,
                    width: `${(program.spent / program.budget) * 100}%`,
                    background: colors.accent,
                  }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11 }}>
                  <span style={{ color: colors.textMuted }}>{formatNaira(program.spent)} / {formatNaira(program.budget)}</span>
                  <span style={{ color: colors.textMuted }}>{program.startDate} - {program.endDate}</span>
                </div>
              </div>
            ))}

            {/* Recent Distributions */}
            <div style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, letterSpacing: "0.5px", textTransform: "uppercase", marginTop: 20, marginBottom: 12 }}>
              Recent Distributions
            </div>

            {SAMPLE_DISTRIBUTIONS.slice(0, 3).map(d => (
              <div key={d.id} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 0",
                borderBottom: `1px solid ${colors.border}`,
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: "50%",
                  background: d.status === "completed" ? `${colors.success}15` : `${colors.warning}15`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: d.status === "completed" ? colors.success : colors.warning,
                }}>
                  {d.status === "completed" ? <Check size={18} /> : <Clock size={18} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{d.program}</div>
                  <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>{d.date} · {d.beneficiaries} people</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{formatNaira(d.amount)}</div>
              </div>
            ))}
          </div>
        )}

        {/* ─── TAB: BENEFICIARIES ─────────────────────────────── */}
        {activeTab === "beneficiaries" && (
          <div className="inst-anim" style={{ animationDelay: ".15s" }}>
            {/* Search */}
            <div style={{ position: "relative", marginBottom: 20 }}>
              <Search size={16} color={colors.textMuted} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
              <input
                className="search-input"
                placeholder="Search beneficiaries..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Add Beneficiary */}
            <button onClick={() => alert("Add beneficiary coming soon!")} style={{
              width: "100%", padding: "14px", borderRadius: 14,
              border: `1px dashed ${colors.accent}`, background: "transparent",
              color: colors.accent, fontSize: 13, fontWeight: 700,
              cursor: "pointer", fontFamily: "'Sora', sans-serif",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              marginBottom: 20,
            }}>
              <Plus size={14} /> Add Beneficiary
            </button>

            {/* Beneficiary List */}
            {filteredBeneficiaries.map(b => (
              <div key={b.id} className="beneficiary-row">
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${colors.accent}25, ${colors.accent}10)`,
                  border: `1px solid ${colors.accent}20`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 700, color: colors.accent, flexShrink: 0,
                }}>
                  {b.name.split(" ").map(w => w[0]).join("")}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{b.name}</div>
                  <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 1 }}>
                    {b.department} · Last: {b.lastRedemption}
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                        <span style={{ fontSize: 9, color: colors.textMuted }}>Used</span>
                        <span style={{ fontSize: 9, fontWeight: 600, color: colors.text }}>{Math.round((b.usedCredits / b.allocatedCredits) * 100)}%</span>
                      </div>
                      <div style={{ height: 4, borderRadius: 2, background: colors.surfaceElevated }}>
                        <div style={{
                          height: "100%", borderRadius: 2,
                          width: `${(b.usedCredits / b.allocatedCredits) * 100}%`,
                          background: colors.accent,
                        }} />
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: colors.text }}>
                    {formatNaira(b.allocatedCredits - b.usedCredits)}
                  </div>
                  <div style={{ fontSize: 10, color: colors.textMuted, marginTop: 2 }}>remaining</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── TAB: PROGRAMS ──────────────────────────────────── */}
        {activeTab === "programs" && (
          <div className="inst-anim" style={{ animationDelay: ".15s" }}>
            <button onClick={() => alert("Create program coming soon!")} style={{
              width: "100%", padding: "14px", borderRadius: 14,
              background: colors.accent, color: "#0A0A0A",
              fontSize: 13, fontWeight: 700, border: "none",
              cursor: "pointer", fontFamily: "'Sora', sans-serif",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              marginBottom: 20,
            }}>
              <Plus size={14} /> Create Program
            </button>

            {SAMPLE_PROGRAMS.map(program => (
              <div key={program.id} className="program-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{program.name}</div>
                    <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>
                      {program.type.replace("_", " ").toUpperCase()} · {program.beneficiaries} people
                    </div>
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 600,
                    color: program.status === "active" ? colors.success : program.status === "paused" ? colors.warning : colors.textMuted,
                    background: program.status === "active" ? `${colors.success}15` : program.status === "paused" ? `${colors.warning}15` : colors.surfaceElevated,
                    padding: "4px 10px", borderRadius: 100,
                  }}>
                    {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12 }}>
                  <span style={{ color: colors.textSecondary }}>Budget Used</span>
                  <span style={{ fontWeight: 600, color: colors.text }}>{Math.round((program.spent / program.budget) * 100)}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: colors.surfaceElevated }}>
                  <div style={{
                    height: "100%", borderRadius: 3,
                    width: `${(program.spent / program.budget) * 100}%`,
                    background: program.status === "active" ? colors.accent : colors.textMuted,
                  }} />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, paddingTop: 12, borderTop: `1px solid ${colors.border}` }}>
                  <span style={{ fontSize: 11, color: colors.textMuted }}>{formatNaira(program.spent)} / {formatNaira(program.budget)}</span>
                  <span style={{ fontSize: 11, color: colors.textMuted }}>{program.startDate} - {program.endDate}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── TAB: REPORTS ───────────────────────────────────── */}
        {activeTab === "reports" && (
          <div className="inst-anim" style={{ animationDelay: ".15s" }}>
            {/* Export Options */}
            <div style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 12 }}>
              Export Reports
            </div>

            {[
              { icon: <BarChart3 size={18} />, label: "Program Summary", desc: "Overview of all programs", format: "PDF" },
              { icon: <Users size={18} />, label: "Beneficiary Report", desc: "Individual usage details", format: "CSV" },
              { icon: <Wallet size={18} />, label: "Financial Report", desc: "Budget and spending breakdown", format: "PDF" },
              { icon: <TrendingUp size={18} />, label: "Usage Analytics", desc: "Redemption patterns and trends", format: "PDF" },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 16, padding: "16px 18px",
                background: colors.surface, border: `1px solid ${colors.border}`,
                borderRadius: 16, marginBottom: 10, cursor: "pointer",
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: "50%", background: colors.accentSoft,
                  display: "flex", alignItems: "center", justifyContent: "center", color: colors.accent,
                }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 1 }}>{item.desc}</div>
                </div>
                <button onClick={() => alert(`${item.label} downloaded as ${item.format}`)} style={{
                  padding: "6px 12px", borderRadius: 8, border: `1px solid ${colors.border}`,
                  background: colors.surface, color: colors.text, fontSize: 11, fontWeight: 600,
                  cursor: "pointer", fontFamily: "'Sora', sans-serif",
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  <Download size={12} /> {item.format}
                </button>
              </div>
            ))}

            {/* Program Performance */}
            <div style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, letterSpacing: "0.5px", textTransform: "uppercase", marginTop: 24, marginBottom: 12 }}>
              Program Performance
            </div>

            {SAMPLE_PROGRAMS.map(p => {
              const utilization = Math.round((p.spent / p.budget) * 100);
              const avgPerPerson = Math.round(p.spent / p.beneficiaries);
              return (
                <div key={p.id} style={{
                  background: colors.surface, border: `1px solid ${colors.border}`,
                  borderRadius: 16, padding: 16, marginBottom: 10,
                }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: colors.text, marginBottom: 10 }}>{p.name}</div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: colors.accent }}>{utilization}%</div>
                      <div style={{ fontSize: 10, color: colors.textMuted }}>Utilization</div>
                    </div>
                    <div style={{ width: 1, background: colors.border }} />
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: colors.text }}>{formatNaira(avgPerPerson)}</div>
                      <div style={{ fontSize: 10, color: colors.textMuted }}>Avg/Person</div>
                    </div>
                    <div style={{ width: 1, background: colors.border }} />
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: colors.text }}>{p.beneficiaries}</div>
                      <div style={{ fontSize: 10, color: colors.textMuted }}>People</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
