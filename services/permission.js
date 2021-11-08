const Permission = require("../models/Permission");

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
