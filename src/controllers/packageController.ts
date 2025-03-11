// src/controllers/packageController.ts
import { Request, Response } from "express";
import {
  getAllPackages,
  addPackage,
  findPackageByTrackingNumber,
} from "../models/packageRepository";

export function listPackages(req: Request, res: Response) {
  const allPackages = getAllPackages();
  // Render an EJS template to display packages
  res.render("packages/list", { packages: allPackages });
}

export function showNewPackageForm(req: Request, res: Response) {
  // Render a simple form to create a new package
  res.render("packages/new");
}

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
  } = req.body;

  // Construct a new Package object
  const newPkg = {
    trackingNumber: Number(trackingNumber),
    senderName,
    senderAddress,
    receiverName,
    receiverAddress,
    weight: Number(weight),
    costPerUnitWeight: Number(costPerUnitWeight),
    flatFee: Number(flatFee),
    shippingMethod: "OneDay", // or 'TwoDay', etc., for now just default
    status: "Created",
  };

  // Save to in-memory array
  addPackage(newPkg);

  // Redirect or render a success page
  res.redirect("/packages");
}

export function getPackageDetails(req: Request, res: Response) {
  const { trackingNumber } = req.params;
  const pkg = findPackageByTrackingNumber(Number(trackingNumber));

  if (!pkg) {
    return res.status(404).send("Package not found");
  }

  res.render("packages/details", { package: pkg });
}
