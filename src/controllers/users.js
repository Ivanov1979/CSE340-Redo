import bcrypt from "bcrypt";

import {
    createUser,
    authenticateUser,
    getAllUsers
} from "../models/users.js";

/* =========================
   REGISTRATION
========================= */

const showUserRegistrationForm = (req, res) => {
    res.render("register", {
        title: "User Registration"
    });
};

const processUserRegistrationForm = async (
    req,
    res,
    next
) => {
    try {

        const {
            name,
            email,
            password
        } = req.body;

        const saltRounds = 10;

        const passwordHash =
            await bcrypt.hash(
                password,
                saltRounds
            );

        await createUser(
            name,
            email,
            passwordHash
        );

        req.flash(
            "success",
            "User account created successfully."
        );

        res.redirect("/login");

    } catch (error) {

        next(error);

    }
};

/* =========================
   LOGIN
========================= */

const showLoginForm = (req, res) => {
    res.render("login", {
        title: "Login"
    });
};

const processLoginForm = async (
    req,
    res,
    next
) => {
    try {

        const {
            email,
            password
        } = req.body;

        const user =
            await authenticateUser(
                email,
                password
            );

        if (user) {

            req.session.user = user;

            req.flash(
                "success",
                "Login successful."
            );

            console.log(
                "Logged in user:",
                user
            );

            return res.redirect(
                "/dashboard"
            );
        }

        req.flash(
            "error",
            "Login failed. Please check your email and password."
        );

        res.redirect("/login");

    } catch (error) {

        next(error);

    }
};

/* =========================
   LOGOUT
========================= */

const processLogout = (
    req,
    res
) => {

    req.session.destroy(() => {

        res.redirect("/login");

    });

};

/* =========================
   AUTHENTICATION
========================= */

const requireLogin = (
    req,
    res,
    next
) => {

    if (!req.session.user) {

        req.flash(
            "error",
            "Please log in to continue."
        );

        return res.redirect(
            "/login"
        );
    }

    next();

};

/* =========================
   AUTHORIZATION
========================= */

const requireRole = (role) => {

    return (
        req,
        res,
        next
    ) => {

        if (
            !req.session.user ||
            req.session.user.role_name !== role
        ) {

            req.flash(
                "error",
                "You do not have permission to access that page."
            );

            return res.redirect(
                "/dashboard"
            );
        }

        next();

    };

};

/* =========================
   DASHBOARD
========================= */

const showDashboard = (
    req,
    res
) => {

    const {
        name,
        email
    } = req.session.user;

    res.render(
        "dashboard",
        {
            title: "Dashboard",
            name,
            email
        }
    );

};

/* =========================
   USERS PAGE
========================= */

const showUsersPage = async (
    req,
    res,
    next
) => {

    try {

        const users =
            await getAllUsers();

        res.render(
            "users",
            {
                title:
                    "Registered Users",
                users
            }
        );

    } catch (error) {

        next(error);

    }

};

/* =========================
   EXPORTS
========================= */

export {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    requireRole,
    showDashboard,
    showUsersPage
};