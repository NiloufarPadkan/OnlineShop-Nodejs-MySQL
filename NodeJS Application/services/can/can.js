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
    const data = await client.getAsync("role-permissions");
    if (data !== null) {
        permissionArray = JSON.parse(data);
    } else {
        console.log("Fetching Data...");
        permissionArray = await Role_Permission.findAll({
            raw: true,
        });
        client.setex("role-permissions", 3600, JSON.stringify(permissionArray));
    }
}

exports.can = async (roleId, permissionTitle) => {
    try {
        await cache(roleId);
        result = [];
        var keys = Object.keys(permissionArray);
        keys.forEach(function (key) {
            if (permissionArray[key].roleId === roleId)
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
        throw new Error(e);
    }
};
