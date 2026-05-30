import db from "./db.js";

export async function getAllOrganizations() {
    const result = await db.query(`
        SELECT *
        FROM organization
        ORDER BY name
    `);

    return result.rows;
}

export async function insertOrganization(
    name,
    description,
    contactEmail,
    logo_filename
) {
    const result = await db.query(
        `
        INSERT INTO organization
        (
            name,
            description,
            contact_email,
            logo_filename
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [
            name,
            description,
            contactEmail,
            logo_filename
        ]
    );

    return result.rows[0];
}