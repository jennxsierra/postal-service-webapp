import { IPackage } from "./IPackage";
import { PackageStatus } from "../models/enums";

export interface IPostalSystem {
  addOneDayPackage(
    trackingNumber: string,
    senderName: string,
    senderAddress: string,
    receiverName: string,
    receiverAddress: string,
    weight: number,
    costPerUnitWeight: number,
    flatFee: number
  ): Promise<IPackage>;

  addTwoDayPackage(
    trackingNumber: string,
    senderName: string,
    senderAddress: string,
    receiverName: string,
    receiverAddress: string,
    weight: number,
    costPerUnitWeight: number,
    flatFee: number
  ): Promise<IPackage>;

  findPackage(trackingNumber: string): Promise<IPackage | undefined>;
  getAllPackages(): Promise<IPackage[]>;
  removePackage(trackingNumber: string): Promise<boolean>;
  updatePackageStatus(
    trackingNumber: string,
    newStatus: PackageStatus
  ): Promise<boolean>;
}