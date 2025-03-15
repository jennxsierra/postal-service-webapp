import { Request, Response } from "express";
import bwipjs from "bwip-js";

export function generateBarcode(req: Request, res: Response) {
  const { trackingNumber } = req.params;
  bwipjs.toBuffer(
    {
      bcid: "code128", // Barcode type
      text: trackingNumber, // Text to encode
      scale: 3, // 3x scaling factor
      height: 10, // Bar height, in millimeters
      includetext: true, // Show human-readable text
      textxalign: "center", // Always good to set this
    },
    (err, png) => {
      if (err) {
        res.status(500).send("Error generating barcode");
      } else {
        res.type("png");
        res.send(png);
      }
    }
  );
}
