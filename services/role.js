const Role = require("../models/Role");

exports.insertRole = async (req, res, next) => {
    try {
        const roleTitle = req.body.role;
        const newRole = new Role({ role: roleTitle });
        try {
            const savedRole = await newRole.save();
            res.locals.savedRole = savedRole;
            next();
        } catch (e) {}
    } catch (e) {}
};
