import { useState, useEffect, useCallback } from "react";
import {
  Home, ShoppingCart, Package, Search, ArrowLeft, Plus, Minus,
  Check, X, ChevronRight, Clock, MapPin, Bell, Star,
  Truck, Phone, CreditCard, Wallet, User, Settings,
  Zap, Wheat, Leaf, Apple, Drumstick, Egg, Coffee, Cookie, Flame, Baby,
  Cherry, Fish, Droplets, Wine, Gift, Store, Circle, Utensils,
  Milk, Banana, Beef, Salad, Cake, Scan, Brain, Send,
  ArrowUpRight, ArrowDownLeft, Sparkles, Shield, Building2, Moon, Sun
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import {
  getLocalCart, setLocalCart, addToLocalCart, updateLocalCartItemQty,
  createFoodOrder, fetchFoodOrders, getLocalBalance, fetchFoodWallet,
  updateProfile, fetchProfile, fetchWallet, fetchVA
} from "../services/api";

// ─── Types ────────────────────────────────────────────────────────
type Screen = "home" | "category" | "cart" | "orders" | "tracking" | "profile";

interface Vendor {
  id: string; name: string; rating: number; location: string;
  openNow: boolean; deliveryTime: string; image?: string;
}

interface Product {
  id: number; name: string; price: number; unit: string;
  icon: React.ReactNode; image: string; category: string;
  rating: number; inStock: boolean; desc: string;
  vendor: Vendor; stockLevel: "in_stock" | "low_stock" | "out_of_stock";
  redemptionOptions: string[];
}

interface CartItem extends Product { qty: number }

interface Order {
  id: string; items: CartItem[]; total: number;
  status: "preparing" | "on_the_way" | "delivered" | "cancelled";
  date: string; address: string; estimatedDelivery: string;
  driver?: { name: string; phone: string };
}

interface Category {
  id: string; name: string; icon: React.ReactNode; image: string;
}

// ─── Images ───────────────────────────────────────────────────────
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
  rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80",
  vegetables: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80",
  meat: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&q=80",
  dairy: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&q=80",
  beverages: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80",
  snacks: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&q=80",
  cooking: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&q=80",
  baby: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80",
  featured1: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
  featured2: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=80",
  featured3: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600&q=80",
  promo: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80",
  empty: "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=400&q=80",
};

// ─── Vendors ──────────────────────────────────────────────────────
const VENDORS: Vendor[] = [
  { id: "v1", name: "Mama Nkechi Kitchen", rating: 4.8, location: "Wuse Zone 5", openNow: true, deliveryTime: "20-30 min" },
  { id: "v2", name: "Campus Green Mart", rating: 4.6, location: "University Gate", openNow: true, deliveryTime: "15-25 min" },
  { id: "v3", name: "Fresh Basket Store", rating: 4.7, location: "Maitama District", openNow: true, deliveryTime: "25-35 min" },
  { id: "v4", name: "Campus Eats", rating: 4.5, location: "Student Village", openNow: false, deliveryTime: "30-40 min" },
];

// ─── Data ─────────────────────────────────────────────────────────
const CATEGORIES: Category[] = [
  { id: "staples", name: "Grains", icon: <Wheat size={18} />, image: IMAGES.rice },
  { id: "produce", name: "Fresh", icon: <Salad size={18} />, image: IMAGES.vegetables },
  { id: "protein", name: "Protein", icon: <Drumstick size={18} />, image: IMAGES.meat },
  { id: "dairy", name: "Dairy", icon: <Egg size={18} />, image: IMAGES.dairy },
  { id: "beverages", name: "Drinks", icon: <Coffee size={18} />, image: IMAGES.beverages },
  { id: "snacks", name: "Snacks", icon: <Cookie size={18} />, image: IMAGES.snacks },
  { id: "cooking", name: "Cooking", icon: <Flame size={18} />, image: IMAGES.cooking },
  { id: "baby", name: "Baby", icon: <Baby size={18} />, image: IMAGES.baby },
];

