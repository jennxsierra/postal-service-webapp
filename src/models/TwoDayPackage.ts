import { Package } from "./Package";
import { ShippingMethod, PackageStatus } from "./enums";
import { ITwoDayPackage } from "../interfaces/ITwoDayPackage";

export class TwoDayPackage extends Package implements ITwoDayPackage {
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
      ShippingMethod.TWO_DAY,
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