const RolePermission = require("../../models/role-permission");
const Role = require("../../models/Role");
const Permission = require("../../models/Permission");
const rolePermission = require("../../models/role-permission");

const redis = require("redis");

const client = redis.createClient(process.env.REDIS_PORT || 6379);
const { promisifyAll } = require("bluebird");
const { response } = require("express");
promisifyAll(redis);

permissionArray = [];

async function cache(roleId) {
    const data = await client.getAsync("permissions");
    if (data !== null) {
        permissionArray = JSON.parse(data);
    } else {
        console.log("Fetching Data...");
        permissionArray = await Permission.findAll({
            attributes: ["title", "id"],
            order: [["id", "ASC"]],
            raw: true,
        });
        client.setex("permissions", 3600, JSON.stringify(permissionArray));
    }
}

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

        await cache(roleId);

        Object.keys(permissionArray).map((key) => {
            if (result.includes(permissionArray[key].id)) {
                permissionArray[key].owns = true;
            } else {
                permissionArray[key].owns = false;
            }
        });

        return permissionArray;
    } catch (e) {
        console.log(e);
    }
};
