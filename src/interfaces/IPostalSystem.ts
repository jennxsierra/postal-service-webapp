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
  ): IPackage;

  addTwoDayPackage(
    trackingNumber: string,
    senderName: string,
    senderAddress: string,
    receiverName: string,
    receiverAddress: string,
    weight: number,
    costPerUnitWeight: number,
    flatFee: number
  ): IPackage;

  findPackage(trackingNumber: string): IPackage | undefined;
  getAllPackages(): IPackage[];
  removePackage(trackingNumber: string): boolean;
  updatePackageStatus(trackingNumber: string, newStatus: PackageStatus): boolean;
}