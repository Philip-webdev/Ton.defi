const API_BASE = import.meta.env.VITE_BACKEND_URL || "https://twa-backend-g83o.onrender.com";

// ─── Auth ─────────────────────────────────────────────────────────
export async function registerUser(fullName: string, email: string, password: string) {
  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName, email, password }),
    credentials: "include",
  });
  return res.json();
}

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
  return res.json();
}

// ─── Food Wallet ──────────────────────────────────────────────────
export async function fetchFoodWallet(email: string) {
  try {
    const res = await fetch(`${API_BASE}/api/food-wallet/${encodeURIComponent(email)}`);
    return await res.json();
  } catch {
    return getLocalWallet();
  }
}

export async function topUpFoodWallet(email: string, amount: number, method: string) {
  try {
    const res = await fetch(`${API_BASE}/api/food-wallet/topup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, amount, method }),
    });
    const data = await res.json();
    setLocalWallet(data.wallet);
    return data;
  } catch {
    // Fallback to localStorage
    const wallet = topUpLocal(amount, method);
    return { wallet };
  }
}

// ─── Food Transactions ────────────────────────────────────────────
export async function fetchFoodTransactions(email: string, type?: string) {
  try {
    const url = type && type !== "all"
      ? `${API_BASE}/api/food-transactions/${encodeURIComponent(email)}?type=${type}`
      : `${API_BASE}/api/food-transactions/${encodeURIComponent(email)}`;
    const res = await fetch(url);
    return await res.json();
  } catch {
    return getLocalTransactions();
  }
}

// ─── Food Transfers ───────────────────────────────────────────────
export async function sendFoodCredits(
  fromEmail: string,
  toName: string,
  toContact: string,
  amount: number,
  note?: string
) {
  try {
    const res = await fetch(`${API_BASE}/api/food-transfer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fromEmail, toName, toContact, amount, note }),
    });
    const data = await res.json();
    if (data.newBalance !== undefined) {
      updateLocalBalance(data.newBalance);
    }
    return data;
  } catch {
    // Fallback to localStorage
    return sendLocalFoodCredits(toName, toContact, amount, note);
  }
}

// ─── Contacts ─────────────────────────────────────────────────────
export async function fetchContacts(email: string) {
  try {
    const res = await fetch(`${API_BASE}/api/food-contacts/${encodeURIComponent(email)}`);
    return await res.json();
  } catch {
    return getLocalContacts();
  }
}

// ─── Food Orders ──────────────────────────────────────────────────
export async function createFoodOrder(
  email: string,
  items: any[],
  total: number,
  deliveryFee: number,
  address: string,
  paymentMethod: string
) {
  try {
    const res = await fetch(`${API_BASE}/api/food-orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, items, total, deliveryFee, address, paymentMethod }),
    });
    const data = await res.json();
    if (data.newBalance !== undefined) {
      updateLocalBalance(data.newBalance);
    }
    return data;
  } catch {
    // Fallback to localStorage
    return createLocalOrder(items, total, deliveryFee, address, paymentMethod);
  }
}

export async function fetchFoodOrders(email: string) {
  try {
    const res = await fetch(`${API_BASE}/api/food-orders/${encodeURIComponent(email)}`);
    return await res.json();
  } catch {
    return getLocalOrders();
  }
}

export async function updateFoodOrderStatus(orderId: string, status: string) {
  try {
    const res = await fetch(`${API_BASE}/api/food-orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    return await res.json();
  } catch {
    return updateLocalOrderStatus(orderId, status);
  }
}

// ─── Vendor Orders ────────────────────────────────────────────────
export async function fetchVendorOrders(vendorEmail: string) {
  try {
    const res = await fetch(`${API_BASE}/api/vendor-orders/${encodeURIComponent(vendorEmail)}`);
    return await res.json();
  } catch {
    return getLocalVendorOrders();
  }
}

export async function updateVendorOrderStatus(orderId: string, status: string) {
  try {
    const res = await fetch(`${API_BASE}/api/vendor-orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    return await res.json();
  } catch {
    return updateLocalVendorOrderStatus(orderId, status);
  }
}

// ─── Profile ──────────────────────────────────────────────────────
export async function fetchProfile(email: string) {
  try {
    const res = await fetch(`${API_BASE}/api/profile/${encodeURIComponent(email)}`);
    return await res.json();
  } catch {
    return getLocalProfile();
  }
}

export async function updateProfile(email: string, data: any) {
  try {
    const res = await fetch(`${API_BASE}/api/profile/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, ...data }),
    });
    const profile = await res.json();
    setLocalProfile(profile);
    return profile;
  } catch {
    return updateLocalProfile(data);
  }
}

