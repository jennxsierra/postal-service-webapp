// src/middleware/loadTestData.ts
import { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import { postalSystem } from "../singletons/postalSystem";
import { generateTrackingNumber } from "../utils/trackingNumberGenerator";

let dataLoaded = false;

export const loadTestData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!dataLoaded) {
    const testDataPath = path.join(
      __dirname,
      "..",
      "..",
      "data",
      "testData.json"
    );
    if (fs.existsSync(testDataPath)) {
      const testData = JSON.parse(fs.readFileSync(testDataPath, "utf-8"));
      testData.forEach((pkg: any) => {
        const trackingNumber = generateTrackingNumber();
        if (pkg.shippingMethod === "TwoDay") {
          postalSystem.addTwoDayPackage(
            trackingNumber,
            pkg.senderName,
            pkg.senderAddress,
            pkg.receiverName,
            pkg.receiverAddress,
            pkg.weight,
            pkg.costPerUnitWeight,
            pkg.flatFee
          );
        } else {
          postalSystem.addOneDayPackage(
            trackingNumber,
            pkg.senderName,
            pkg.senderAddress,
            pkg.receiverName,
            pkg.receiverAddress,
            pkg.weight,
            pkg.costPerUnitWeight,
            pkg.flatFee
          );
        }
      });
    }
    dataLoaded = true;
  }
  next();
};
