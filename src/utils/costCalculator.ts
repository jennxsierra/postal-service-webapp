// src/utils/costCalculator.ts

import { Package } from "../classes/Package";
import { ShippingMethod } from "../enums";

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
