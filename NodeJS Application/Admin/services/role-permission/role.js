const Role = require("../../../models/Role");
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
        throw new Error(e);
    }
};
exports.getRole = async (req) => {
    try {
        const limit = req.query.size ? req.query.size : 3;
        const offset = req.query.page ? req.query.page * limit : 0;
        const roles = await Role.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
        });
        return roles;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};
exports.setStatus = async (req) => {
    try {
        const role = await Role.findByPk(req.params.id)
            .then((role) => {
                if (role === "root") return "rootCantBeEdited";

                role.status = req.body.status;
                return role.save();
            })
            .catch((e) => {
                return "roleNotFound";
            });
        return role;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};
