import morgan from "morgan";
import { Request } from "express";

// Define a custom token to log the request body
morgan.token("body", (req: Request) => JSON.stringify(req.body));

// Define a custom token to log the timestamp in a more readable format
morgan.token("timestamp", () => {
  const now = new Date();
  return now.toLocaleString();
});

// Create a custom format that includes the request body and readable timestamp
const customFormat =
  "[:timestamp] :method :url :status :res[content-length] - :response-time ms :body";

const logger = morgan(customFormat);

export default logger;
