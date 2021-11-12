const Role = require("../models/Role");
exports.insertRole = async (req) => {
    try {
        const roleTitle = req.body.role;
        const duplicateRole = await Role.findOne({
            where: {
                role: roleTitle,
            },
        });
        if (duplicateRole) {
            return "alreadyExists";
        }
        const newRole = new Role({ role: roleTitle });
        const savedRole = await newRole.save();
        console.log(savedRole);
        return savedRole;
    } catch (e) {
        console.log(e);
        return "";
    }
};
exports.getRole = async (req) => {
    try {
        const limit = req.body.size ? req.body.size : 3;
        const offset = req.body.page ? req.body.page * limit : 0;
        const roles = await Role.findAll({
            limit: limit,
            offset: offset,
        });
        return roles;
    } catch (e) {
        console.log(e);
        return "";
    }
};
