import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validatePackage = [
  body("senderName").notEmpty().withMessage("Sender Name is required"),
  body("senderAddress").notEmpty().withMessage("Sender Address is required"),
  body("receiverName").notEmpty().withMessage("Receiver Name is required"),
  body("receiverAddress")
    .notEmpty()
    .withMessage("Receiver Address is required"),
  body("weight")
    .notEmpty()
    .withMessage("Weight is required")
    .isFloat({ gt: 0 })
    .withMessage("Weight must be a positive number"),
  body("costPerUnitWeight")
    .notEmpty()
    .withMessage("Cost Per Unit Weight is required")
    .isFloat({ gt: 0 })
    .withMessage("Cost Per Unit Weight must be a positive number"),
  body("flatFee")
    .notEmpty()
    .withMessage("Flat Fee is required")
    .isFloat({ gt: 0 })
    .withMessage("Flat Fee must be a positive number"),
  body("shippingMethod")
    .isIn(["OneDay", "TwoDay"])
    .withMessage("Shipping Method must be either 'OneDay' or 'TwoDay'"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("packages/new", {
        errors: errors.array(),
        ...req.body,
      });
    }
    next();
  },
];