// ─── Recipients ───────────────────────────────────────────────
export async function addRecipient(senderEmail: string, searchKey: string) {
  try {
    const res = await fetch(`${API_BASE}/api/food-recipients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ senderEmail, searchKey }),
    });
    return await res.json();
  } catch {
    return { error: "Network error" };
  }
}

export async function fetchRecipients(email: string, page?: number, limit?: number) {
  try {
    const params = new URLSearchParams();
    if (page) params.set("page", page.toString());
    if (limit) params.set("limit", limit.toString());
    const res = await fetch(`${API_BASE}/api/food-recipients/${encodeURIComponent(email)}?${params}`);
    return await res.json();
  } catch {
    return { recipients: [], pagination: { page: 1, limit: 20, total: 0, totalPages: 0 } };
  }
}

export async function removeRecipient(email: string, recipientId: string) {
  try {
    const res = await fetch(`${API_BASE}/api/food-recipients/${encodeURIComponent(email)}/${recipientId}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch {
    return { error: "Network error" };
  }
}

export async function updateRecipient(email: string, recipientId: string, data: { status?: string; note?: string }) {
  try {
    const res = await fetch(`${API_BASE}/api/food-recipients/${encodeURIComponent(email)}/${recipientId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    return { error: "Network error" };
  }
}

// ─── Wallet & VA ──────────────────────────────────────
export async function fetchWallet(email: string) {
  try {
    const res = await fetch(`${API_BASE}/api/wallet/${encodeURIComponent(email)}`);
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchVA(email: string) {
  try {
    const res = await fetch(`${API_BASE}/api/va/${encodeURIComponent(email)}`);
    return await res.json();
  } catch {
    return null;
  }
}

export async function convertWalletToFoodCredits(email: string, amount: number) {
  try {
    const res = await fetch(`${API_BASE}/api/food-convert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, amount }),
    });
    return await res.json();
  } catch {
    return { error: "Network error" };
  }
}

// ─── Settings ─────────────────────────────────────────────────────
export async function saveAddress(phone: string, address: string): Promise<void> {
  try {
    const email = localStorage.getItem("email") || "";
    if (email) {
      await updateProfile(email, { phone, address });
    }
  } catch (e) {
    console.error("Address save error:", e);
  }
  localStorage.setItem("deliveryAddress", address);
  localStorage.setItem("phoneNumber", phone);
}

// ═══════════════════════════════════════════════════════════════════
// LOCAL STORAGE FALLBACKS
// ═══════════════════════════════════════════════════════════════════

const WALLET_KEY = "nekstpei_food_wallet";
const TX_KEY = "nekstpei_transactions";
const ORDER_KEY = "nekstpei_orders";
const CART_KEY = "nekstpei_cart";
const CONTACT_KEY = "nekstpei_contacts";
const PROFILE_KEY = "nekstpei_profile";
const VENDOR_ORDER_KEY = "nekstpei_vendor_orders";

interface WalletData {
  balance: number;
  totalTopups: number;
  totalSpent: number;
  totalSent: number;
  totalReceived: number;
}

interface LocalTransaction {
  id: string;
  _id?: string;
  type: string;
  amount: number;
  description: string;
  date: string;
  time: string;
  status: string;
  reference: string;
  vendor?: string;
  recipient?: string;
  from?: string;
  to?: string;
  createdAt?: string;
}

interface LocalOrder {
  id?: string;
  orderId?: string;
  _id?: string;
  items: any[];
  total: number;
  deliveryFee: number;
  status: string;
  date?: string;
  createdAt?: string;
  address: string;
  estimatedDelivery?: string;
  driver?: { name: string; phone: string };
  paymentMethod: string;
}

interface LocalContact {
  id?: string;
  _id?: string;
  name: string;
  phone?: string;
  contactEmail?: string;
  email?: string;
  initials: string;
  lastTransfer?: string;
}

interface LocalProfile {
  fullName?: string;
  email?: string;
  phone?: string;
  avatar?: string | null;
  address?: string;
}

function getLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setLocal<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// ─── Wallet LocalStorage ──────────────────────────────────────────
export function getLocalWallet(): WalletData {
  return getLocal<WalletData>(WALLET_KEY, {
    balance: 0, totalTopups: 0, totalSpent: 0, totalSent: 0, totalReceived: 0
  });
}

export function getLocalBalance(): number {
  return getLocalWallet().balance;
}

function setLocalWallet(wallet: WalletData): void {
  setLocal(WALLET_KEY, wallet);
}

function updateLocalBalance(balance: number): void {
  const wallet = getLocalWallet();
  setLocal(WALLET_KEY, { ...wallet, balance });
}

