import {
    getAllOrganizations,
    getOrganizationDetails,
    createOrganization,
    updateOrganization
} from '../models/organizations.js';

import {
    body,
    validationResult
} from 'express-validator';

const organizationValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Organization name is required')
        .isLength({ min: 3, max: 150 })
        .withMessage('Organization name must be between 3 and 150 characters'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Organization description is required')
        .isLength({ max: 500 })
        .withMessage('Organization description cannot exceed 500 characters'),

    body('contactEmail')
        .trim()
        .notEmpty()
        .withMessage('Contact email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail()
];

const getOrganizations = async (req, res) => {
    const title = 'Organizations';

    const organizations =
        await getAllOrganizations();

    res.render('organizations', {
        title,
        organizations
    });
};

const getOrganization = async (req, res) => {
    const organizationId = req.params.id;

    const organization =
        await getOrganizationDetails(organizationId);

    if (!organization) {
        return res
            .status(404)
            .send('Organization not found');
    }

    res.render('organization', {
        title: organization.name,
        organization
    });
};

const showNewOrganizationForm = async (req, res) => {
    res.render('new-organization', {
        title: 'Add New Organization'
    });
};

const processNewOrganizationForm = async (req, res) => {

    const results =
        validationResult(req);

    if (!results.isEmpty()) {

        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect(
            '/organizations/new'
        );
    }

    const {
        name,
        description,
        contactEmail
    } = req.body;

    const logoFilename =
        'placeholder-logo.png';

    const organizationId =
        await createOrganization(
            name,
            description,
            contactEmail,
            logoFilename
        );

    req.flash(
        'success',
        'Organization added successfully!'
    );

    res.redirect(
        `/organizations/${organizationId}`
    );
};

const showEditOrganizationForm = async (req, res) => {

    const organizationId =
        req.params.id;

    const organization =
        await getOrganizationDetails(
            organizationId
        );

    if (!organization) {

        req.flash(
            'error',
            'Organization not found'
        );

        return res.redirect(
            '/organizations'
        );
    }

    res.render(
        'edit-organization',
        {
            title: 'Edit Organization',
            organization
        }
    );
};

const processEditOrganizationForm = async (req, res) => {

    const organizationId =
        req.params.id;

    const results =
        validationResult(req);

    if (!results.isEmpty()) {

        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect(
            `/edit-organization/${organizationId}`
        );
    }

    const {
        name,
        description,
        contactEmail,
        logoFilename
    } = req.body;

    await updateOrganization(
        organizationId,
        name,
        description,
        contactEmail,
        logoFilename
    );

    req.flash(
        'success',
        'Organization updated successfully!'
    );

    res.redirect(
        `/organizations/${organizationId}`
    );
};

export {
    getOrganizations,
    getOrganization,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm
};