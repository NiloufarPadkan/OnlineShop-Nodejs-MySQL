const Admin = require("../../models/Admin");
const Role = require("../../models/Role");
const Role_Permission = require("../../models/role-permission");
const Permission = require("../../models/Permission");

const can = async (req, res, next) => {
    const permissionArray = await Role_Permission.findAll({
        where: { roleId: req.admin.roleId },
    });
    var result = [];
    var keys = Object.keys(permissionArray);
    keys.forEach(function (key) {
        result.push(permissionArray[key].permissionId);
    });
    const permission = await Permission.findOne({
        where: { title: "add admin" },
    });

    if (result.includes(permission.id)) {
        console.log("yes");
        next();
    } else {
        res.status(500).send("you dont have permission");
    }
};
module.exports = {
    can,
};
