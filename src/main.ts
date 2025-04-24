// src/server.ts
import express from "express";
import path from "path";
import packageRoutes from "./routes/packageRoutes";
import logger from "./middleware/logger";
import methodOverride from "method-override";
import { getLocalIPAddress } from "./utils/networkUtils";

const app = express();

// Use the logger middleware
app.use(logger);

// Use method-override to support DELETE and PUT methods in forms
app.use(methodOverride("_method"));

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from public
app.use(express.static(path.join(process.cwd(), "public")));

// Set EJS as the templating engine and set the views directory
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));

// Mount package routes
app.use("/", packageRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).render("404", { message: "Page Not Found" });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  const ipAddress = getLocalIPAddress();
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(
    `Access the server from another computer at http://${ipAddress}:${PORT}`
  );
});
