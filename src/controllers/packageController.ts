import { Request, Response } from "express";
import { postalSystem } from "../singletons/postalSystem";
import { PackageStatus } from "../models/enums";
import { generateTrackingNumber } from "../utils/trackingNumberGenerator";

export async function listPackages(req: Request, res: Response) {
  try {
    const allPackages = await postalSystem.getAllPackages(); // Await the result

    res.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
    res.set("Surrogate-Control", "no-store");

    res.render("packages/list", { packages: allPackages });
  } catch (error) {
    console.error("Error fetching packages:", error);
    res.status(500).render("404", { message: "Failed to load packages" });
  }
}

export function showNewPackageForm(req: Request, res: Response) {
  res.render("packages/new", {
    errors: [],
    senderName: "",
    senderAddress: "",
    receiverName: "",
    receiverAddress: "",
    weight: "",
    costPerUnitWeight: "",
    flatFee: "",
    shippingMethod: "",
  });
}

export async function createPackage(req: Request, res: Response) {
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

  const trackingNumber = generateTrackingNumber(); // Generate tracking number

  try {
    if (shippingMethod === "TwoDay") {
      await postalSystem.addTwoDayPackage(
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
      // Default to OneDay if shippingMethod isn't "TwoDay"
      await postalSystem.addOneDayPackage(
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
  } catch (error) {
    console.error("Error creating package:", error);
    res.status(500).send("Failed to create package");
  }
}

export function showRemovePackageForm(req: Request, res: Response) {
  res.render("packages/remove");
}

export async function confirmRemovePackage(req: Request, res: Response) {
  const { trackingNumber } = req.body;

  try {
    const pkg = await postalSystem.findPackage(trackingNumber); // Await the result
    if (!pkg) {
      return res.status(404).render("404", { message: "Package not found" });
    }

    res.render("packages/confirmRemove", { pkg });
  } catch (error) {
    console.error("Error fetching package:", error);
    res.status(500).send("Failed to fetch package details");
  }
}

export async function removePackage(req: Request, res: Response) {
  const { trackingNumber } = req.body;

  try {
    const pkg = await postalSystem.findPackage(trackingNumber); // Ensure the package exists
    if (!pkg) {
      return res.status(404).render("404", { message: "Package not found" });
    }

    const removed = await postalSystem.removePackage(trackingNumber); // Await the removal
    if (!removed) {
      return res.status(500).send("Failed to remove package");
    }

    res.redirect("/packages"); // Redirect after successful removal
  } catch (error) {
    console.error("Error removing package:", error);
    res.status(500).send("Failed to remove package");
  }
}

export async function getPackageDetails(req: Request, res: Response) {
  const { trackingNumber } = req.params;
  const pkg = await postalSystem.findPackage(trackingNumber); // Await the result
  if (!pkg) {
    return res.status(404).send("Package not found");
  }

  const cost = pkg.calculateCost();
  res.render("packages/details", { package: pkg, cost });
}

export async function updateStatus(req: Request, res: Response) {
  const trackingNumber = req.params.trackingNumber;
  const newStatus = req.body.newStatus as PackageStatus;

  try {
    const updated = await postalSystem.updatePackageStatus(
      trackingNumber,
      newStatus
    ); // Await the result
    if (!updated) {
      return res.status(404).send("Package not found");
    }
    res.redirect(`/packages/${trackingNumber}`);
  } catch (error) {
    console.error("Error updating package status:", error);
    res.status(500).send("Failed to update package status");
  }
}

export async function searchPackage(req: Request, res: Response) {
  const trackingNumber = (req.query.trackingNumber as string).trim();
  if (!trackingNumber) {
    return res.redirect("/packages");
  }

  try {
    const pkg = await postalSystem.findPackage(trackingNumber); // Await the result
    if (!pkg) {
      return res.status(404).render("404", { message: "Package not found" });
    }

    res.redirect(`/packages/${trackingNumber}`);
  } catch (error) {
    console.error("Error searching for package:", error);
    res.status(500).send("Failed to search for package");
  }
}
