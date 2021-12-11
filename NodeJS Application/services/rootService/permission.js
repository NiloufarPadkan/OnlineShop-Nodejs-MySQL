const Permission = require("../../models/Permission");

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
        return "";
    }
};
exports.getPermissions = async (req, res, next) => {
    try {
        const limit = req.params.size ? req.params.size : 3;
        const offset = req.params.page ? req.params.page * limit : 0;

        const permissions = await Permission.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        return permissions;
    } catch (e) {
        console.log(e);
        return "";
    }
};
