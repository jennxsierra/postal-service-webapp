import { ShippingMethod, PackageStatus } from "../models/enums";

export interface IPackage {
  getTrackingNumber(): string;
  getShippingMethod(): ShippingMethod;
  getStatus(): PackageStatus;
  getSenderName(): string;
  getSenderAddress(): string;
  getReceiverName(): string;
  getReceiverAddress(): string;
  getWeight(): number;
  getCostPerUnitWeight(): number;
  getFlatFee(): number;
  setStatus(newStatus: PackageStatus): void;
  setWeight(weight: number): void;
  calculateCost(): number;
  printLabel(): string;
}