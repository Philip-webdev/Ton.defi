
export interface ProductItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CheckoutState {
  items: ProductItem[];
  total: number;
  currency: string;
}

export enum PaymentMethodType {
  CASH = 'CASH',
  CARD = 'CARD',
  CRYPTO = 'CRYPTO',
  NET_BANKING = 'NET_BANKING'
}

export interface SavedCard {
  id: string;
  brand: 'visa' | 'mastercard' | 'amex';
  last4: string;
  bank: string;
}

export interface CryptoToken {
  symbol: string;
  name: string;
  icon: string;
  network: string;
  balance?: string;
}
