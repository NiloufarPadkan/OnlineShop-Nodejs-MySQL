const Admin = require("../../models/Admin");
const Role = require("../../models/Role");
const Role_Permission = require("../../models/role-permission");
const Permission = require("../../models/Permission");

exports.can = async (roleId, permissionTitle) => {
    try {
        const permissionArray = await Role_Permission.findAll({
            where: { roleId: roleId },
        });

        var result = [];
        var keys = Object.keys(permissionArray);
        keys.forEach(function (key) {
            result.push(permissionArray[key].permissionId);
        });
        const permission = await Permission.findOne({
            where: { title: permissionTitle },
        });

        if (result.includes(permission.id)) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
    }
};
