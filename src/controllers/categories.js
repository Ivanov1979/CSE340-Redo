import {
    getAllCategories,
    getCategoryDetails,
    getProjectsByCategoryId,
    createCategory,
    updateCategory
} from "../models/categories.js";

import {
    body,
    validationResult
} from "express-validator";

const categoryValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Category name is required")
        .isLength({ min: 3, max: 100 })
        .withMessage("Category name must be between 3 and 100 characters")
];

const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();

    res.render("categories", {
        title: "Service Categories",
        categories
    });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;

    const category = await getCategoryDetails(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);

    const title = category
        ? category.name
        : "Category Not Found";

    res.render("category", {
        title,
        category,
        projects
    });
};

const showNewCategoryForm = async (req, res) => {
    res.render("new-category", {
        title: "Add New Category"
    });
};

const processNewCategoryForm = async (req, res) => {
    const results = validationResult(req);

    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash("error", error.msg);
        });

        return res.redirect("/new-category");
    }

    const { name } = req.body;

    await createCategory(name);

    req.flash("success", "Category added successfully!");

    res.redirect("/categories");
};

const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;

    const category = await getCategoryDetails(categoryId);

    if (!category) {
        req.flash("error", "Category not found");
        return res.redirect("/categories");
    }

    res.render("edit-category", {
        title: "Edit Category",
        category
    });
};

const processEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;

    const results = validationResult(req);

    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash("error", error.msg);
        });

        return res.redirect(`/edit-category/${categoryId}`);
    }

    const { name } = req.body;

    await updateCategory(categoryId, name);

    req.flash("success", "Category updated successfully!");

    res.redirect(`/categories/${categoryId}`);
};

export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
};