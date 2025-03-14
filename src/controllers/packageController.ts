import { Request, Response } from "express";
import { postalSystem } from "../singletons/postalSystem";
import { PackageStatus } from "../enums";
import { generateTrackingNumber } from "../utils/trackingNumberGenerator";

export function listPackages(req: Request, res: Response) {
  const allPackages = postalSystem.getAllPackages();
  res.render("packages/list", { packages: allPackages });
}

export function showNewPackageForm(req: Request, res: Response) {
  res.render("packages/new");
}

export function createPackage(req: Request, res: Response) {
  const {
    senderName,
    senderAddress,
    receiverName,
    receiverAddress,
    weight,
    costPerUnitWeight,
    flatFee,
    shippingMethod,
  } = req.body;

  const trackingNumber = generateTrackingNumber(); // generate our alphanumeric tracking number

  if (shippingMethod === "TwoDay") {
    postalSystem.addTwoDayPackage(
      trackingNumber,
      senderName,
      senderAddress,
      receiverName,
      receiverAddress,
      Number(weight),
      Number(costPerUnitWeight),
      Number(flatFee)
    );
  } else {
    // default to OneDay if shippingMethod isn't "TwoDay"
    postalSystem.addOneDayPackage(
      trackingNumber,
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

export function getPackageDetails(req: Request, res: Response) {
  const { trackingNumber } = req.params;
  const pkg = postalSystem.findPackage(trackingNumber);
  if (!pkg) {
    return res.status(404).send("Package not found");
  }

  const cost = pkg.calculateCost();
  res.render("packages/details", { package: pkg, cost });
}

export function updateStatus(req: Request, res: Response) {
  const trackingNumber = req.params.trackingNumber;
  const newStatus = req.body.newStatus as PackageStatus;
  postalSystem.updatePackageStatus(trackingNumber, newStatus);
  res.redirect(`/packages/${trackingNumber}`);
}

export function searchPackage(req: Request, res: Response) {
  const trackingNumber = (req.query.trackingNumber as string).trim();
  if (!trackingNumber) {
    return res.redirect("/packages");
  }

  const pkg = postalSystem.findPackage(trackingNumber);
  if (!pkg) {
    return res.status(404).send("Package not found");
  }

  res.redirect(`/packages/${trackingNumber}`);
}
