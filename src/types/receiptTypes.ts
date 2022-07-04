export type VariantType = {
  name: string;
  price: number | null;
};

export type ItemsType = {
  name: string;
  quantity: number;
  price: number;
  variants: VariantType[];
  allergies: string[];
};

export type ReceiptVat = {
  vat: number;
  gross: number;
};

type ReceiptCurrency = {
  locales: string;
  currency: string;
};

export interface ReceiptType {
  id: number;
  restaurantName: string;
  address: string;
  restaurantPhoneNumber: string;
  orgnr: string;
  date: string;
  sn: string;
  ka: string;
  total: number;
  rounding: number;
  receiptCurrency: ReceiptCurrency;
  items: ItemsType[];
  receiptVat: ReceiptVat[];
  paymentMethod: string;
  deliveryType: string;
  isReturnReceipt: boolean;
  cardType?: string;
  cardNumber?: string;
  deliveryCostInfo?: string;
}
