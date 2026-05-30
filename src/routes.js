import express from 'express';

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

router.get('/organizations/new', showNewOrganizationForm);

router.post(
    '/organizations/new',
    organizationValidation,
    processNewOrganizationForm
);

router.get(
    '/edit-organization/:id',
    showEditOrganizationForm
);

router.post(
    '/edit-organization/:id',
    organizationValidation,
    processEditOrganizationForm
);

router.get(
    '/organizations/:id/edit',
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
    showNewCategoryForm
);

router.post(
    '/new-category',
    categoryValidation,
    processNewCategoryForm
);

router.get(
    '/edit-category/:id',
    showEditCategoryForm
);

router.post(
    '/edit-category/:id',
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
    showNewProjectForm
);

router.post(
    '/new-project',
    projectValidation,
    processNewProjectForm
);

router.get(
    '/edit-project/:id',
    showEditProjectForm
);

router.post(
    '/edit-project/:id',
    projectValidation,
    processEditProjectForm
);

router.get(
    '/projects/:id',
    getProject
);

export default router;