const PRODUCTS: Product[] = [
  { id: 1, name: "Long Grain Rice", price: 4500, unit: "5kg", icon: <Wheat size={20} />, image: IMAGES.rice, category: "staples", rating: 4.8, inStock: true, desc: "Premium parboiled rice", vendor: VENDORS[0], stockLevel: "in_stock", redemptionOptions: ["Food Credits", "Cash", "Card"] },
  { id: 2, name: "Semovita", price: 2800, unit: "2kg", icon: <Utensils size={20} />, image: IMAGES.rice, category: "staples", rating: 4.6, inStock: true, desc: "Smooth semolina", vendor: VENDORS[1], stockLevel: "in_stock", redemptionOptions: ["Food Credits", "Cash"] },
  { id: 3, name: "Wheat Flour", price: 3200, unit: "2kg", icon: <Wheat size={20} />, image: IMAGES.rice, category: "staples", rating: 4.5, inStock: true, desc: "Premium baking flour", vendor: VENDORS[2], stockLevel: "in_stock", redemptionOptions: ["Food Credits", "Cash", "Card"] },
  { id: 4, name: "Garri", price: 1800, unit: "1kg", icon: <Circle size={20} />, image: IMAGES.rice, category: "staples", rating: 4.7, inStock: true, desc: "White garri", vendor: VENDORS[0], stockLevel: "low_stock", redemptionOptions: ["Food Credits", "Cash"] },
  { id: 5, name: "Indomie Noodles", price: 3500, unit: "10 packs", icon: <Utensils size={20} />, image: IMAGES.rice, category: "staples", rating: 4.4, inStock: true, desc: "Mixed flavors", vendor: VENDORS[1], stockLevel: "in_stock", redemptionOptions: ["Food Credits", "Cash", "Card"] },
  { id: 6, name: "Fresh Tomatoes", price: 800, unit: "1kg", icon: <Cherry size={20} />, image: IMAGES.vegetables, category: "produce", rating: 4.9, inStock: true, desc: "Farm fresh", vendor: VENDORS[2], stockLevel: "in_stock", redemptionOptions: ["Food Credits", "Cash"] },
  { id: 7, name: "Scotch Bonnet", price: 500, unit: "500g", icon: <Flame size={20} />, image: IMAGES.vegetables, category: "produce", rating: 4.8, inStock: true, desc: "Hot atarodo", vendor: VENDORS[2], stockLevel: "in_stock", redemptionOptions: ["Food Credits", "Cash"] },
  { id: 8, name: "Fresh Onions", price: 600, unit: "1kg", icon: <Circle size={20} />, image: IMAGES.vegetables, category: "produce", rating: 4.6, inStock: true, desc: "Red onions", vendor: VENDORS[2], stockLevel: "in_stock", redemptionOptions: ["Food Credits", "Cash"] },
  { id: 9, name: "Ugwu Leaves", price: 400, unit: "bunch", icon: <Leaf size={20} />, image: IMAGES.vegetables, category: "produce", rating: 4.7, inStock: true, desc: "Fluted pumpkin", vendor: VENDORS[2], stockLevel: "low_stock", redemptionOptions: ["Food Credits", "Cash"] },
  { id: 10, name: "Green Beans", price: 700, unit: "500g", icon: <Leaf size={20} />, image: IMAGES.vegetables, category: "produce", rating: 4.5, inStock: true, desc: "Crisp beans", vendor: VENDORS[2], stockLevel: "in_stock", redemptionOptions: ["Food Credits", "Cash"] },
  { id: 11, name: "Frozen Chicken", price: 5500, unit: "1kg", icon: <Drumstick size={20} />, image: IMAGES.meat, category: "protein", rating: 4.3, inStock: true, desc: "Mixed cuts", vendor: VENDORS[0], stockLevel: "in_stock", redemptionOptions: ["Food Credits", "Cash", "Card"] },
  { id: 12, name: "Catfish", price: 3800, unit: "1kg", icon: <Fish size={20} />, image: IMAGES.meat, category: "protein", rating: 4.8, inStock: true, desc: "Fresh omo ada", vendor: VENDORS[0], stockLevel: "in_stock", redemptionOptions: ["Food Credits", "Cash"] },
  { id: 13, name: "Goat Meat", price: 6200, unit: "1kg", icon: <Beef size={20} />, image: IMAGES.meat, category: "protein", rating: 4.7, inStock: true, desc: "Cut to size", vendor: VENDORS[0], stockLevel: "low_stock", redemptionOptions: ["Food Credits", "Cash"] },
  { id: 14, name: "Eggs Crate", price: 3200, unit: "30 pcs", icon: <Egg size={20} />, image: IMAGES.dairy, category: "dairy", rating: 4.9, inStock: true, desc: "Large size", vendor: VENDORS[1], stockLevel: "in_stock", redemptionOptions: ["Food Credits", "Cash", "Card"] },
  { id: 15, name: "Peak Milk", price: 2400, unit: "900g", icon: <Milk size={20} />, image: IMAGES.dairy, category: "dairy", rating: 4.6, inStock: true, desc: "Full cream", vendor: VENDORS[1], stockLevel: "in_stock", redemptionOptions: ["Food Credits", "Cash"] },
  { id: 16, name: "Hollandia Yoghurt", price: 1200, unit: "1L", icon: <Milk size={20} />, image: IMAGES.dairy, category: "dairy", rating: 4.5, inStock: true, desc: "Creamy yoghurt", vendor: VENDORS[1], stockLevel: "in_stock", redemptionOptions: ["Food Credits", "Cash"] },
  { id: 17, name: "Pure Water", price: 300, unit: "1 bag", icon: <Droplets size={20} />, image: IMAGES.beverages, category: "beverages", rating: 4.2, inStock: true, desc: "12 sachets", vendor: VENDORS[3], stockLevel: "in_stock", redemptionOptions: ["Food Credits", "Cash"] },
  { id: 18, name: "Chivita Juice", price: 1500, unit: "1L", icon: <Wine size={20} />, image: IMAGES.beverages, category: "beverages", rating: 4.4, inStock: true, desc: "Orange flavor", vendor: VENDORS[1], stockLevel: "in_stock", redemptionOptions: ["Food Credits", "Cash", "Card"] },
  { id: 19, name: "Nescafe Classic", price: 2800, unit: "100g", icon: <Coffee size={20} />, image: IMAGES.beverages, category: "beverages", rating: 4.7, inStock: true, desc: "Instant coffee", vendor: VENDORS[1], stockLevel: "in_stock", redemptionOptions: ["Food Credits", "Cash"] },
  { id: 20, name: "Bournvita", price: 1900, unit: "500g", icon: <Coffee size={20} />, image: IMAGES.beverages, category: "beverages", rating: 4.5, inStock: true, desc: "Chocolate mix", vendor: VENDORS[1], stockLevel: "in_stock", redemptionOptions: ["Food Credits", "Cash"] },
  { id: 21, name: "Plantain Chips", price: 500, unit: "pack", icon: <Banana size={20} />, image: IMAGES.snacks, category: "snacks", rating: 4.6, inStock: true, desc: "Crispy slices", vendor: VENDORS[3], stockLevel: "in_stock", redemptionOptions: ["Food Credits", "Cash"] },
  { id: 22, name: "Chin Chin", price: 800, unit: "pack", icon: <Cookie size={20} />, image: IMAGES.snacks, category: "snacks", rating: 4.8, inStock: true, desc: "Homemade", vendor: VENDORS[3], stockLevel: "in_stock", redemptionOptions: ["Food Credits", "Cash"] },
  { id: 23, name: "Puff Puff Mix", price: 600, unit: "pack", icon: <Cake size={20} />, image: IMAGES.snacks, category: "snacks", rating: 4.4, inStock: true, desc: "Ready to fry", vendor: VENDORS[3], stockLevel: "low_stock", redemptionOptions: ["Food Credits", "Cash"] },
  { id: 24, name: "Groundnut", price: 1200, unit: "500g", icon: <Apple size={20} />, image: IMAGES.snacks, category: "snacks", rating: 4.7, inStock: true, desc: "Roasted", vendor: VENDORS[3], stockLevel: "in_stock", redemptionOptions: ["Food Credits", "Cash"] },
  { id: 25, name: "Palm Oil", price: 2200, unit: "750ml", icon: <Droplets size={20} />, image: IMAGES.cooking, category: "cooking", rating: 4.8, inStock: true, desc: "Pure red", vendor: VENDORS[2], stockLevel: "in_stock", redemptionOptions: ["Food Credits", "Cash"] },
  { id: 26, name: "Vegetable Oil", price: 1800, unit: "1L", icon: <Droplets size={20} />, image: IMAGES.cooking, category: "cooking", rating: 4.5, inStock: true, desc: "Refined", vendor: VENDORS[2], stockLevel: "in_stock", redemptionOptions: ["Food Credits", "Cash", "Card"] },
  { id: 27, name: "Maggi Cubes", price: 600, unit: "48 pcs", icon: <Flame size={20} />, image: IMAGES.cooking, category: "cooking", rating: 4.9, inStock: true, desc: "Seasoning", vendor: VENDORS[2], stockLevel: "in_stock", redemptionOptions: ["Food Credits", "Cash"] },
  { id: 28, name: "Iru", price: 500, unit: "pack", icon: <Leaf size={20} />, image: IMAGES.cooking, category: "cooking", rating: 4.6, inStock: true, desc: "Locust beans", vendor: VENDORS[2], stockLevel: "in_stock", redemptionOptions: ["Food Credits", "Cash"] },
  { id: 29, name: "Ogiri", price: 400, unit: "pack", icon: <Leaf size={20} />, image: IMAGES.cooking, category: "cooking", rating: 4.3, inStock: true, desc: "Castor seed", vendor: VENDORS[2], stockLevel: "out_of_stock", redemptionOptions: ["Food Credits", "Cash"] },
  { id: 30, name: "Pampers", price: 6500, unit: "pack", icon: <Baby size={20} />, image: IMAGES.baby, category: "baby", rating: 4.7, inStock: true, desc: "Diapers", vendor: VENDORS[1], stockLevel: "in_stock", redemptionOptions: ["Food Credits", "Cash", "Card"] },
  { id: 31, name: "NAN Formula", price: 8500, unit: "400g", icon: <Baby size={20} />, image: IMAGES.baby, category: "baby", rating: 4.8, inStock: true, desc: "Infant milk", vendor: VENDORS[1], stockLevel: "in_stock", redemptionOptions: ["Food Credits", "Cash"] },
  { id: 32, name: "Cerelac", price: 3200, unit: "400g", icon: <Baby size={20} />, image: IMAGES.baby, category: "baby", rating: 4.6, inStock: true, desc: "Baby cereal", vendor: VENDORS[1], stockLevel: "in_stock", redemptionOptions: ["Food Credits", "Cash"] },
];

