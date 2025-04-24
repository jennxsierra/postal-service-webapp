import { Router } from "express";
import {
  showHomePage,
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
import { validatePackage } from "../middleware/validatePackage";

const router = Router();

// GET / -> Home route
router.get("/", showHomePage);

// GET /packages -> List all packages
router.get("/packages", listPackages);

// GET /packages/search -> Search by tracking number
router.get("/packages/search", searchPackage);

// GET /packages/new -> Show form to create a package
router.get("/packages/new", showNewPackageForm);

// POST /packages -> Create a new package
router.post("/packages", validatePackage, createPackage);

// GET /packages/remove -> Show form to remove a package
router.get("/packages/remove", showRemovePackageForm);

// POST /packages/confirm-remove -> Show confirmation page
router.post("/packages/confirm-remove", confirmRemovePackage);

// DELETE /packages/remove -> Remove a package
router.delete("/packages/remove", removePackage);

// GET /packages/:trackingNumber -> Show package details
router.get("/packages/:trackingNumber", getPackageDetails);

// POST /packages/:trackingNumber/status -> Update status
router.post("/packages/:trackingNumber/status", updateStatus);

// GET /packages/:trackingNumber/barcode -> Generate barcode
router.get("/packages/:trackingNumber/barcode", generateBarcode);

export default router;
