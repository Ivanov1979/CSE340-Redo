import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { getAllOrganizations } from "./src/models/organizations.js";
import { getAllCategories } from "./src/models/categories.js";
import { getAllProjects } from "./src/models/projects.js";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

app.get("/organizations", async (req, res) => {
    try {
        const organizations = await getAllOrganizations();
        const title = "Our Partner Organizations";

        res.render("organizations", { title, organizations });
    } catch (error) {
        console.error(error);
        res.send("Database error");
    }
});

app.get("/projects", async (req, res) => {
    try {
        const projects = await getAllProjects();
        const title = "Service Projects";

        res.render("projects", { title, projects });
    } catch (error) {
        console.error(error);
        res.send("Database error");
    }
});

app.get("/categories", async (req, res) => {
    try {
        const categories = await getAllCategories();
        const title = "Service Project Categories";

        res.render("categories", { title, categories });
    } catch (error) {
        console.error(error);
        res.send("Database error");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});