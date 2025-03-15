// src/routes/packageRoutes.ts
import { Router } from "express";
import {
  listPackages,
  showNewPackageForm,
  createPackage,
  getPackageDetails,
  updateStatus,
  searchPackage,
  showRemovePackageForm,
  confirmRemovePackage,
  removePackage,
} from "../controllers/packageController";
import { generateBarcode } from "../controllers/barcodeController";

const router = Router();

// GET /packages/search -> Search by tracking number
router.get("/search", searchPackage);

// GET /packages -> List all packages
router.get("/", listPackages);

// GET /packages/new -> Show form to create a package
router.get("/new", showNewPackageForm);

// POST /packages -> Create a new package
router.post("/", createPackage);

// GET /packages/remove -> Show form to remove a package
router.get("/remove", showRemovePackageForm);

// POST /packages/confirm-remove -> Show confirmation page
router.post("/confirm-remove", confirmRemovePackage);

// POST /packages/remove -> Remove a package
router.post("/remove", removePackage);

// GET /packages/:trackingNumber -> Show package details
router.get("/:trackingNumber", getPackageDetails);

// POST /packages/:trackingNumber/status -> Update status
router.post("/:trackingNumber/status", updateStatus);

// GET /packages/:trackingNumber/barcode -> Generate barcode
router.get("/:trackingNumber/barcode", generateBarcode);

export default router;
