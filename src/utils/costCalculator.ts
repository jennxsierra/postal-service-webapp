// src/utils/costCalculator.ts

import { Package } from "../models/Package";
import { ShippingMethod } from "../models/enums";

export function calculateCost(pkg: Package): number {
  switch (pkg.getShippingMethod()) {
    case ShippingMethod.ONE_DAY:
      return pkg.getWeight() * pkg.getCostPerUnitWeight() + pkg.getFlatFee();

    case ShippingMethod.TWO_DAY:
      return (
        pkg.getWeight() * pkg.getCostPerUnitWeight() + pkg.getFlatFee() / 2
      );

    default:
      // fallback
      return 0;
  }
}
