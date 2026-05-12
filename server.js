import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

// Static files
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

app.get("/organizations", (req, res) => {
    res.render("organizations", { title: "Organizations" });
});

app.get("/projects", (req, res) => {
    res.render("projects", { title: "Projects" });
});

app.get("/categories", (req, res) => {
    res.render("categories", { title: "Categories" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});