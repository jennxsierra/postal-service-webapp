// src/classes/PostalSystem.ts
import { Package } from "./Package";
import { OneDayPackage } from "./OneDayPackage";
import { TwoDayPackage } from "./TwoDayPackage";
import { ShippingMethod, PackageStatus } from "../enums";

export class PostalSystem {
  private packages: Package[] = []; // store child objects of type Package

  public addOneDayPackage(
    trackingNumber: number,
    senderName: string,
    senderAddress: string,
    receiverName: string,
    receiverAddress: string,
    weight: number,
    costPerUnitWeight: number,
    flatFee: number
  ): Package {
    const pkg = new OneDayPackage(
      trackingNumber,
      senderName,
      senderAddress,
      receiverName,
      receiverAddress,
      weight,
      costPerUnitWeight,
      flatFee
    );
    this.packages.push(pkg);
    return pkg;
  }

  public addTwoDayPackage(
    trackingNumber: number,
    senderName: string,
    senderAddress: string,
    receiverName: string,
    receiverAddress: string,
    weight: number,
    costPerUnitWeight: number,
    flatFee: number
  ): Package {
    const pkg = new TwoDayPackage(
      trackingNumber,
      senderName,
      senderAddress,
      receiverName,
      receiverAddress,
      weight,
      costPerUnitWeight,
      flatFee
    );
    this.packages.push(pkg);
    return pkg;
  }

  public findPackage(trackingNumber: number): Package | undefined {
    return this.packages.find(
      (pkg) => pkg.getTrackingNumber() === trackingNumber
    );
  }

  public getAllPackages(): Package[] {
    return this.packages;
  }

  public updatePackageStatus(
    trackingNumber: number,
    newStatus: PackageStatus
  ): boolean {
    const pkg = this.findPackage(trackingNumber);
    if (!pkg) return false;

    pkg.setStatus(newStatus);
    return true;
  }
}