function topUpLocal(amount: number, method: string): WalletData {
  const wallet = getLocalWallet();
  const newWallet = {
    ...wallet,
    balance: wallet.balance + amount,
    totalTopups: wallet.totalTopups + amount,
  };
  setLocal(WALLET_KEY, newWallet);

  const tx: LocalTransaction = {
    id: `TXN-${Date.now().toString(36).toUpperCase()}`,
    type: "topup",
    amount,
    description: `Wallet Top-up via ${method}`,
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    status: "completed",
    reference: `REF-${Date.now()}`,
  };
  addLocalTransaction(tx);

  return newWallet;
}

function sendLocalFoodCredits(toName: string, toContact: string, amount: number, note?: string) {
  const wallet = getLocalWallet();
  if (wallet.balance < amount) throw new Error("Insufficient balance");

  const newWallet = {
    ...wallet,
    balance: wallet.balance - amount,
    totalSent: wallet.totalSent + amount,
  };
  setLocal(WALLET_KEY, newWallet);

  const tx: LocalTransaction = {
    id: `TXN-${Date.now().toString(36).toUpperCase()}`,
    type: "send",
    amount,
    description: `Sent to ${toName}`,
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    status: "completed",
    reference: `REF-${Date.now()}`,
    recipient: toName,
  };
  addLocalTransaction(tx);

  // Add contact
  addLocalContact({ name: toName, phone: toContact.includes("@") ? undefined : toContact, contactEmail: toContact.includes("@") ? toContact : undefined });

  return { transaction: tx, newBalance: newWallet.balance };
}

// ─── Transactions LocalStorage ────────────────────────────────────
export function getLocalTransactions(): LocalTransaction[] {
  return getLocal<LocalTransaction[]>(TX_KEY, getDefaultTransactions());
}

function addLocalTransaction(tx: LocalTransaction): void {
  const txs = getLocalTransactions();
  txs.unshift(tx);
  setLocal(TX_KEY, txs);
}

function getDefaultTransactions(): LocalTransaction[] {
  return [
    { id: "TXN-001", type: "topup", amount: 20000, description: "Wallet Top-up via Card", date: "Today", time: "2:30 PM", status: "completed", reference: "REF-8847291" },
    { id: "TXN-002", type: "send", amount: 5000, description: "Sent to Chidinma O.", date: "Today", time: "1:15 PM", status: "completed", reference: "REF-8847156", recipient: "Chidinma O." },
    { id: "TXN-003", type: "redemption", amount: 3200, description: "Redeemed at Mama Nkechi Kitchen", date: "Yesterday", time: "12:45 PM", status: "completed", reference: "REF-8846032", vendor: "Mama Nkechi Kitchen" },
    { id: "TXN-004", type: "receive", amount: 10000, description: "Received from Dad", date: "Yesterday", time: "9:00 AM", status: "completed", reference: "REF-8845891", from: "Dad" },
  ];
}

// ─── Orders LocalStorage ──────────────────────────────────────────
export function getLocalOrders(): LocalOrder[] {
  return getLocal<LocalOrder[]>(ORDER_KEY, getDefaultOrders());
}

function createLocalOrder(items: any[], total: number, deliveryFee: number, address: string, paymentMethod: string) {
  const orderId = `ORD-${Date.now().toString(36).toUpperCase().slice(-4)}`;
  const order: LocalOrder = {
    orderId,
    items,
    total,
    deliveryFee,
    status: "preparing",
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }),
    address,
    estimatedDelivery: new Date(Date.now() + 45 * 60000).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    driver: { name: "Emeka O.", phone: "+234 803 *** 4521" },
    paymentMethod,
  };

  const orders = getLocalOrders();
  orders.unshift(order);
  setLocal(ORDER_KEY, orders);

  if (paymentMethod === "food_credits") {
    const wallet = getLocalWallet();
    const newWallet = {
      ...wallet,
      balance: wallet.balance - total,
      totalSpent: wallet.totalSpent + total,
    };
    setLocal(WALLET_KEY, newWallet);

    const tx: LocalTransaction = {
      id: `TXN-${Date.now().toString(36).toUpperCase()}`,
      type: "redemption",
      amount: total,
      description: `Order ${orderId} - ${items.length} items`,
      date: order.date || "",
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      status: "completed",
      reference: `REF-${Date.now()}`,
      vendor: items[0]?.vendor || "Campus Green Mart",
    };
    addLocalTransaction(tx);

    return { order, newBalance: newWallet.balance };
  }

  return { order, newBalance: 0 };
}

function updateLocalOrderStatus(orderId: string, status: string) {
  const orders = getLocalOrders();
  const updated = orders.map(o => (o.orderId === orderId || o.id === orderId) ? { ...o, status } : o);
  setLocal(ORDER_KEY, updated);
  return updated.find(o => o.orderId === orderId || o.id === orderId);
}

