const RolePermission = require("../../models/role-permission");

exports.AssignPermission = async (req, res, next) => {
    try {
        const roleId = req.body.roleId;
        await RolePermission.destroy({
            where: {
                roleId: roleId,
            },
        });
        let result = [];
        const permissionIds = req.body.permissionId;
        var keys = Object.keys(permissionIds);
        keys.forEach(function (key) {
            result.push({
                roleId: roleId,
                permissionId: permissionIds[key],
            });
        });
        const AssignPermissionResult = await RolePermission.bulkCreate(result);

        return AssignPermissionResult;
    } catch (e) {
        console.log(e);
        return "";
    }
};
