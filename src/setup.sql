DROP TABLE IF EXISTS project_categories;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS organization;

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(100),
    logo_filename VARCHAR(255)
);

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    organization_id INT NOT NULL,
    FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
);

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE project_categories (
    project_id INT NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY (project_id, category_id),

    FOREIGN KEY (project_id)
        REFERENCES projects(project_id)
        ON DELETE CASCADE,

    FOREIGN KEY (category_id)
        REFERENCES categories(category_id)
        ON DELETE CASCADE
);

INSERT INTO organization
(name, description, contact_email, logo_filename)
VALUES
(
    'BrightFuture Builders',
    'Educational community organization.',
    'contact@brightfuture.org',
    'brightfuture.png'
),
(
    'UnityServe Volunteers',
    'Volunteer educational services.',
    'info@unityserve.org',
    'unityserve.png'
);

INSERT INTO projects
(name, description, organization_id)
VALUES
(
    'Digital Mathematics Support',
    'A project that helps students improve mathematics using digital tools.',
    1
),
(
    'Community Learning Workshops',
    'A service project offering learning workshops for the community.',
    2
);

INSERT INTO categories (name)
VALUES
('Environmental'),
('Educational'),
('Community Service'),
('Health and Wellness');

INSERT INTO project_categories
(project_id, category_id)
VALUES
(1, 2),
(1, 3),
(2, 2),
(2, 4);