// src/routes/packageRoutes.ts
import { Router } from "express";
import {
  listPackages,
  showNewPackageForm,
  createPackage,
  getPackageDetails,
} from "../controllers/packageController";

const router = Router();

// GET /packages -> List all packages
router.get("/", listPackages);

// GET /packages/new -> Show form to create a package
router.get("/new", showNewPackageForm);

// POST /packages -> Create a new package
router.post("/", createPackage);

// GET /packages/:trackingNumber -> Show package details
router.get("/:trackingNumber", getPackageDetails);

export default router;
