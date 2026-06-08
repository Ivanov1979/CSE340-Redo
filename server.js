import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import session from "express-session";

import flash from "./src/middleware/flash.js";
import routes from "./src/routes.js";

// Load environment variables
dotenv.config();

const app = express();

// Fix __dirname for ES Modules
const __filename =
    fileURLToPath(import.meta.url);

const __dirname =
    path.dirname(__filename);

// Environment Variables
const PORT =
    process.env.PORT || 3000;

const SESSION_SECRET =
    process.env.SESSION_SECRET;

/* =========================
   VIEW ENGINE
========================= */

app.set("view engine", "ejs");

/* =========================
   VIEWS DIRECTORY
========================= */

app.set(
    "views",
    path.join(
        __dirname,
        "src/views"
    )
);

/* =========================
   SESSION MIDDLEWARE
========================= */

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge:
                60 * 60 * 1000
        }
    })
);

/* =========================
   FLASH MIDDLEWARE
========================= */

app.use(flash);

/* =========================
   MAKE SESSION AVAILABLE
   TO ALL EJS VIEWS
========================= */

app.use((req, res, next) => {

    res.locals.session =
        req.session;

    next();

});

/* =========================
   BODY PARSING
========================= */

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

/* =========================
   STATIC FILES
========================= */

app.use(
    express.static(
        path.join(
            __dirname,
            "public"
        )
    )
);

/* =========================
   TEST SESSION ROUTE
========================= */

app.get(
    "/test-session",
    (req, res) => {

        if (!req.session.views) {

            req.session.views = 1;

        } else {

            req.session.views++;

        }

        res.send(
            `Session working. Views: ${req.session.views}`
        );

    }
);

/* =========================
   ROUTES
========================= */

app.use(routes);

/* =========================
   START SERVER
========================= */

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});