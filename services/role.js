const Role = require("../models/Role");
exports.insertRole = async (req, res, next) => {
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
        return savedRole;
    } catch (e) {
        console.log(e);
    }
};
