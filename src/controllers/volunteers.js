import {
    addVolunteer,
    removeVolunteer
} from "../models/volunteers.js";

const processAddVolunteer = async (
    req,
    res,
    next
) => {
    try {
        const userId = req.session.user.user_id;
        const projectId = req.params.id;

        await addVolunteer(
            userId,
            projectId
        );

        req.flash(
            "success",
            "You are now volunteering for this project."
        );

        res.redirect(`/projects/${projectId}`);
    } catch (error) {
        next(error);
    }
};

const processRemoveVolunteer = async (
    req,
    res,
    next
) => {
    try {
        const userId = req.session.user.user_id;
        const projectId = req.params.id;

        await removeVolunteer(
            userId,
            projectId
        );

        req.flash(
            "success",
            "You have been removed as a volunteer for this project."
        );

        if (req.query.from === "dashboard") {
            return res.redirect("/dashboard");
        }

        res.redirect(`/projects/${projectId}`);
    } catch (error) {
        next(error);
    }
};

export {
    processAddVolunteer,
    processRemoveVolunteer
};