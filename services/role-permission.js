const RolePermission = require("../models/role-permission");

exports.AssignPermission = async (req, res, next) => {
    try {
        const permissionId = req.body.permissionId;
        const roleId = req.body.roleId;
        const duplicateRolePermission = await RolePermission.findOne({
            where: {
                roleId: roleId,
                permissionId: permissionId,
            },
        });
        if (duplicateRolePermission) {
            return "alreadyExists";
        }
        const newRolePermission = new RolePermission({
            roleId: roleId,
            permissionId: permissionId,
        });
        const savedRolePermission = await newRolePermission.save();
        return savedRolePermission;
    } catch (e) {
        return e;
    }
};
