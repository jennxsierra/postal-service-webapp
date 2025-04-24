import { Package } from "./Package";
import { ShippingMethod, PackageStatus } from "./enums";
import { IOneDayPackage } from "../interfaces/IOneDayPackage";

export class OneDayPackage extends Package implements IOneDayPackage {
  constructor(
    trackingNumber: string,
    senderName: string,
    senderAddress: string,
    receiverName: string,
    receiverAddress: string,
    weight: number,
    costPerUnitWeight: number,
    flatFee: number,
    status: PackageStatus
  ) {
    super(
      trackingNumber,
      ShippingMethod.ONE_DAY,
      status,
      senderName,
      senderAddress,
      receiverName,
      receiverAddress,
      weight,
      costPerUnitWeight,
      flatFee
    );
  }

  public calculateCost(): number {
    return this.getWeight() * this.getCostPerUnitWeight() + this.getFlatFee();
  }

  public printLabel(): string {
    return `
      OneDayPackage [#${this.getTrackingNumber()}]
      From: ${this.getSenderName()}, ${this.getSenderAddress()}
      To: ${this.getReceiverName()}, ${this.getReceiverAddress()}
    `;
  }
}