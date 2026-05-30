import {
    getAllOrganizations,
    insertOrganization
} from "../models/organizationModel.js";

export async function getOrganizations(req, res) {
    const organizations = await getAllOrganizations();

    res.render("organizations", {
        title: "Organizations",
        organizations
    });
}

export function showNewOrganizationForm(req, res) {
    res.render("new-organization", {
        title: "Create New Organization"
    });
}

export async function createOrganization(req, res) {
    const { name, description, contactEmail } = req.body;

    const logo_filename = "placeholder-logo.png";

    await insertOrganization(
        name,
        description,
        contactEmail,
        logo_filename
    );

    res.redirect("/organizations");
}