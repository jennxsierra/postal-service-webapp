// src/classes/Package.ts
import { ShippingMethod, PackageStatus } from "../enums";

export abstract class Package {
  // Protected so child classes can access, but external code must use getters/setters
  protected trackingNumber: number;
  protected shippingMethod: ShippingMethod;
  protected status: PackageStatus;
  protected senderName: string;
  protected senderAddress: string;
  protected receiverName: string;
  protected receiverAddress: string;
  protected weight: number;
  protected costPerUnitWeight: number;
  protected flatFee: number;

  constructor(
    trackingNumber: number,
    shippingMethod: ShippingMethod,
    status: PackageStatus,
    senderName: string,
    senderAddress: string,
    receiverName: string,
    receiverAddress: string,
    weight: number,
    costPerUnitWeight: number,
    flatFee: number
  ) {
    this.trackingNumber = trackingNumber;
    this.shippingMethod = shippingMethod;
    this.status = status;
    this.senderName = senderName;
    this.senderAddress = senderAddress;
    this.receiverName = receiverName;
    this.receiverAddress = receiverAddress;
    this.weight = weight;
    this.costPerUnitWeight = costPerUnitWeight;
    this.flatFee = flatFee;
  }

  // ----- Getters -----
  public getTrackingNumber(): number {
    return this.trackingNumber;
  }

  public getShippingMethod(): ShippingMethod {
    return this.shippingMethod;
  }

  public getStatus(): PackageStatus {
    return this.status;
  }

  public getSenderName(): string {
    return this.senderName;
  }

  public getSenderAddress(): string {
    return this.senderAddress;
  }

  public getReceiverName(): string {
    return this.receiverName;
  }

  public getReceiverAddress(): string {
    return this.receiverAddress;
  }

  public getWeight(): number {
    return this.weight;
  }

  public getCostPerUnitWeight(): number {
    return this.costPerUnitWeight;
  }

  public getFlatFee(): number {
    return this.flatFee;
  }

  // ----- Setters -----
  public setStatus(newStatus: PackageStatus): void {
    this.status = newStatus;
  }

  public setWeight(weight: number): void {
    if (weight > 0) {
      this.weight = weight;
    }
  }

  public abstract calculateCost(): number;

  public abstract printLabel(): string;
}
