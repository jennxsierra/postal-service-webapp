// src/server.ts
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import packageRoutes from "./routes/packageRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "src", "views"));

// Serve static files from public
app.use(express.static(path.join(__dirname, "..", "public")));

// Parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Basic home route
app.get("/", (req, res) => {
  res.render("index", { message: "Welcome to the Postal Service System! 📦" });
});

// Mount package routes
app.use("/packages", packageRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).render("404", { message: "Page Not Found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
