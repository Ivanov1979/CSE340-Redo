import {
    getAllProjects,
    getProjectDetails,
    createProject,
    updateProject
} from '../models/projects.js';

import {
    getAllOrganizations
} from '../models/organizations.js';

import {
    body,
    validationResult
} from 'express-validator';

const projectValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Project title is required')
        .isLength({ min: 3, max: 200 })
        .withMessage('Project title must be between 3 and 200 characters'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ max: 1000 })
        .withMessage('Description must be less than 1000 characters'),

    body('location')
        .trim()
        .notEmpty()
        .withMessage('Location is required')
        .isLength({ max: 200 })
        .withMessage('Location must be less than 200 characters'),

    body('date')
        .notEmpty()
        .withMessage('Date is required')
        .isISO8601()
        .withMessage('Please provide a valid date'),

    body('organizationId')
        .notEmpty()
        .withMessage('Organization is required')
        .isInt()
        .withMessage('Organization must be valid')
];

const getProjects = async (req, res, next) => {
    try {
        const projects = await getAllProjects();

        res.render('projects', {
            title: 'Service Projects',
            projects
        });
    } catch (error) {
        next(error);
    }
};

const getProject = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const project = await getProjectDetails(projectId);


        if (!project) {
            req.flash('error', 'Project not found');
            return res.redirect('/projects');
        }

        res.render('project', {
            title: project.title,
            project
        });
    } catch (error) {
        next(error);
    }
};

const showNewProjectForm = async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();

        res.render('new-project', {
            title: 'Add New Service Project',
            organizations
        });
    } catch (error) {
        next(error);
    }
};

const processNewProjectForm = async (req, res, next) => {
    try {
        const results = validationResult(req);

        if (!results.isEmpty()) {
            results.array().forEach((error) => {
                req.flash('error', error.msg);
            });

            return res.redirect('/new-project');
        }

        const {
            organizationId,
            title,
            description,
            location,
            date
        } = req.body;

        await createProject(
            title,
            description,
            location,
            date,
            organizationId
        );

        req.flash('success', 'Service project added successfully!');

        res.redirect('/projects');
    } catch (error) {
        next(error);
    }
};

const showEditProjectForm = async (req, res, next) => {
    try {
        const projectId = req.params.id;

        const project = await getProjectDetails(projectId);
        const organizations = await getAllOrganizations();

        if (!project) {
            req.flash('error', 'Project not found');
            return res.redirect('/projects');
        }

        res.render('edit-project', {
            title: 'Edit Service Project',
            project,
            organizations
        });
    } catch (error) {
        next(error);
    }
};

const processEditProjectForm = async (req, res, next) => {
    try {
        const projectId = req.params.id;

        const results = validationResult(req);

        if (!results.isEmpty()) {
            results.array().forEach((error) => {
                req.flash('error', error.msg);
            });

            return res.redirect(`/edit-project/${projectId}`);
        }

        const {
            organizationId,
            title,
            description,
            location,
            date
        } = req.body;

        await updateProject(
            projectId,
            title,
            description,
            location,
            date,
            organizationId
        );

        req.flash('success', 'Service project updated successfully!');

        res.redirect(`/projects/${projectId}`);
    } catch (error) {
        next(error);
    }
};

export {
    getProjects,
    getProject,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    projectValidation
};