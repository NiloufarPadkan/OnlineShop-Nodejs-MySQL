const RolePermission = require("../../models/role-permission");
const Role = require("../../models/Role");
const Permission = require("../../models/Permission");
const rolePermission = require("../../models/role-permission");
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

        let assignedPermission = await rolePermission.findAll({
            raw: true,
            attributes: ["permissionId"],
            where: { roleId: roleId },
        });

        let result = [];
        Object.keys(assignedPermission).map((key) => [
            result.push(assignedPermission[key].permissionId),
        ]);

        permissionArray = await Permission.findAll({
            raw: true,
            attributes: ["title", "id"],
            order: [["id", "ASC"]],
        });
        Object.keys(permissionArray).map((key) => {
            if (result.includes(permissionArray[key].id)) {
                permissionArray[key].owns = true;
            } else {
                console.log("false");
                permissionArray[key].owns = false;
            }
        });
        // var keys = Object.keys(permissionArray);
        // keys.forEach(function (key) {
        //     if (result.includes(permissionArray[key].id)) {
        //         permissionArray[key].owns = true;
        //     } else {
        //         permissionArray[key].owns = false;
        //     }
        // });

        return permissionArray;
    } catch (e) {
        console.log(e);
    }
};