function getDefaultOrders(): LocalOrder[] {
  return [
    {
      orderId: "ORD-2847",
      items: [
        { id: 1, name: "Long Grain Rice", price: 4500, unit: "5kg", image: "", qty: 2, vendor: "Mama Nkechi Kitchen" },
        { id: 6, name: "Fresh Tomatoes", price: 800, unit: "1kg", image: "", qty: 3, vendor: "Campus Green Mart" },
      ],
      total: 11400, deliveryFee: 0, status: "on_the_way",
      date: "Today, 2:30 PM", address: "12 Wuse Zone 5, Abuja",
      estimatedDelivery: "4:45 PM",
      driver: { name: "Emeka O.", phone: "+234 803 *** 4521" },
      paymentMethod: "food_credits",
    },
  ];
}

// ─── Cart LocalStorage ────────────────────────────────────────────
export function getLocalCart(): any[] {
  return getLocal<any[]>(CART_KEY, []);
}

export function setLocalCart(cart: any[]): void {
  setLocal(CART_KEY, cart);
}

export function addToLocalCart(item: any): any[] {
  const cart = getLocalCart();
  const existing = cart.find((c: any) => c.id === item.id);
  let newCart: any[];
  if (existing) {
    newCart = cart.map((c: any) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
  } else {
    newCart = [...cart, { ...item, qty: 1 }];
  }
  setLocal(CART_KEY, newCart);
  return newCart;
}

export function updateLocalCartItemQty(itemId: number, delta: number): any[] {
  const cart = getLocalCart();
  const newCart = cart.map((item: any) => {
    if (item.id === itemId) {
      const newQty = item.qty + delta;
      return newQty > 0 ? { ...item, qty: newQty } : item;
    }
    return item;
  }).filter((item: any) => item.qty > 0);
  setLocal(CART_KEY, newCart);
  return newCart;
}

export function clearLocalCart(): void {
  setLocal(CART_KEY, []);
}

// ─── Contacts LocalStorage ────────────────────────────────────────
export function getLocalContacts(): LocalContact[] {
  return getLocal<LocalContact[]>(CONTACT_KEY, getDefaultContacts());
}

function addLocalContact(contact: Omit<LocalContact, "id" | "initials">): void {
  const contacts = getLocalContacts();
  const initials = contact.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  const newContact: LocalContact = { ...contact, id: `C-${Date.now()}`, initials };
  const exists = contacts.find(c => c.name === contact.name);
  if (!exists) {
    contacts.unshift(newContact);
    setLocal(CONTACT_KEY, contacts);
  }
}

function getDefaultContacts(): LocalContact[] {
  return [
    { id: "1", name: "Chidinma Okafor", phone: "+234 803 *** 4521", initials: "CO", lastTransfer: "Yesterday" },
    { id: "2", name: "Amina Bello", phone: "+234 805 *** 7832", initials: "AB", lastTransfer: "Jul 28" },
    { id: "3", name: "Dad", phone: "+234 802 *** 1234", initials: "D", lastTransfer: "Jul 25" },
  ];
}

// ─── Profile LocalStorage ─────────────────────────────────────────
export function getLocalProfile(): LocalProfile {
  return getLocal<LocalProfile>(PROFILE_KEY, {
    fullName: localStorage.getItem("fullName") || "",
    email: localStorage.getItem("email") || "",
    phone: "",
    avatar: null,
    address: "",
  });
}

function setLocalProfile(profile: LocalProfile): void {
  setLocal(PROFILE_KEY, profile);
}

function updateLocalProfile(data: Partial<LocalProfile>): LocalProfile {
  const profile = getLocalProfile();
  const updated = { ...profile, ...data };
  setLocal(PROFILE_KEY, updated);
  if (data.fullName) localStorage.setItem("fullName", data.fullName);
  if (data.email) localStorage.setItem("email", data.email);
  return updated;
}

// ─── Vendor Orders LocalStorage ───────────────────────────────────
export function getLocalVendorOrders(): any[] {
  return getLocal<any[]>(VENDOR_ORDER_KEY, []);
}

function updateLocalVendorOrderStatus(orderId: string, status: string) {
  const orders = getLocalVendorOrders();
  const updated = orders.map(o => o.orderId === orderId ? { ...o, status } : o);
  setLocal(VENDOR_ORDER_KEY, updated);
  return updated.find(o => o.orderId === orderId);
}

// ─── Monnify Account ──────────────────────────────────────────────
export function getMonnifyAccount(): string | null {
  return localStorage.getItem("monnifyAccountNumber");
}

export function setMonnifyAccount(accountNumber: string): void {
  localStorage.setItem("monnifyAccountNumber", accountNumber);
}
