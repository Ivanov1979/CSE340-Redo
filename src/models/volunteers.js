import db from "./db.js";

const addVolunteer = async (
    userId,
    projectId
) => {

    const query = `
        INSERT INTO volunteers (
            user_id,
            project_id
        )
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING;
    `;

    await db.query(query, [
        userId,
        projectId
    ]);

};

const removeVolunteer = async (
    userId,
    projectId
) => {

    const query = `
        DELETE FROM volunteers
        WHERE user_id = $1
        AND project_id = $2;
    `;

    await db.query(query, [
        userId,
        projectId
    ]);

};

const getVolunteerProjects = async (
    userId
) => {

    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.date,
            p.location
        FROM volunteers v
        JOIN projects p
            ON v.project_id = p.project_id
        WHERE v.user_id = $1
        ORDER BY p.date;
    `;

    const result = await db.query(
        query,
        [userId]
    );

    return result.rows;

};

const isVolunteer = async (
    userId,
    projectId
) => {

    const query = `
        SELECT *
        FROM volunteers
        WHERE user_id = $1
        AND project_id = $2;
    `;

    const result = await db.query(
        query,
        [
            userId,
            projectId
        ]
    );

    return result.rows.length > 0;

};

export {
    addVolunteer,
    removeVolunteer,
    getVolunteerProjects,
    isVolunteer
};