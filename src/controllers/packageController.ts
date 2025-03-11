// src/controllers/packageController.ts
import { Request, Response } from "express";
import { postalSystem } from "../singletons/postalSystem";
import { PackageStatus } from "../enums";

// Show form
export function showNewPackageForm(req: Request, res: Response) {
  res.render("packages/new");
}

// Create package
export function createPackage(req: Request, res: Response) {
  const {
    trackingNumber,
    senderName,
    senderAddress,
    receiverName,
    receiverAddress,
    weight,
    costPerUnitWeight,
    flatFee,
    shippingMethod,
  } = req.body;

  if (shippingMethod === "TwoDay") {
    postalSystem.addTwoDayPackage(
      Number(trackingNumber),
      senderName,
      senderAddress,
      receiverName,
      receiverAddress,
      Number(weight),
      Number(costPerUnitWeight),
      Number(flatFee)
    );
  } else {
    // default to OneDay
    postalSystem.addOneDayPackage(
      Number(trackingNumber),
      senderName,
      senderAddress,
      receiverName,
      receiverAddress,
      Number(weight),
      Number(costPerUnitWeight),
      Number(flatFee)
    );
  }

  res.redirect("/packages");
}

export function listPackages(req: Request, res: Response) {
  const all = postalSystem.getAllPackages();
  res.render("packages/list", { packages: all });
}

export function getPackageDetails(req: Request, res: Response) {
  const { trackingNumber } = req.params;
  const pkg = postalSystem.findPackage(Number(trackingNumber));

  if (!pkg) {
    return res.status(404).send("Package not found");
  }

  // Evaluate the cost by calling the overridden method
  const cost = pkg.calculateCost();

  // Passing both the package object and the cost to the template
  res.render("packages/details", { package: pkg, cost });
}

export function updateStatus(req: Request, res: Response) {
  const tracking = Number(req.params.trackingNumber);
  const { newStatus } = req.body;

  // Validate newStatus or cast it to PackageStatus if needed
  postalSystem.updatePackageStatus(tracking, newStatus as PackageStatus);
  res.redirect(`/packages/${tracking}`);
}
