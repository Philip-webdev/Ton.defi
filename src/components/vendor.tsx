import { useState, useEffect } from "react";
import {
  ArrowLeft, QrCode, Package, DollarSign, BarChart3, Megaphone,
  Check, X, Clock, TrendingUp, Users, ShoppingCart, Eye,
  ChevronRight, Download, Settings, Bell, Scan, Zap, Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { fetchVendorDashboard, fetchVendorOrders, updateVendorOrderStatus, toggleVendorStatus, fetchVendorProfile, foodPay } from "../services/api";
import QRScanner from "./QRcode";

// ─── Types ────────────────────────────────────────────────────────
type Tab = "orders" | "analytics" | "settlement" | "promotions" | "settings";

interface VendorOrder {
  id: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: "pending" | "preparing" | "ready" | "completed" | "cancelled";
  customer: string;
  time: string;
  paymentMethod: "food_credits" | "cash" | "card";
}

interface DailyStats {
  revenue: number;
  orders: number;
  avgOrder: number;
  topItem: string;
}

interface Promotion {
  id: string;
  title: string;
  type: "discount" | "happy_hour" | "loyalty" | "bundle";
  value: string;
  active: boolean;
  usageCount: number;
}

// ─── Data ─────────────────────────────────────────────────────────
const SAMPLE_ORDERS: VendorOrder[] = [];

const WEEKLY_STATS = [
  { day: "Mon", revenue: 45000, orders: 18 },
  { day: "Tue", revenue: 52000, orders: 22 },
  { day: "Wed", revenue: 38000, orders: 15 },
  { day: "Thu", revenue: 61000, orders: 26 },
  { day: "Fri", revenue: 78000, orders: 32 },
  { day: "Sat", revenue: 95000, orders: 41 },
  { day: "Sun", revenue: 82000, orders: 35 },
];

const SAMPLE_PROMOTIONS: Promotion[] = [];

const SAMPLE_SETTLEMENTS = [] as any[];

// ─── Helpers ──────────────────────────────────────────────────────
const formatNaira = (n: number) => `\u20A6${n.toLocaleString()}`;

const statusColor = (status: string, colors: any) => {
  const map: Record<string, string> = {
    pending: colors.warning,
    preparing: colors.accent,
    ready: colors.success,
    completed: colors.success,
    cancelled: colors.error,
  };
  return map[status] || colors.textMuted;
};

// ─── Main Component ───────────────────────────────────────────────
export default function VendorPortal() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const email = localStorage.getItem("email") || "";

  const [activeTab, setActiveTab] = useState<Tab>("orders");
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scannedPayment, setScannedPayment] = useState<{ buyerEmail: string; amount: number; reference: string } | null>(null);
  const [paying, setPaying] = useState(false);
  const [paySuccess, setPaySuccess] = useState<{ buyerBalance: number; vendorBalance: number } | null>(null);
  const [orders, setOrders] = useState<VendorOrder[]>([]);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [vendorProfile, setVendorProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
    loadOrders();
  }, [email]);

  const loadDashboard = async () => {
    if (!email) return;
    try {
      const data = await fetchVendorDashboard(email);
      setDashboardData(data);
      setVendorProfile(data?.vendor);
    } catch {}
  };

  const loadOrders = async () => {
    if (!email) return;
    try {
      const data = await fetchVendorOrders(email);
      if (Array.isArray(data)) {
        setOrders(data.map((o: any) => ({
          id: o.orderId || o._id,
          items: o.items || [],
          total: o.total,
          status: o.status,
          customer: o.customerName || "Customer",
          time: o.time || o.createdAt,
          paymentMethod: o.paymentMethod || "food_credits",
        })));
      }
    } catch {}
    setLoading(false);
  };

  const todayStats: DailyStats = {
    revenue: dashboardData?.stats?.totalRevenue || orders.reduce((s, o) => s + o.total, 0),
    orders: dashboardData?.stats?.totalOrders || orders.length,
    avgOrder: dashboardData?.stats?.avgOrderValue || (orders.length > 0 ? Math.round(orders.reduce((s, o) => s + o.total, 0) / orders.length) : 0),
    topItem: "Jollof Rice + Chicken",
  };

  const handleScan = () => {
    setScanning(true);
    setScanResult(null);
    setScannedPayment(null);
    setPaySuccess(null);
  };

  const handleQRScan = async (decodedText: string) => {
    try {
      const data = JSON.parse(decodedText);
      if (data.buyerEmail && data.amount && data.reference) {
        setScannedPayment(data);
        setScanResult(`Buyer: ${data.buyerEmail}\nAmount: ₦${data.amount.toLocaleString()}`);
        setScanning(false);
      }
    } catch {
      setScanResult("Invalid QR code");
      setScanning(false);
    }
  };

  const handleConfirmPayment = async () => {
    if (!scannedPayment || !email) return;
    setPaying(true);
    try {
      const result = await foodPay(scannedPayment.buyerEmail, email, scannedPayment.amount, scannedPayment.reference);
      if (result.error) {
        alert(result.error);
      } else if (result.success) {
        setPaySuccess({ buyerBalance: result.buyerBalance, vendorBalance: result.vendorBalance });
        setScanResult(null);
        setScannedPayment(null);
        loadDashboard();
        loadOrders();
      }
    } catch (e) {
      console.error("Payment failed:", e);
    }
    setPaying(false);
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: VendorOrder["status"]) => {
    try {
      await updateVendorOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      loadDashboard();
    } catch (e) {
      console.error("Failed to update order:", e);
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .vendor-shell {
          font-family: 'Sora', sans-serif;
          background: ${colors.bg};
          min-height: 100svh;
          max-width: 430px;
          margin: 0 auto;
          color: ${colors.text};
          padding: 0 20px 100px;
        }
        .vendor-anim { animation: fadeIn .35s ease both; }
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
        .order-card {
          background: ${colors.surface};
          border: 1px solid ${colors.border};
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 10px;
          animation: fadeIn .3s ease both;
        }
        .scan-area {
          width: 200px;
          height: 200px;
          border: 2px dashed ${colors.accent};
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 24px auto;
          position: relative;
          overflow: hidden;
        }
        .scan-area::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          background: ${colors.accent};
          animation: scanLine 2s linear infinite;
        }
        @keyframes scanLine {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .promo-card {
          background: ${colors.surface};
          border: 1px solid ${colors.border};
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .settlement-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0;
          border-bottom: 1px solid ${colors.border};
        }
        .bar-chart {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          height: 120px;
          padding: 0 4px;
        }
        .bar {
          flex: 1;
          border-radius: 6px 6px 0 0;
          position: relative;
          transition: height .5s ease;
        }
        .bar-label {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 9px;
          color: ${colors.textMuted};
          white-space: nowrap;
        }
      `}</style>

      <div className="vendor-shell">
        {/* ─── HEADER ─────────────────────────────────────────── */}
        <div className="vendor-anim" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", marginBottom: 8 }}>
          <button onClick={() => navigate("/home")} style={{
            width: 42, height: 42, borderRadius: "50%", border: `1px solid ${colors.border}`,
            background: colors.surface, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: colors.text,
          }}>
            <ArrowLeft size={17} />
          </button>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>Vendor Portal</span>
            <div style={{ fontSize: 10, color: colors.textMuted, marginTop: 2 }}>Mama Nkechi Kitchen</div>
          </div>
          <button onClick={() => alert("No new notifications")} style={{
            width: 42, height: 42, borderRadius: "50%", border: `1px solid ${colors.border}`,
            background: colors.surface, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: colors.text, position: "relative",
          }}>
            <Bell size={17} />
            <div style={{
              position: "absolute", top: 6, right: 6,
              width: 8, height: 8, borderRadius: "50%", background: colors.error,
            }} />
          </button>
        </div>

        {/* ─── TODAY'S STATS ──────────────────────────────────── */}
        <div className="vendor-anim" style={{ display: "flex", gap: 10, marginBottom: 20, animationDelay: ".05s" }}>
          <div className="stat-card">
            <DollarSign size={16} color={colors.accent} style={{ marginBottom: 6 }} />
            <div style={{ fontSize: 16, fontWeight: 700, color: colors.text }}>{formatNaira(todayStats.revenue)}</div>
            <div style={{ fontSize: 10, color: colors.textMuted, marginTop: 2 }}>Today's Revenue</div>
          </div>
          <div className="stat-card">
            <ShoppingCart size={16} color={colors.success} style={{ marginBottom: 6 }} />
            <div style={{ fontSize: 16, fontWeight: 700, color: colors.text }}>{todayStats.orders}</div>
            <div style={{ fontSize: 10, color: colors.textMuted, marginTop: 2 }}>Orders</div>
          </div>
          <div className="stat-card">
            <TrendingUp size={16} color={colors.warning} style={{ marginBottom: 6 }} />
            <div style={{ fontSize: 16, fontWeight: 700, color: colors.text }}>{formatNaira(todayStats.avgOrder)}</div>
            <div style={{ fontSize: 10, color: colors.textMuted, marginTop: 2 }}>Avg Order</div>
          </div>
        </div>

        {/* ─── TAB NAV ────────────────────────────────────────── */}
        <div className="vendor-anim" style={{ display: "flex", gap: 4, marginBottom: 24, animationDelay: ".1s" }}>
          {([
            { id: "orders" as Tab, icon: Package, label: "Orders" },
            { id: "analytics" as Tab, icon: BarChart3, label: "Analytics" },
            { id: "settlement" as Tab, icon: DollarSign, label: "Settle" },
            { id: "promotions" as Tab, icon: Megaphone, label: "Promos" },
            { id: "settings" as Tab, icon: Settings, label: "More" },
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

        {/* ─── TAB: ORDERS ────────────────────────────────────── */}
        {activeTab === "orders" && (
          <div className="vendor-anim" style={{ animationDelay: ".15s" }}>
            {/* QR Scanner Button */}
            <button onClick={handleScan} style={{
              width: "100%", padding: "14px", borderRadius: 14,
              background: colors.accent, color: "#0A0A0A",
              fontSize: 13, fontWeight: 700, border: "none",
              cursor: "pointer", fontFamily: "'Sora', sans-serif",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              marginBottom: 20, boxShadow: `0 8px 32px ${colors.accent}30`,
            }}>
              <Scan size={16} /> Scan Food Credit QR
            </button>

            {/* Live QR Scanner */}
            {scanning && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: colors.accent, marginBottom: 8, textAlign: "center" }}>
                  Point camera at customer's QR code
                </div>
                <div style={{ borderRadius: 16, overflow: "hidden", border: `2px solid ${colors.accent}` }}>
                  <QRScanner onRender={handleQRScan} />
                </div>
                <button onClick={() => setScanning(false)} style={{
                  width: "100%", padding: "10px", borderRadius: 10,
                  border: `1px solid ${colors.error}`, background: "transparent",
                  color: colors.error, fontSize: 12, fontWeight: 700,
                  cursor: "pointer", fontFamily: "'Sora', sans-serif",
                  marginTop: 10,
                }}>
                  Cancel
                </button>
              </div>
            )}

            {/* Payment Confirmation */}
            {scannedPayment && !paySuccess && (
              <div style={{
                background: colors.surface, border: `1px solid ${colors.border}`,
                borderRadius: 16, padding: 18, marginBottom: 16,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: colors.text, marginBottom: 12 }}>Confirm Payment</div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: colors.textMuted }}>Buyer</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: colors.text }}>{scannedPayment.buyerEmail}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ fontSize: 12, color: colors.textMuted }}>Amount</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: colors.accent }}>{formatNaira(scannedPayment.amount)}</span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={handleConfirmPayment} disabled={paying} style={{
                    flex: 1, padding: "12px", borderRadius: 10, border: "none",
                    background: colors.accent, color: "#0A0A0A", fontSize: 13, fontWeight: 700,
                    cursor: paying ? "not-allowed" : "pointer", fontFamily: "'Sora', sans-serif",
                    opacity: paying ? 0.6 : 1,
                  }}>
                    {paying ? "Processing..." : `Confirm ${formatNaira(scannedPayment.amount)}`}
                  </button>
                  <button onClick={() => { setScannedPayment(null); setScanResult(null); }} style={{
                    flex: 1, padding: "12px", borderRadius: 10,
                    border: `1px solid ${colors.border}`, background: "transparent",
                    color: colors.textMuted, fontSize: 13, fontWeight: 700,
                    cursor: "pointer", fontFamily: "'Sora', sans-serif",
                  }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Payment Success */}
            {paySuccess && (
              <div style={{
                background: `${colors.success}15`, border: `1px solid ${colors.success}30`,
                borderRadius: 14, padding: 16, marginBottom: 16,
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <Check size={20} color={colors.success} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: colors.success }}>Payment Successful</div>
                  <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>
                    Received {formatNaira(paySuccess.vendorBalance > 0 ? scannedPayment?.amount || 0 : 0)} · Balance: {formatNaira(paySuccess.vendorBalance)}
                  </div>
                </div>
                <button onClick={() => setPaySuccess(null)} style={{
                  background: "none", border: "none", cursor: "pointer", color: colors.textMuted,
                }}>
                  <X size={14} />
                </button>
              </div>
            )}

            {/* Scan Result (errors) */}
            {scanResult && !scannedPayment && (
              <div style={{
                background: `${colors.success}15`, border: `1px solid ${colors.success}30`,
                borderRadius: 14, padding: 14, marginBottom: 16,
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <Check size={18} color={colors.success} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: colors.success }}>QR Scanned Successfully</div>
                  <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>{scanResult}</div>
                </div>
                <button onClick={() => setScanResult(null)} style={{
                  background: "none", border: "none", cursor: "pointer", color: colors.textMuted,
                }}>
                  <X size={14} />
                </button>
              </div>
            )}

            {/* Pending Orders */}
            <div style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 12 }}>
              Incoming Orders ({orders.filter(o => o.status === "pending").length})
            </div>

            {orders.filter(o => o.status === "pending" || o.status === "preparing" || o.status === "ready").map(order => (
              <div key={order.id} className="order-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{order.id}</span>
                    <span style={{ fontSize: 11, color: colors.textMuted, marginLeft: 8 }}>{order.customer}</span>
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 600, color: statusColor(order.status, colors),
                    background: `${statusColor(order.status, colors)}15`,
                    padding: "4px 10px", borderRadius: 100,
                  }}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                {order.items.map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 12 }}>
                    <span style={{ color: colors.textSecondary }}>{item.qty}x {item.name}</span>
                    <span style={{ color: colors.text, fontWeight: 600 }}>{formatNaira(item.price * item.qty)}</span>
                  </div>
                ))}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, paddingTop: 10, borderTop: `1px solid ${colors.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{
                      fontSize: 9, fontWeight: 600, color: order.paymentMethod === "food_credits" ? colors.accent : colors.textMuted,
                      background: order.paymentMethod === "food_credits" ? colors.accentSoft : colors.surfaceElevated,
                      padding: "3px 8px", borderRadius: 100,
                    }}>
                      {order.paymentMethod === "food_credits" ? "Food Credits" : order.paymentMethod === "cash" ? "Cash" : "Card"}
                    </span>
                    <span style={{ fontSize: 11, color: colors.textMuted }}>{order.time}</span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: colors.accent }}>{formatNaira(order.total)}</span>
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  {order.status === "pending" && (
                    <>
                      <button onClick={() => handleUpdateOrderStatus(order.id, "preparing")} style={{
                        flex: 1, padding: "10px", borderRadius: 10, border: "none",
                        background: colors.accent, color: "#0A0A0A", fontSize: 12, fontWeight: 700,
                        cursor: "pointer", fontFamily: "'Sora', sans-serif",
                      }}>
                        Accept
                      </button>
                      <button onClick={() => handleUpdateOrderStatus(order.id, "cancelled")} style={{
                        flex: 1, padding: "10px", borderRadius: 10,
                        border: `1px solid ${colors.error}`, background: "transparent",
                        color: colors.error, fontSize: 12, fontWeight: 700,
                        cursor: "pointer", fontFamily: "'Sora', sans-serif",
                      }}>
                        Reject
                      </button>
                    </>
                  )}
                  {order.status === "preparing" && (
                    <button onClick={() => handleUpdateOrderStatus(order.id, "ready")} style={{
                      width: "100%", padding: "10px", borderRadius: 10, border: "none",
                      background: colors.success, color: "#0A0A0A", fontSize: 12, fontWeight: 700,
                      cursor: "pointer", fontFamily: "'Sora', sans-serif",
                    }}>
                      Mark Ready
                    </button>
                  )}
                  {order.status === "ready" && (
                    <button onClick={() => handleUpdateOrderStatus(order.id, "completed")} style={{
                      width: "100%", padding: "10px", borderRadius: 10, border: "none",
                      background: colors.success, color: "#0A0A0A", fontSize: 12, fontWeight: 700,
                      cursor: "pointer", fontFamily: "'Sora', sans-serif",
                    }}>
                      Mark Picked Up
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Completed Orders */}
            <div style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, letterSpacing: "0.5px", textTransform: "uppercase", marginTop: 20, marginBottom: 12 }}>
              Completed Today
            </div>
            {orders.filter(o => o.status === "completed").map(order => (
              <div key={order.id} className="order-card" style={{ opacity: 0.7 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{order.id}</span>
                    <span style={{ fontSize: 11, color: colors.textMuted, marginLeft: 8 }}>{order.customer}</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{formatNaira(order.total)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── TAB: ANALYTICS ─────────────────────────────────── */}
        {activeTab === "analytics" && (
          <div className="vendor-anim" style={{ animationDelay: ".15s" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 16 }}>
              Weekly Revenue
            </div>

            {/* Bar Chart */}
            <div style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 16, padding: 18, marginBottom: 20 }}>
              <div className="bar-chart">
                {WEEKLY_STATS.map((stat, i) => {
                  const maxRevenue = Math.max(...WEEKLY_STATS.map(s => s.revenue));
                  const height = (stat.revenue / maxRevenue) * 100;
                  return (
                    <div key={stat.day} className="bar" style={{
                      height: `${height}%`,
                      background: i === WEEKLY_STATS.length - 1 ? colors.accent : `${colors.accent}40`,
                    }}>
                      <span className="bar-label">{stat.day}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ height: 24 }} />
            </div>

            {/* Summary Stats */}
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <div className="stat-card">
                <div style={{ fontSize: 18, fontWeight: 700, color: colors.text }}>
                  {formatNaira(WEEKLY_STATS.reduce((s, st) => s + st.revenue, 0))}
                </div>
                <div style={{ fontSize: 10, color: colors.textMuted, marginTop: 2 }}>Weekly Revenue</div>
              </div>
              <div className="stat-card">
                <div style={{ fontSize: 18, fontWeight: 700, color: colors.text }}>
                  {WEEKLY_STATS.reduce((s, st) => s + st.orders, 0)}
                </div>
                <div style={{ fontSize: 10, color: colors.textMuted, marginTop: 2 }}>Total Orders</div>
              </div>
            </div>

            {/* Top Items */}
            <div style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 12 }}>
              Top Items This Week
            </div>
            {[
              { name: "Jollof Rice + Chicken", orders: 45, revenue: 112500 },
              { name: "Fried Rice + Turkey", orders: 38, revenue: 114000 },
              { name: "Beans + Plantain", orders: 32, revenue: 57600 },
              { name: "Yam + Egg Sauce", orders: 28, revenue: 56000 },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 0",
                borderBottom: `1px solid ${colors.border}`,
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8, background: colors.accentSoft,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700, color: colors.accent,
                }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: colors.textMuted }}>{item.orders} orders</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{formatNaira(item.revenue)}</div>
              </div>
            ))}

            {/* Payment Breakdown */}
            <div style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, letterSpacing: "0.5px", textTransform: "uppercase", marginTop: 20, marginBottom: 12 }}>
              Payment Methods
            </div>
            <div style={{ background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 16, padding: 16 }}>
              {[
                { method: "Food Credits", percent: 62, color: colors.accent },
                { method: "Cash", percent: 25, color: colors.warning },
                { method: "Card", percent: 13, color: colors.success },
              ].map(p => (
                <div key={p.method} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: colors.textSecondary }}>{p.method}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: colors.text }}>{p.percent}%</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: colors.surfaceElevated }}>
                    <div style={{ height: "100%", width: `${p.percent}%`, borderRadius: 3, background: p.color, transition: "width .5s ease" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── TAB: SETTLEMENT ────────────────────────────────── */}
        {activeTab === "settlement" && (
          <div className="vendor-anim" style={{ animationDelay: ".15s" }}>
            {/* Pending Settlement */}
            <div style={{
              background: `linear-gradient(135deg, ${colors.accent}18, ${colors.accent}08)`,
              border: `1px solid ${colors.accent}25`,
              borderRadius: 20, padding: 24, marginBottom: 24, textAlign: "center",
            }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: colors.accent, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>
                Pending Settlement
              </div>
              <div style={{ fontSize: 36, fontWeight: 200, color: colors.text, letterSpacing: "-1px" }}>
                {formatNaira(SAMPLE_SETTLEMENTS[0].amount)}
              </div>
              <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 4 }}>
                {SAMPLE_SETTLEMENTS[0].orders} orders today
              </div>
              <button onClick={() => alert("Payout request submitted. Funds will arrive within 24 hours.")} style={{
                marginTop: 16, padding: "12px 24px", borderRadius: 12,
                background: colors.accent, color: "#0A0A0A",
                fontSize: 13, fontWeight: 700, border: "none",
                cursor: "pointer", fontFamily: "'Sora', sans-serif",
              }}>
                Request Payout
              </button>
            </div>

            {/* Settlement History */}
            <div style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 12 }}>
              Settlement History
            </div>

            {SAMPLE_SETTLEMENTS.map(s => (
              <div key={s.id} className="settlement-row">
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{s.date}</div>
                  <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>{s.orders} orders</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{formatNaira(s.amount)}</div>
                  <div style={{
                    fontSize: 10, fontWeight: 600, marginTop: 2,
                    color: s.status === "settled" ? colors.success : colors.warning,
                  }}>
                    {s.status === "settled" ? "Settled" : "Pending"}
                  </div>
                </div>
              </div>
            ))}

            <button onClick={() => alert("Statement downloaded")} style={{
              width: "100%", padding: "14px", borderRadius: 14,
              border: `1px solid ${colors.border}`, background: colors.surface,
              color: colors.text, fontSize: 13, fontWeight: 600, marginTop: 20,
              cursor: "pointer", fontFamily: "'Sora', sans-serif",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              <Download size={14} /> Download Statement
            </button>
          </div>
        )}

        {/* ─── TAB: PROMOTIONS ────────────────────────────────── */}
        {activeTab === "promotions" && (
          <div className="vendor-anim" style={{ animationDelay: ".15s" }}>
            <button onClick={() => alert("Promotion creation coming soon!")} style={{
              width: "100%", padding: "14px", borderRadius: 14,
              background: colors.accent, color: "#0A0A0A",
              fontSize: 13, fontWeight: 700, border: "none",
              cursor: "pointer", fontFamily: "'Sora', sans-serif",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              marginBottom: 20,
            }}>
              <Megaphone size={14} /> Create Promotion
            </button>

            {SAMPLE_PROMOTIONS.map(promo => (
              <div key={promo.id} className="promo-card">
                <div style={{
                  width: 42, height: 42, borderRadius: "50%",
                  background: promo.active ? `${colors.accent}15` : colors.surfaceElevated,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: promo.active ? colors.accent : colors.textMuted,
                  flexShrink: 0,
                }}>
                  {promo.type === "discount" ? <TrendingUp size={18} /> :
                   promo.type === "happy_hour" ? <Clock size={18} /> :
                   promo.type === "loyalty" ? <Star size={18} /> : <Zap size={18} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{promo.title}</div>
                  <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>
                    {promo.value} · {promo.usageCount} uses
                  </div>
                </div>
                <div style={{
                  width: 36, height: 20, borderRadius: 10,
                  background: promo.active ? colors.accent : colors.surfaceElevated,
                  position: "relative", cursor: "pointer",
                }}>
                  <div style={{
                    width: 16, height: 16, borderRadius: "50%", background: "white",
                    position: "absolute", top: 2, left: promo.active ? 18 : 2,
                    transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── TAB: SETTINGS ──────────────────────────────────── */}
        {activeTab === "settings" && (
          <div className="vendor-anim" style={{ animationDelay: ".15s" }}>
            {[
              { icon: <Settings size={18} />, label: "Store Settings", sub: "Name, hours, location", action: () => alert("Store settings coming soon!") },
              { icon: <Bell size={18} />, label: "Notifications", sub: "Order alerts, messages", action: () => alert("Notification settings coming soon!") },
              { icon: <Eye size={18} />, label: "Menu Management", sub: "Items, prices, availability", action: () => alert("Menu management coming soon!") },
              { icon: <Users size={18} />, label: "Staff Access", sub: "Manage team members", action: () => alert("Staff access coming soon!") },
              { icon: <BarChart3 size={18} />, label: "Reports", sub: "Export data, statements", action: () => alert("Reports coming soon!") },
            ].map((item, i) => (
              <div key={i} onClick={item.action} style={{
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
                  <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 1 }}>{item.sub}</div>
                </div>
                <ChevronRight size={16} color={colors.textMuted} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
