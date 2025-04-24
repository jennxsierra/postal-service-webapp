import { Request, Response } from "express";
import { promisify } from "util";
import bwipjs from "bwip-js";

const toBufferAsync = promisify(bwipjs.toBuffer as any);

export async function generateBarcode(
  req: Request<{ trackingNumber: string }>,
  res: Response
) {
  const { trackingNumber } = req.params;

  try {
    const png = await toBufferAsync({
      bcid: "code128", // Barcode type
      text: trackingNumber, // Text to encode
      scale: 3, // 3x scaling factor
      height: 10, // Bar height, in millimeters
      includetext: true, // Show human-readable text
      textxalign: "center",
    });

    res.type("png");
    res.send(png);
  } catch (err) {
    console.error("Error generating barcode:", err);
    res.status(500).send("Error generating barcode");
  }
}
