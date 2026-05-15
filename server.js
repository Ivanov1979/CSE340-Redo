import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getAllOrganizations } from "./src/models/organizations.js";

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

// Home route
app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

// Organizations route
app.get("/organizations", async (req, res) => {

    try {

        const organizations = await getAllOrganizations();

        const title = "Our Partner Organizations";

        res.render("organizations", {
            title,
            organizations
        });

    } catch (error) {

        console.error(error);

        res.send("Database error");

    }

});

// Projects route
app.get("/projects", (req, res) => {
    res.render("projects", { title: "Projects" });
});

// Categories route
app.get("/categories", (req, res) => {
    res.render("categories", { title: "Categories" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});