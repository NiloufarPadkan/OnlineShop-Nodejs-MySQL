const Role = require("../../models/Role");

exports.store = async (req, res, next) => {
    try {
        const roleTitle = req.body.role;
        const newRole = new Role({ role: roleTitle });
        try {
            const savedRole = await newRole.save();
            res.status(200).send(savedRole);
        } catch (e) {}
    } catch (e) {}
};
