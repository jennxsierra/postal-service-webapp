// src/utils/costCalculator.ts

import { Package, ShippingMethod } from "../models/packageModel";

export function calculateCost(pkg: Package): number {
  switch (pkg.shippingMethod) {
    case ShippingMethod.ONE_DAY:
      return pkg.weight * pkg.costPerUnitWeight + pkg.flatFee;

    case ShippingMethod.TWO_DAY:
      return pkg.weight * pkg.costPerUnitWeight + pkg.flatFee / 2;

    default:
      // fallback
      return 0;
  }
}
