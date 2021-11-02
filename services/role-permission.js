const RolePermission = require("../models/role-permission");

exports.AssignPermission = async (req, res, next) => {
    try {
        const permissionId = req.body.permissionId;
        const roleId = req.body.roleId;

        const newRolePermission = new RolePermission({
            roleId: roleId,
            permissionId: permissionId,
        });
        try {
            const savedRolePermission = await newRolePermission.save();
            res.locals.permissionAssignResult = savedRolePermission;
            // return res.status(200).send(savedRolePermission);
            next();
            //next();
        } catch (e) {
            return res.status(500).send(e);
        }
    } catch (e) {
        return res.status(500).send(e);
    }
};
