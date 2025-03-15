import morgan from "morgan";
import { Request, Response, NextFunction } from "express";

// Define a custom token to log the request body
morgan.token("body", (req: Request) => JSON.stringify(req.body));

// Create a custom format that includes the request body
const customFormat =
  ":method :url :status :res[content-length] - :response-time ms :body";

const logger = morgan(customFormat);

export default logger;
