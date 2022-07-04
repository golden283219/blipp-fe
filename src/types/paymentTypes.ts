export enum PaymentTypes {
  CreditCard = 'CreditCard',
  Swish = 'Swish',
}

export type PaymentSettings = {
  type: PaymentTypes;
  phoneNumber: string;
};
