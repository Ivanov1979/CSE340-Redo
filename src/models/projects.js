import db from "./db.js";

// ======================================
// GET ALL PROJECTS
// ======================================

const getAllProjects = async () => {
    const query = `
        SELECT
            p.project_id,
            p.name AS title,
            p.description,
            p.date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM projects p
        JOIN organization o
            ON p.organization_id = o.organization_id
        ORDER BY p.date;
    `;

    const result = await db.query(query);

    return result.rows;
};

// ======================================
// GET UPCOMING PROJECTS
// ======================================

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT
            p.project_id,
            p.name AS title,
            p.description,
            p.date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM projects p
        JOIN organization o
            ON p.organization_id = o.organization_id
        WHERE p.date >= CURRENT_DATE
        ORDER BY p.date ASC
        LIMIT $1;
    `;

    const queryParams = [number_of_projects];

    const result = await db.query(query, queryParams);

    return result.rows;
};

// ======================================
// GET PROJECT DETAILS
// ======================================

const getProjectDetails = async (id) => {
    const query = `
        SELECT
            p.project_id,
            p.name AS title,
            p.description,
            p.date,
            p.location,
            p.organization_id,
            o.name AS organization_name
        FROM projects p
        JOIN organization o
            ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;

    const queryParams = [id];

    const result = await db.query(query, queryParams);

    return result.rows.length > 0 ? result.rows[0] : null;
};

// ======================================
// GET PROJECTS BY ORGANIZATION ID
// ======================================

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
            project_id,
            name AS title,
            description,
            date,
            location,
            organization_id
        FROM projects
        WHERE organization_id = $1
        ORDER BY date;
    `;

    const queryParams = [organizationId];

    const result = await db.query(query, queryParams);

    return result.rows;
};

// ======================================
// EXPORT MODEL FUNCTIONS
// ======================================

export {
    getAllProjects,
    getUpcomingProjects,
    getProjectDetails,
    getProjectsByOrganizationId
};