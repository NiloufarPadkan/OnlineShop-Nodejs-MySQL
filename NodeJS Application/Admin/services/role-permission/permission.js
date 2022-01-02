const Permission = require("../../../models/Permission");

exports.insertPermission = async (req, res, next) => {
    try {
        const permission = req.body.permission;
        const duplicatePermission = await Permission.findOne({
            where: {
                title: permission,
            },
        });
        if (duplicatePermission) {
            return "alreadyExists";
        }
        const newPermission = new Permission({
            title: permission,
        });

        const savedPermission = await newPermission.save();
        return savedPermission;
    } catch (e) {
        throw new Error("something failed");
    }
};
exports.getPermissions = async (req, res, next) => {
    try {
        const limit = req.query.size ? req.query.size : 3;
        const offset = req.query.page ? req.query.page * limit : 0;

        const permissions = await Permission.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
        });
        // permissions.active = 1;
        // permissions.save;
        return permissions;
    } catch (e) {
        console.log(e);
        throw new Error("something failed");
    }
};
