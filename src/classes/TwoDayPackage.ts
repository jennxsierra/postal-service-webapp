// src/classes/TwoDayPackage.ts
import { Package } from "./Package";
import { ShippingMethod, PackageStatus } from "../enums";

export class TwoDayPackage extends Package {
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
      ShippingMethod.TWO_DAY,
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

  public calculateCost(): number {
    return (
      this.getWeight() * this.getCostPerUnitWeight() + this.getFlatFee() / 2
    );
  }

  public printLabel(): string {
    return `
      TwoDayPackage [#${this.getTrackingNumber()}]
      From: ${this.getSenderName()}, ${this.getSenderAddress()}
      To: ${this.getReceiverName()}, ${this.getReceiverAddress()}
    `;
  }
}
