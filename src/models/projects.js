import db from "./db.js";

const getAllProjects = async () => {
    const query = `
        SELECT 
            p.project_id,
            p.name,
            p.description,
            o.name AS organization_name
        FROM public.projects p
        JOIN public.organization o
        ON p.organization_id = o.organization_id
        ORDER BY p.name;
    `;

    const result = await db.query(query);

    return result.rows;
};

export { getAllProjects };