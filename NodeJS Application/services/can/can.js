const Role_Permission = require("../../models/role-permission");
const Permission = require("../../models/Permission");
const redis = require("redis");

const client = redis.createClient(process.env.REDIS_PORT || 6379);
const { promisifyAll } = require("bluebird");
const { response } = require("express");
promisifyAll(redis);

let result = [];
permissionArray = [];

async function cache(roleId) {
    const data = await client.getAsync("permissions");
    if (data !== null) permissionArray = JSON.parse(data);
    else {
        console.log("Fetching Data...");
        permissionArray = await Role_Permission.findAll({
            where: { roleId: roleId },
        });
        client.setex("permissions", 3600, JSON.stringify(permissionArray));
    }
}

exports.can = async (roleId, permissionTitle) => {
    try {
        await cache(roleId);
        result = [];
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
