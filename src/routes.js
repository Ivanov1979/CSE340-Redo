import express from "express";

import {
    showHomePage
} from "./controllers/index.js";

import {
    showOrganizationsPage
} from "./controllers/organizations.js";

import {
    showProjectsPage,
    showProjectDetailsPage
} from "./controllers/projects.js";

import {
    showCategoriesPage,
    showCategoryDetailsPage
} from "./controllers/categories.js";

import {
    testErrorPage
} from "./controllers/errors.js";

const router = express.Router();

// ======================================
// MAIN ROUTES
// ======================================

// Home page
router.get("/",
    showHomePage);

// Organizations page
router.get("/organizations",
    showOrganizationsPage);

// Projects page
router.get("/projects",
    showProjectsPage);

// Project details page
router.get("/project/:id",
    showProjectDetailsPage);

// Categories page
router.get("/categories",
    showCategoriesPage);

// Category details page
router.get("/category/:id",
    showCategoryDetailsPage);

// ======================================
// ERROR TEST ROUTE
// ======================================

router.get("/test-error",
    testErrorPage);

// Export router
export default router;