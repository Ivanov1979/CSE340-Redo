DROP TABLE IF EXISTS project_categories;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS organization;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(100),
    logo_filename VARCHAR(255)
);

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    location VARCHAR(150) NOT NULL,
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

CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    role_description TEXT
);

INSERT INTO roles (
    role_name,
    role_description
)
VALUES
(
    'user',
    'Standard user with basic access'
),
(
    'admin',
    'Administrator with full system access'
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(100)
        NOT NULL
        UNIQUE,

    password_hash VARCHAR(255)
        NOT NULL,

    role_id INT,

    created_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (role_id)
        REFERENCES roles(role_id)
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
(title, description, date, location, organization_id)
VALUES
(
    'Digital Mathematics Support',
    'A project that helps students improve mathematics using digital tools.',
    '2026-06-15',
    'Alto Hospicio Community Center',
    1
),
(
    'Community Learning Workshops',
    'A service project offering learning workshops for the community.',
    '2026-07-10',
    'Iquique Public Library',
    2
),
(
    'STEM Tutoring Program',
    'A tutoring project focused on mathematics, science, and technology.',
    '2026-08-05',
    'Local School Innovation Lab',
    1
),
(
    'Health and Wellness Education Day',
    'A community event focused on wellness education and family support.',
    '2026-09-12',
    'Community Sports Center',
    2
),
(
    'Environmental Math Challenge',
    'Students use mathematics to analyze environmental data and propose solutions.',
    '2026-10-20',
    'Outdoor Learning Park',
    1
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
(2, 3),
(3, 2),
(4, 4),
(4, 3),
(5, 1),
(5, 2);