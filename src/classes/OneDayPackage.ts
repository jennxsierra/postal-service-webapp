// src/classes/OneDayPackage.ts
import { Package } from "./Package";
import { ShippingMethod, PackageStatus } from "../enums";

export class OneDayPackage extends Package {
  constructor(
    trackingNumber: string,
    senderName: string,
    senderAddress: string,
    receiverName: string,
    receiverAddress: string,
    weight: number,
    costPerUnitWeight: number,
    flatFee: number
  ) {
    super(
      trackingNumber,
      ShippingMethod.ONE_DAY,
      PackageStatus.CREATED,
      senderName,
      senderAddress,
      receiverName,
      receiverAddress,
      weight,
      costPerUnitWeight,
      flatFee
    );
  }

  // Override the abstract methods:
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
