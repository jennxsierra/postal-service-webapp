import express from "express";
import path from "path";
import bodyParser from "body-parser";
import packageRoutes from "./routes/packageRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "src", "views"));

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "..", "public")));

// Parse form data (urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

// Basic test route
app.get("/", (req, res) => {
  res.render("index", { message: "Hello from Postal Service Web App!" });
});

// Attach package routes under /packages
app.use("/packages", packageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
