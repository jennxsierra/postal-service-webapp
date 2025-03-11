// src/models/packageModel.ts
export interface Package {
  trackingNumber: number;
  senderName: string;
  senderAddress: string;
  receiverName: string;
  receiverAddress: string;
  weight: number;
  costPerUnitWeight: number;
  flatFee: number;
  shippingMethod: string;
  status: string;
}