const SAMPLE_ORDERS: Order[] = [
  {
    id: "ORD-2847", items: [
      { ...PRODUCTS[0], qty: 2 },
      { ...PRODUCTS[5], qty: 3 },
      { ...PRODUCTS[26], qty: 1 },
    ],
    total: 13900, status: "on_the_way", date: "Today, 2:30 PM",
    address: "12 Wuse Zone 5, Abuja", estimatedDelivery: "4:45 PM",
    driver: { name: "Emeka O.", phone: "+234 803 *** 4521" },
  },
  {
    id: "ORD-2831", items: [
      { ...PRODUCTS[13], qty: 1 },
      { ...PRODUCTS[14], qty: 2 },
    ],
    total: 8800, status: "delivered", date: "Yesterday, 11:15 AM",
    address: "12 Wuse Zone 5, Abuja", estimatedDelivery: "Delivered",
  },
  {
    id: "ORD-2819", items: [
      { ...PRODUCTS[11], qty: 1 },
      { ...PRODUCTS[8], qty: 2 },
      { ...PRODUCTS[24], qty: 1 },
    ],
    total: 7800, status: "delivered", date: "Jul 15, 3:00 PM",
    address: "12 Wuse Zone 5, Abuja", estimatedDelivery: "Delivered",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────
const formatNaira = (n: number) => `\u20A6${n.toLocaleString()}`;

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

// ─── Styles ───────────────────────────────────────────────────────
const S = {
  screen: (bg: string): React.CSSProperties => ({
    minHeight: "100svh", background: bg, paddingBottom: 100,
  }),
  topBar: (border: string): React.CSSProperties => ({
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "16px 0", marginBottom: 8,
  }),
  circleBtn: (bg: string, border: string): React.CSSProperties => ({
    width: 42, height: 42, borderRadius: "50%", border: `1px solid ${border}`,
    background: bg, display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", transition: "all .2s", color: "inherit",
  }),
  pill: (active: boolean, accent: string, surface: string, border: string): React.CSSProperties => ({
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "8px 16px", borderRadius: 100, fontSize: 12, fontWeight: 600,
    background: active ? accent : surface,
    color: active ? "#0A0A0A" : "#9A9A9A",
    border: `1px solid ${active ? accent : border}`,
    cursor: "pointer", transition: "all .25s", whiteSpace: "nowrap",
    letterSpacing: "0.3px",
  }),
  card: (surface: string, border: string): React.CSSProperties => ({
    background: surface, border: `1px solid ${border}`,
    borderRadius: 20, overflow: "hidden", transition: "all .3s",
  }),
  floatingBtn: (color: string, bg: string): React.CSSProperties => ({
    width: 44, height: 44, borderRadius: "50%", border: "none",
    background: bg, color, display: "flex", alignItems: "center",
    justifyContent: "center", cursor: "pointer", transition: "all .25s",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  }),
};

// ─── Main Component ───────────────────────────────────────────────
export default function CampusPlanner() {
  const { colors, toggle: toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [screen, setScreen] = useState<Screen>("home");
  const [selectedCategory, setSelectedCategory] = useState("staples");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [foodBalance, setFoodBalance] = useState(0);
  const [orders, setOrders] = useState<Order[]>([]);

  const email = localStorage.getItem("email") || "";

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = getLocalCart();
    if (savedCart.length > 0) {
      setCart(savedCart);
    }
    // Load wallet balance
    loadBalance();
    // Load orders
    loadOrders();
  }, [email]);

  const loadBalance = async () => {
    if (!email) return;
    try {
      const wallet = await fetchFoodWallet(email);
      setFoodBalance(wallet.balance || 0);
    } catch (e) {
      console.error("Failed to load balance:", e);
    }
  };

  const loadOrders = async () => {
    if (!email) return;
    try {
      const data = await fetchFoodOrders(email);
      if (Array.isArray(data) && data.length > 0) {
        setOrders(data.map((o: any) => ({
          id: o.orderId || o._id,
          items: o.items || [],
          total: o.total,
          status: o.status,
          date: o.date || o.createdAt,
          address: o.address,
          estimatedDelivery: o.estimatedDelivery || "ASAP",
          driver: o.driver,
        })));
      }
    } catch (e) {
      console.error("Failed to load orders:", e);
    }
  };

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const newCart = addToLocalCart({ ...product, qty: 1, vendor: product.vendor?.name || "Campus Green Mart" });
      return newCart;
    });
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const filteredProducts = activeFilter === "all"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeFilter);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { background: ${colors.bg} !important; }
        .app-shell {
          font-family: 'Sora', sans-serif;
          background: ${colors.bg};
          min-height: 100svh;
          max-width: 430px;
          margin: 0 auto;
          color: ${colors.text};
          position: relative;
          overflow-x: hidden;
          padding: 0 20px 100px;
        }
        .screen-anim { animation: fadeIn .35s ease both; }
        .hero-img {
          width: 100%; height: 220px; object-fit: cover;
          border-radius: 20px; display: block;
        }
        .category-scroll {
          display: flex; gap: 8px; overflow-x: auto;
          scrollbar-width: none; padding: 4px 0;
          -webkit-overflow-scrolling: touch;
        }
        .category-scroll::-webkit-scrollbar { display: none; }
        .product-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .product-card {
          background: ${colors.surface};
          border: 1px solid ${colors.border};
          border-radius: 16px; overflow: hidden;
          transition: all .25s ease;
        }
        .product-card:active { transform: scale(0.97); }
        .product-img {
          width: 100%; height: 110px; object-fit: cover;
          display: block;
        }
        .action-grid {
          display: grid; grid-template-columns: repeat(5, 1fr);
          gap: 10px; margin: 24px 0;
        }
        .action-item {
          display: flex; flex-direction: column;
          align-items: center; gap: 8px; cursor: pointer;
        }
        .action-circle {
          width: 52px; height: 52px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid ${colors.border};
          background: ${colors.surface};
          transition: all .25s;
        }
        .action-circle:active { transform: scale(0.92); }
        .action-label {
          font-size: 10px; font-weight: 500;
          color: ${colors.textSecondary}; text-align: center;
          line-height: 1.2;
        }
        .bottom-nav {
          position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);
          width: 100%; max-width: 430px;
          background: ${colors.navBg};
          backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid ${colors.border};
          display: flex; justify-content: space-around;
          padding: 8px 0 max(20px, env(safe-area-inset-bottom));
          z-index: 100;
        }
        .nav-btn {
          display: flex; flex-direction: column; align-items: center;
          gap: 4px; cursor: pointer; padding: 6px 14px; border-radius: 16px;
          transition: all .2s; border: none; background: transparent;
          color: ${colors.textMuted}; font-family: 'Sora', sans-serif;
        }
        .nav-btn.active { color: ${colors.accent}; }
        .nav-btn .nav-lbl {
          font-size: 9px; font-weight: 600; letter-spacing: .4px;
        }
        .nav-btn.active .nav-lbl { color: ${colors.accent}; }
        .badge-dot {
          position: absolute; top: 2px; right: 6px;
          width: 8px; height: 8px; border-radius: 50%;
          background: ${colors.error};
        }
        .promo-card {
          position: relative; border-radius: 20px; overflow: hidden;
          height: 160px; cursor: pointer;
        }
        .promo-card img {
          width: 100%; height: 100%; object-fit: cover;
        }
        .promo-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 60%);
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: 20px;
        }
        .featured-card {
          position: relative; border-radius: 20px; overflow: hidden;
          height: 200px; cursor: pointer;
        }
        .featured-card img {
          width: 100%; height: 100%; object-fit: cover;
        }
        .featured-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 60%);
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: 20px;
        }
        .glass-surface {
          background: rgba(20,20,20,0.7);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.08);
        }
        input::placeholder { color: ${colors.textMuted}; }
      `}</style>

      <div className="app-shell">
        {/* ─── HOME ─────────────────────────────────────────── */}
        {screen === "home" && (
          <div className="screen-anim" style={{ paddingTop: 8 }}>
            {/* Top Bar */}
            <div style={S.topBar(colors.border)}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => setScreen("profile")}>
                {(() => {
                  const uploadedAvatar = localStorage.getItem("nekstpei_avatar");
                  if (uploadedAvatar) {
                    return (
                      <img src={uploadedAvatar} alt="Profile" style={{
                        width: 42, height: 42, borderRadius: "50%",
                        border: `1px solid ${colors.accent}30`, objectFit: "cover",
                      }} />
                    );
                  }
                  return (
                    <div style={{
                      width: 42, height: 42, borderRadius: "50%",
                      background: `linear-gradient(135deg, ${colors.accent}30, ${colors.accent}10)`,
                      border: `1px solid ${colors.accent}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 14, fontWeight: 700, color: colors.accent,
                    }}>
                      {(localStorage.getItem("fullName") ?? "N")[0]?.toUpperCase()}
                    </div>
                  );
                })()}
                <div>
                  <div style={{ fontSize: 11, color: colors.textMuted, letterSpacing: "0.5px", fontWeight: 500 }}>{getGreeting()}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: colors.text, marginTop: 1 }}>
                    {localStorage.getItem("fullName")?.split(" ")[0] ?? "Friend"}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={S.circleBtn(colors.surface, colors.border)} onClick={() => setScreen("orders")} aria-label="Notifications">
                  <Bell size={17} />
                </button>
              </div>
            </div>

            {/* Editorial Headline */}
            <div style={{ marginTop: 16, marginBottom: 24 }}>
              <div style={{ fontSize: 32, fontWeight: 200, color: colors.text, lineHeight: 1.15, letterSpacing: "-0.5px" }}>
                Send food,
              </div>
              <div style={{ fontSize: 32, fontWeight: 700, color: colors.text, lineHeight: 1.15, letterSpacing: "-0.5px" }}>
                not just money<span style={{ color: colors.accent }}>.</span>
              </div>
            </div>

            {/* Featured Card */}
            <div className="featured-card" style={{ marginBottom: 24, animation: "fadeInUp .5s ease both", animationDelay: ".1s" }} onClick={() => setScreen("cart")}>
              <img src={IMAGES.featured1} alt="Food value" />
              <div className="featured-overlay">
                <div style={{ fontSize: 10, fontWeight: 600, color: colors.accent, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>Food Value</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "white", marginBottom: 4 }}>Fund. Send. Redeem.</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 12 }}>Buy food credits, send to anyone, redeem at verified vendors</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: colors.accent }}>Start with {formatNaira(1000)}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="action-grid" style={{ animation: "fadeInUp .5s ease both", animationDelay: ".15s" }}>
              {[
                { icon: <Wallet size={20} />, label: "Fund", color: colors.accent, action: () => navigate("/wallet") },
                { icon: <Send size={20} />, label: "Send", color: colors.text, action: () => navigate("/send") },
                { icon: <Search size={20} />, label: "Discover", color: colors.text, action: () => setScreen("category") },
                { icon: <Scan size={20} />, label: "Scan Pay", color: colors.text, action: () => navigate("/scan") },
                { icon: <Brain size={20} />, label: "AI Planner", color: colors.text, action: () => navigate("/ai-assistant") },
              ].map((a, i) => (
                <div key={i} className="action-item" onClick={a.action}>
                  <div className="action-circle" style={{ borderColor: i === 0 ? colors.accent : colors.border, background: i === 0 ? colors.accentSoft : colors.surface }}>
                    <span style={{ color: a.color }}>{a.icon}</span>
                  </div>
                  <span className="action-label">{a.label}</span>
                </div>
              ))}
            </div>

            {/* Categories */}
            <div style={{ marginBottom: 20, animation: "fadeInUp .5s ease both", animationDelay: ".2s" }}>
              <div className="category-scroll">
                <button
                  style={S.pill(activeFilter === "all", colors.accent, colors.surface, colors.border)}
                  onClick={() => setActiveFilter("all")}
                >
                  <Sparkles size={13} /> All
                </button>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    style={S.pill(activeFilter === cat.id, colors.accent, colors.surface, colors.border)}
                    onClick={() => setActiveFilter(cat.id)}
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Products */}
            <div style={{ animation: "fadeInUp .5s ease both", animationDelay: ".25s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: colors.text }}>Popular</span>
                <span style={{ fontSize: 11, color: colors.accent, fontWeight: 600, cursor: "pointer" }} onClick={() => setScreen("category")}>View all</span>
              </div>
              <div className="product-grid">
                {filteredProducts.slice(0, 6).map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} colors={colors} onAdd={addToCart} />
                ))}
              </div>
            </div>

            {/* Promo Banner */}
            <div className="promo-card" style={{ marginTop: 24, animation: "fadeInUp .5s ease both", animationDelay: ".3s" }} onClick={() => setScreen("profile")}>
              <img src={IMAGES.promo} alt="Promo" />
              <div className="promo-overlay">
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <Gift size={16} color={colors.accent} />
                  <span style={{ fontSize: 10, fontWeight: 600, color: colors.accent, letterSpacing: "1px", textTransform: "uppercase" }}>Refer & Earn</span>
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "white", marginBottom: 4 }}>Send {formatNaira(500)} food value free</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>When you invite a friend to Nekstpei</div>
              </div>
            </div>
          </div>
        )}

        {/* ─── CATEGORY ─────────────────────────────────────── */}
        {screen === "category" && (
          <div className="screen-anim" style={{ paddingTop: 8 }}>
            <div style={S.topBar(colors.border)}>
              <button style={S.circleBtn(colors.surface, colors.border)} onClick={() => setScreen("home")}><ArrowLeft size={17} /></button>
              <span style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>
                {CATEGORIES.find(c => c.id === activeFilter)?.name ?? "All Items"}
              </span>
              <div style={{ width: 42 }} />
            </div>

            <div className="category-scroll" style={{ marginBottom: 20 }}>
              <button
                style={S.pill(activeFilter === "all", colors.accent, colors.surface, colors.border)}
                onClick={() => setActiveFilter("all")}
              >
                All
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  style={S.pill(activeFilter === cat.id, colors.accent, colors.surface, colors.border)}
                  onClick={() => setActiveFilter(cat.id)}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>

            <div className="product-grid">
              {filteredProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} colors={colors} onAdd={addToCart} />
              ))}
            </div>
          </div>
        )}

        {/* ─── CART ─────────────────────────────────────────── */}
        {screen === "cart" && (
          <CartScreen cart={cart} setCart={setCart} setScreen={setScreen} colors={colors} />
        )}

        {/* ─── ORDERS ───────────────────────────────────────── */}
        {screen === "orders" && (
          <OrdersScreen orders={orders} setScreen={setScreen} setSelectedOrder={setSelectedOrder} colors={colors} />
        )}

        {/* ─── TRACKING ─────────────────────────────────────── */}
        {screen === "tracking" && selectedOrder && (
          <TrackingScreen order={selectedOrder} onBack={() => setScreen("orders")} colors={colors} />
        )}

        {/* ─── PROFILE ──────────────────────────────────────── */}
        {screen === "profile" && (
          <ProfileScreen setScreen={setScreen} colors={colors} toggleTheme={toggleTheme} />
        )}
      </div>

      {/* ─── BOTTOM NAV ─────────────────────────────────────── */}
      {screen !== "tracking" && (
        <nav className="bottom-nav">
          {[
            { id: "home" as Screen, icon: <Home size={18} />, label: "Home" },
            { id: "category" as Screen, icon: <Search size={18} />, label: "Explore" },
            { id: "cart" as Screen, icon: <ShoppingCart size={18} />, label: "Cart", badge: cartCount },
            { id: "orders" as Screen, icon: <Package size={18} />, label: "Orders" },
            { id: "profile" as Screen, icon: <User size={18} />, label: "Profile" },
          ].map(item => (
            <button
              key={item.id}
              className={`nav-btn${screen === item.id ? " active" : ""}`}
              onClick={() => setScreen(item.id)}
              style={{ position: "relative" }}
            >
              {item.icon}
              {"badge" in item && (item.badge as number) > 0 && <div className="badge-dot" />}
              <span className="nav-lbl">{item.label}</span>
            </button>
          ))}
        </nav>
      )}
    </>
  );
}

