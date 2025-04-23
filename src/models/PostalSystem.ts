import { IPostalSystem } from "../interfaces/IPostalSystem";
import { IPackage } from "../interfaces/IPackage";
import { OneDayPackage } from "./OneDayPackage";
import { TwoDayPackage } from "./TwoDayPackage";

export class PostalSystem implements IPostalSystem {
  private packages: IPackage[] = [];

  public addOneDayPackage(
    trackingNumber: string,
    senderName: string,
    senderAddress: string,
    receiverName: string,
    receiverAddress: string,
    weight: number,
    costPerUnitWeight: number,
    flatFee: number
  ): IPackage {
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
    trackingNumber: string,
    senderName: string,
    senderAddress: string,
    receiverName: string,
    receiverAddress: string,
    weight: number,
    costPerUnitWeight: number,
    flatFee: number
  ): IPackage {
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

  public findPackage(trackingNumber: string): IPackage | undefined {
    return this.packages.find(pkg => pkg.getTrackingNumber() === trackingNumber);
  }

  public getAllPackages(): IPackage[] {
    return this.packages;
  }

  public removePackage(trackingNumber: string): boolean {
    const index = this.packages.findIndex(pkg => pkg.getTrackingNumber() === trackingNumber);
    if (index === -1) return false;

    this.packages.splice(index, 1);
    return true;
  }

  public updatePackageStatus(trackingNumber: string, newStatus: string): boolean {
    const pkg = this.findPackage(trackingNumber);
    if (!pkg) return false;

    pkg.setStatus(newStatus as any);
    return true;
  }
}