const RolePermission = require("../../models/role-permission");
const Role = require("../../models/Role");
const Permission = require("../../models/Permission");
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

exports.AssignedPermission = async (req, res, next) => {
    try {
        const roleId = req.params.id;
        console.log(roleId);
        permissionArray = await Role.findAll({
            where: { id: roleId },
            raw: true,
            nest: true,
            include: [{ model: Permission }],
        });
        var keys = Object.keys(permissionArray);
        var result = [];
        keys.forEach(function (key) {
            result.push(permissionArray[key].permissions.title);
        });
        return result;
    } catch (e) {
        console.log(e);
    }
};