// ─── Product Card ─────────────────────────────────────────────────
function ProductCard({ product, onAdd, colors, index }: {
  product: Product; onAdd: (p: Product) => void;
  colors: ReturnType<typeof useTheme>["colors"]; index: number;
}) {
  const [added, setAdded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleAdd = () => {
    if (product.stockLevel === "out_of_stock") return;
    onAdd(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 600);
  };

  const stockColor = product.stockLevel === "in_stock" ? colors.success
    : product.stockLevel === "low_stock" ? colors.warning : colors.error;

  const stockLabel = product.stockLevel === "in_stock" ? "In Stock"
    : product.stockLevel === "low_stock" ? "Low Stock" : "Out of Stock";

  return (
    <div className="product-card" style={{ animation: `fadeInUp .4s ease both`, animationDelay: `${index * 0.05}s` }}>
      <img src={product.image} alt={product.name} className="product-img" loading="lazy" />
      <div style={{ padding: "12px 14px 14px" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: colors.text, marginBottom: 2, lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {product.name}
        </div>
        <div style={{ fontSize: 11, color: colors.textMuted, marginBottom: 6 }}>{product.unit}</div>

        {/* Vendor & Stock */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <div style={{
            width: 14, height: 14, borderRadius: "50%",
            background: product.vendor.openNow ? colors.success : colors.textMuted,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#0A0A0A" }} />
          </div>
          <span style={{ fontSize: 10, color: colors.textMuted, flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {product.vendor.name}
          </span>
          <span style={{
            fontSize: 9, fontWeight: 600, color: stockColor,
            background: `${stockColor}15`, padding: "2px 6px", borderRadius: 100,
          }}>
            {stockLabel}
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{formatNaira(product.price)}</div>
          <button onClick={handleAdd} disabled={product.stockLevel === "out_of_stock"} style={{
            width: 34, height: 34, borderRadius: "50%",
            border: `1px solid ${added ? colors.accent : product.stockLevel === "out_of_stock" ? colors.border : colors.border}`,
            background: added ? colors.accent : product.stockLevel === "out_of_stock" ? colors.surfaceElevated : colors.surface,
            color: added ? "#0A0A0A" : product.stockLevel === "out_of_stock" ? colors.textMuted : colors.text,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: product.stockLevel === "out_of_stock" ? "not-allowed" : "pointer",
            transition: "all .25s",
            transform: added ? "scale(1.1)" : "scale(1)",
            opacity: product.stockLevel === "out_of_stock" ? 0.5 : 1,
          }}>
            {added ? <Check size={14} strokeWidth={3} /> : product.stockLevel === "out_of_stock" ? <X size={14} /> : <Plus size={14} />}
          </button>
        </div>

        {/* Redemption Options */}
        <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
          {product.redemptionOptions.map(opt => (
            <span key={opt} style={{
              fontSize: 9, fontWeight: 600, color: colors.textMuted,
              background: colors.surfaceElevated, padding: "2px 6px", borderRadius: 100,
              border: `1px solid ${colors.border}`,
            }}>
              {opt}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Cart Screen ──────────────────────────────────────────────────
function CartScreen({ cart, setCart, setScreen, colors }: {
  cart: CartItem[]; setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setScreen: (s: Screen) => void; colors: ReturnType<typeof useTheme>["colors"];
}) {
  const navigate = useNavigate();
  const [ordering, setOrdering] = useState(false);

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const deliveryFee = total > 5000 ? 0 : 500;

  const updateQty = (id: number, delta: number) => {
    const newCart = updateLocalCartItemQty(id, delta);
    setCart(newCart);
  };

  const placeOrder = async () => {
    const email = localStorage.getItem("email");
    const address = localStorage.getItem("deliveryAddress") || "12 Wuse Zone 5, Abuja";
    if (!email || cart.length === 0) return;

    setOrdering(true);
    try {
      const result = await createFoodOrder(
        email,
        cart.map(i => ({ id: i.id, name: i.name, price: i.price, unit: i.unit, image: i.image, qty: i.qty, vendor: i.vendor?.name || "Campus Green Mart" })),
        total,
        deliveryFee,
        address,
        "food_credits"
      );
      setCart([]);
      setLocalCart([]);
      setScreen("orders");
    } catch (e: any) {
      alert(e.message || "Order failed. Please try again.");
    }
    setOrdering(false);
  };

  return (
    <div className="screen-anim" style={{ paddingTop: 8, paddingBottom: cart.length > 0 ? 180 : 100 }}>
      <div style={S.topBar(colors.border)}>
        <button style={S.circleBtn(colors.surface, colors.border)} onClick={() => setScreen("home")}><ArrowLeft size={17} /></button>
        <span style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>My Cart</span>
        <div style={{ width: 42 }} />
      </div>

      {cart.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 20px", animation: "fadeIn .4s ease" }}>
          <img src={IMAGES.empty} alt="Empty" style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", margin: "0 auto 20px", opacity: 0.5 }} />
          <div style={{ fontSize: 18, fontWeight: 300, color: colors.text, marginBottom: 4 }}>Your cart is empty</div>
          <div style={{ fontSize: 12, color: colors.textMuted, marginBottom: 24 }}>Add some groceries to get started</div>
          <button onClick={() => setScreen("home")} style={{
            padding: "12px 28px", borderRadius: 100, background: colors.accent,
            color: "#0A0A0A", fontSize: 13, fontWeight: 700, border: "none",
            cursor: "pointer", fontFamily: "'Sora', sans-serif",
          }}>Browse Products</button>
        </div>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "16px 0",
              borderBottom: `1px solid ${colors.border}`, animation: "fadeIn .3s ease",
            }}>
              <img src={item.image} alt={item.name} style={{ width: 52, height: 52, borderRadius: 14, objectFit: "cover", flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: colors.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>{item.unit}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                <button onClick={() => updateQty(item.id, -1)} style={{ width: 30, height: 30, borderRadius: "50%", border: `1px solid ${colors.border}`, background: "transparent", color: colors.text, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <Minus size={12} />
                </button>
                <span style={{ fontSize: 13, fontWeight: 700, color: colors.text, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)} style={{ width: 30, height: 30, borderRadius: "50%", border: "none", background: colors.accent, color: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <Plus size={12} />
                </button>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: colors.text, flexShrink: 0, minWidth: 70, textAlign: "right" }}>{formatNaira(item.price * item.qty)}</div>
            </div>
          ))}

          {/* Summary */}
          <div style={{ marginTop: 20, ...S.card(colors.surface, colors.border), padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 12, color: colors.textSecondary }}>
              <span>Subtotal</span><span style={{ fontWeight: 600 }}>{formatNaira(total)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 12, color: colors.textSecondary }}>
              <span>Delivery</span>
              <span style={{ fontWeight: 600, color: deliveryFee === 0 ? colors.success : colors.text }}>
                {deliveryFee === 0 ? "FREE" : formatNaira(deliveryFee)}
              </span>
            </div>
            <div style={{ height: 1, background: colors.border, margin: "12px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 700, color: colors.text }}>
              <span>Total</span>
              <span style={{ color: colors.accent }}>{formatNaira(total + deliveryFee)}</span>
            </div>
          </div>

          {deliveryFee === 0 && (
            <div style={{
              marginTop: 12, ...S.card(colors.accentSoft, `${colors.accent}20`),
              padding: "12px 16px", display: "flex", alignItems: "center", gap: 10,
              fontSize: 12, color: colors.accent,
            }}>
              <Zap size={14} /> Free delivery on orders over {formatNaira(5000)}
            </div>
          )}
        </>
      )}

      {cart.length > 0 && (
        <div style={{ position: "fixed", bottom: 80, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, padding: "0 20px", zIndex: 50 }}>
          <button onClick={placeOrder} style={{
            width: "100%", padding: "16px", borderRadius: 14,
            background: colors.accent, color: "#0A0A0A",
            fontSize: 14, fontWeight: 700, border: "none",
            cursor: "pointer", fontFamily: "'Sora', sans-serif",
            boxShadow: `0 8px 32px ${colors.accent}30`,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            <CreditCard size={16} /> Pay {formatNaira(total + deliveryFee)}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Orders Screen ────────────────────────────────────────────────
function OrdersScreen({ orders, setScreen, setSelectedOrder, colors }: {
  orders: Order[];
  setScreen: (s: Screen) => void; setSelectedOrder: (o: Order) => void;
  colors: ReturnType<typeof useTheme>["colors"];
}) {
  const statusMap = {
    preparing: { label: "Preparing", color: colors.warning },
    on_the_way: { label: "On the way", color: colors.accent },
    delivered: { label: "Delivered", color: colors.success },
    cancelled: { label: "Cancelled", color: colors.error },
  };

  return (
    <div className="screen-anim" style={{ paddingTop: 8 }}>
      <div style={S.topBar(colors.border)}>
        <button style={S.circleBtn(colors.surface, colors.border)} onClick={() => setScreen("home")}><ArrowLeft size={17} /></button>
        <span style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>Orders</span>
        <div style={{ width: 42 }} />
      </div>

      {orders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 20px", color: colors.textMuted }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>No orders yet</div>
          <div style={{ fontSize: 12 }}>Your food orders will appear here</div>
        </div>
      ) : orders.map(order => {
        const s = statusMap[order.status];
        return (
          <div key={order.id} onClick={() => { setSelectedOrder(order); setScreen("tracking"); }} style={{
            ...S.card(colors.surface, colors.border), padding: 18, marginBottom: 12,
            cursor: "pointer", transition: "all .2s",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{order.id}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: s.color, background: `${s.color}15`, padding: "4px 10px", borderRadius: 100 }}>{s.label}</span>
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
              {order.items.slice(0, 3).map((item, i) => (
                <img key={i} src={item.image} alt={item.name} style={{ width: 32, height: 32, borderRadius: 8, objectFit: "cover" }} />
              ))}
              {order.items.length > 3 && (
                <div style={{ width: 32, height: 32, borderRadius: 8, background: colors.surfaceElevated, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: colors.textMuted }}>+{order.items.length - 3}</div>
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: colors.textMuted }}>{order.date}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{formatNaira(order.total)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Tracking Screen ──────────────────────────────────────────────
function TrackingScreen({ order, onBack, colors }: {
  order: Order; onBack: () => void; colors: ReturnType<typeof useTheme>["colors"];
}) {
  const steps = [
    { key: "confirmed", label: "Order Confirmed", time: "2:30 PM", done: true, icon: <Check size={14} /> },
    { key: "preparing", label: "Being Prepared", time: "2:45 PM", done: order.status !== "cancelled", icon: <Package size={14} /> },
    { key: "on_the_way", label: "Out for Delivery", time: "3:30 PM", done: order.status === "on_the_way" || order.status === "delivered", icon: <Truck size={14} /> },
    { key: "delivered", label: "Delivered", time: order.estimatedDelivery, done: order.status === "delivered", icon: <Home size={14} /> },
  ];

  const currentStep = steps.findIndex(s => !s.done);
  const progress = currentStep === -1 ? 100 : (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="screen-anim" style={{ paddingTop: 8 }}>
      <div style={S.topBar(colors.border)}>
        <button style={S.circleBtn(colors.surface, colors.border)} onClick={onBack}><ArrowLeft size={17} /></button>
        <span style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>Track Order</span>
        <div style={{ width: 42 }} />
      </div>

      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 12, color: colors.textMuted, marginBottom: 4 }}>{order.id}</div>
        <div style={{ fontSize: 36, fontWeight: 200, color: colors.text, letterSpacing: "-1px" }}>{order.estimatedDelivery}</div>
        <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 4 }}>Estimated delivery</div>
      </div>

      <div style={{ background: colors.surface, borderRadius: 4, height: 3, marginBottom: 36, overflow: "hidden" }}>
        <div style={{ height: "100%", background: colors.accent, borderRadius: 4, width: `${progress}%`, transition: "width 1s ease" }} />
      </div>

      <div style={{ marginBottom: 32 }}>
        {steps.map((step, i) => {
          const isActive = i === currentStep;
          const isDone = step.done;
          return (
            <div key={step.key} style={{ display: "flex", gap: 16, position: "relative" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                  width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  background: isDone ? colors.accent : colors.surface,
                  color: isDone ? "#0A0A0A" : colors.textMuted,
                  border: `1px solid ${isDone ? colors.accent : colors.border}`,
                  animation: isActive ? "progressPulse 2s infinite" : "none",
                  flexShrink: 0, transition: "all .3s",
                }}>
                  {step.icon}
                </div>
                {i < steps.length - 1 && (
                  <div style={{ width: 1, flex: 1, minHeight: 40, background: isDone ? colors.accent : colors.border, transition: "background .3s" }} />
                )}
              </div>
              <div style={{ paddingTop: 6, paddingBottom: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: isDone ? colors.text : colors.textMuted }}>{step.label}</div>
                <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>{step.time}</div>
              </div>
            </div>
          );
        })}
      </div>

      {order.driver && order.status === "on_the_way" && (
        <div style={{ ...S.card(colors.surface, colors.border), padding: 18, marginBottom: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, marginBottom: 14, letterSpacing: "0.5px", textTransform: "uppercase" }}>Your Driver</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 46, height: 46, borderRadius: "50%", background: colors.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", color: colors.accent }}>
              <User size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>{order.driver.name}</div>
              <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 1 }}>{order.driver.phone}</div>
            </div>
            <button onClick={() => window.location.href = `tel:${order.driver!.phone}`} style={{ ...S.floatingBtn(colors.success, `${colors.success}15`) }}>
              <Phone size={16} />
            </button>
          </div>
        </div>
      )}

      <div style={{ ...S.card(colors.surface, colors.border), padding: 18 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, marginBottom: 14, letterSpacing: "0.5px", textTransform: "uppercase" }}>Items</div>
        {order.items.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < order.items.length - 1 ? `1px solid ${colors.border}` : "none" }}>
            <img src={item.image} alt={item.name} style={{ width: 36, height: 36, borderRadius: 10, objectFit: "cover" }} />
            <div style={{ flex: 1, fontSize: 13, color: colors.text }}>{item.name}</div>
            <div style={{ fontSize: 12, color: colors.textMuted }}>x{item.qty}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{formatNaira(item.price * item.qty)}</div>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, paddingTop: 14, borderTop: `1px solid ${colors.border}` }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>Total</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: colors.accent }}>{formatNaira(order.total)}</span>
        </div>
      </div>

      <div style={{ marginTop: 12, ...S.card(colors.surface, colors.border), padding: 18, display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 42, height: 42, borderRadius: "50%", background: colors.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", color: colors.accent, flexShrink: 0 }}>
          <MapPin size={16} />
        </div>
        <div>
          <div style={{ fontSize: 11, color: colors.textMuted, marginBottom: 2 }}>Delivering to</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{order.address}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Profile Screen ───────────────────────────────────────────────
function ProfileScreen({ setScreen, colors, toggleTheme }: {
  setScreen: (s: Screen) => void; colors: ReturnType<typeof useTheme>["colors"];
  toggleTheme: () => void;
}) {
  const email = localStorage.getItem("email") ?? "user@nekstpei.com";
  const storedName = localStorage.getItem("fullName") ?? "";
  const name = storedName || email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  const initials = name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  const [avatar, setAvatar] = useState<string | null>(() => localStorage.getItem("nekstpei_avatar"));
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [vaData, setVaData] = useState<any>(null);

  useEffect(() => {
    loadWallet();
    loadVA();
  }, [email]);

  const loadWallet = async () => {
    try {
      const data = await fetchWallet(email);
      if (data) setWalletBalance(data.balance || 0);
    } catch (e) {
      console.error("Failed to load wallet:", e);
    }
  };

  const loadVA = async () => {
    try {
      const data = await fetchVA(email);
      if (data) setVaData(data);
    } catch (e) {
      console.error("Failed to load VA:", e);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setAvatar(dataUrl);
      localStorage.setItem("nekstpei_avatar", dataUrl);
      try {
        await updateProfile(email, { avatar: dataUrl });
      } catch (e) {
        console.error("Failed to sync avatar to backend:", e);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="screen-anim" style={{ paddingTop: 8 }}>
      <div style={S.topBar(colors.border)}>
        <button style={S.circleBtn(colors.surface, colors.border)} onClick={() => setScreen("home")}><ArrowLeft size={17} /></button>
        <span style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>Profile</span>
        <div style={{ width: 42 }} />
      </div>

      <div style={{ textAlign: "center", marginBottom: 36, marginTop: 16 }}>
        <label htmlFor="avatar-upload" style={{ cursor: "pointer", display: "inline-block", position: "relative" }}>
          {avatar ? (
            <img src={avatar} alt="Profile" style={{
              width: 80, height: 80, borderRadius: "50%", objectFit: "cover",
              border: `2px solid ${colors.accent}40`, marginBottom: 16,
            }} />
          ) : (
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: `linear-gradient(135deg, ${colors.accent}30, ${colors.accent}10)`,
              border: `2px solid ${colors.accent}40`,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontSize: 28, fontWeight: 700, color: colors.accent, marginBottom: 16,
            }}>{initials}</div>
          )}
          <div style={{
            position: "absolute", bottom: 12, right: -4,
            width: 24, height: 24, borderRadius: "50%",
            background: colors.accent, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </div>
        </label>
        <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarUpload} style={{ display: "none" }} />
        <div style={{ fontSize: 22, fontWeight: 700, color: colors.text }}>{name}</div>
        <div style={{ fontSize: 13, color: colors.textMuted, marginTop: 4 }}>{email}</div>
      </div>

      {/* Wallet Balance */}
      <div style={{
        padding: "16px 18px", borderRadius: 16,
        background: `linear-gradient(135deg, ${colors.accent}15, ${colors.accent}05)`,
        border: `1px solid ${colors.accent}20`, marginBottom: 10,
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: colors.textMuted, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 4 }}>Wallet Balance</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: colors.text }}>{formatNaira(walletBalance)}</div>
      </div>

      {/* Virtual Account */}
      {vaData && vaData.va_generated && (
        <div style={{
          padding: "16px 18px", borderRadius: 16,
          background: `${colors.surface}`, border: `1px solid ${colors.border}`, marginBottom: 10,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <Building2 size={18} color={colors.accent} />
            <span style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>Virtual Account</span>
          </div>
          <div style={{ fontSize: 12, color: colors.textMuted, marginBottom: 4 }}>Bank: {vaData.bank_name}</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: colors.text, marginBottom: 4 }}>Account: {vaData.account_number}</div>
          <div style={{ fontSize: 11, color: colors.textMuted }}>Reference: {vaData.account_reference}</div>
        </div>
      )}

      {[
        { icon: <Wallet size={18} />, label: "Food Wallet", sub: "Balance, history & receipts", action: () => window.location.href = '#/wallet' },
        { icon: <Package size={18} />, label: "Order History", sub: "Past orders & redemptions", action: () => setScreen("orders") },
        { icon: <MapPin size={18} />, label: "Addresses", sub: "Manage delivery", action: () => window.location.href = '#/settings' },
        { icon: <Bell size={18} />, label: "Notifications", sub: "Updates & promos", action: () => setScreen("orders") },
        { icon: <Store size={18} />, label: "Vendor Portal", sub: "Manage your store", action: () => window.location.href = '#/vendor' },
        { icon: <Building2 size={18} />, label: "Institutional", sub: "Food programs & reports", action: () => window.location.href = '#/institutional' },
        { icon: <Shield size={18} />, label: "Trust Layer", sub: "Audit trail & traceability", action: () => window.location.href = '#/trust' },
      ].map((item, i) => (
        <div key={i} onClick={item.action} style={{
          display: "flex", alignItems: "center", gap: 16, padding: "16px 18px",
          ...S.card(colors.surface, colors.border), marginBottom: 10, cursor: "pointer",
          transition: "all .2s",
        }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: colors.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", color: colors.accent, flexShrink: 0 }}>{item.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>{item.label}</div>
            <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 1 }}>{item.sub}</div>
          </div>
          <ChevronRight size={16} color={colors.textMuted} />
        </div>
      ))}

      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 18px", ...S.card(colors.surface, colors.border), marginBottom: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: colors.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", color: colors.accent }}>
            {colors.isDark ? <Moon size={18} /> : <Sun size={18} />}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>Theme</div>
            <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 1 }}>{colors.isDark ? "Dark" : "Light"}</div>
          </div>
        </div>
        <button onClick={toggleTheme} style={{
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

      <div onClick={() => window.location.href = '#/settings'} style={{
        display: "flex", alignItems: "center", gap: 16, padding: "16px 18px",
        ...S.card(colors.surface, colors.border), cursor: "pointer",
      }}>
        <div style={{ width: 42, height: 42, borderRadius: "50%", background: colors.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", color: colors.accent }}><Settings size={18} /></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>Settings</div>
          <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 1 }}>Account & preferences</div>
        </div>
        <ChevronRight size={16} color={colors.textMuted} />
      </div>
    </div>
  );
}
