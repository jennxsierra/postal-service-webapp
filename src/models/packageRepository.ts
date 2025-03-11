// src/models/packageRepository.ts
import { Package } from "./packageModel";

// Our in-memory storage
const packages: Package[] = [];

// Basic CRUD operations:
export function getAllPackages(): Package[] {
  return packages;
}

export function addPackage(pkg: Package): void {
  packages.push(pkg);
}

export function findPackageByTrackingNumber(
  trackingNumber: number
): Package | undefined {
  return packages.find((p) => p.trackingNumber === trackingNumber);
}

// You can add more functions as needed, e.g., updatePackage, removePackage, etc.
