import express from 'express';

import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    requireRole,
    showDashboard,
    showUsersPage
} from "./controllers/users.js";

import {
    getOrganizations,
    getOrganization,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm
} from './controllers/organizations.js';

import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
} from './controllers/categories.js';

import {
    getProjects,
    getProject,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    projectValidation
} from './controllers/projects.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/organizations');
});

/* ORGANIZATIONS */

router.get('/organizations', getOrganizations);

router.get(
    '/organizations/new',
    requireLogin,
    requireRole('admin'),
    showNewOrganizationForm
);

router.post(
    '/organizations/new',
    requireLogin,
    requireRole('admin'),
    organizationValidation,
    processNewOrganizationForm
);

router.get(
    '/edit-organization/:id',
    requireLogin,
    requireRole('admin'),
    showEditOrganizationForm
);

router.post(
    '/edit-organization/:id',
    requireLogin,
    requireRole('admin'),
    organizationValidation,
    processEditOrganizationForm
);

router.get(
    '/organizations/:id/edit',
    requireLogin,
    requireRole('admin'),
    showEditOrganizationForm
);

router.get(
    '/organizations/:id',
    getOrganization
);

/* CATEGORIES */

router.get(
    '/categories',
    showCategoriesPage
);

router.get(
    '/new-category',
    requireLogin,
    requireRole('admin'),
    showNewCategoryForm
);

router.post(
    '/new-category',
    requireLogin,
    requireRole('admin'),
    categoryValidation,
    processNewCategoryForm
);

router.get(
    '/edit-category/:id',
    requireLogin,
    requireRole('admin'),
    showEditCategoryForm
);

router.post(
    '/edit-category/:id',
    requireLogin,
    requireRole('admin'),
    categoryValidation,
    processEditCategoryForm
);

router.get(
    '/categories/:id',
    showCategoryDetailsPage
);

/* PROJECTS */

router.get(
    '/projects',
    getProjects
);

router.get(
    '/new-project',
    requireLogin,
    requireRole('admin'),
    showNewProjectForm
);

router.post(
    '/new-project',
    requireLogin,
    requireRole('admin'),
    projectValidation,
    processNewProjectForm
);

router.get(
    '/edit-project/:id',
    requireLogin,
    requireRole('admin'),
    showEditProjectForm
);

router.post(
    '/edit-project/:id',
    requireLogin,
    requireRole('admin'),
    projectValidation,
    processEditProjectForm
);

router.get(
    '/projects/:id',
    getProject
);

/* USERS */

router.get(
    '/register',
    showUserRegistrationForm
);

router.post(
    '/register',
    processUserRegistrationForm
);

router.get(
    '/login',
    showLoginForm
);

router.post(
    '/login',
    processLoginForm
);

router.get(
    '/logout',
    processLogout
);

/* PROTECTED DASHBOARD */

router.get(
    '/dashboard',
    requireLogin,
    showDashboard
);

/* ADMIN USERS PAGE */

router.get(
    '/users',
    requireLogin,
    requireRole('admin'),
    showUsersPage
);

export default router;
