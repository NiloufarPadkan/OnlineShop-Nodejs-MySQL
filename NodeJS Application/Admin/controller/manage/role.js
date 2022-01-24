const roleService = require("../../services/role-permission/role");
const Response = require("../../../services/responses/general");
const Can = require("../../../services/can/can").can;

exports.canAdmin = async (roleId, permissionTitle) => {
    const can = await Can.can(roleId, permissionTitle);

    if (!can) {
        return false;
    }
    return true;
};

exports.store = async (req, res, next) => {
    let response = new Response();

    try {
        let permissionResult = false;
        if (req.admin) permissionResult = await Can(req.admin.roleId, "add role");
        if (!permissionResult) {
            response.setStatus(403).setMessage("fail").setRes("notAllowed");
            return res.status(403).send(response.handler());
        }
        const insertRoleResponse = await roleService.insertRole(req);

        if (insertRoleResponse === "alreadyExists") {
            response.setStatus(400).setMessage("fail").setRes("alreadyExists");
            res.status(400).send(response.handler());
        }
        response.setStatus(200).setRes(insertRoleResponse);
        res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
exports.index = async (req, res, next) => {
    let response = new Response();
    let permissionResult = false;
    if (req.admin) permissionResult = await Can(req.admin.roleId, "read role");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const indexRoleResponse = await roleService.getRole(req);

        response.setStatus(200).setRes(indexRoleResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};

exports.update = async (req, res, next) => {
    let response = new Response();
    let permissionResult = false;
    if (req.admin) permissionResult = await Can(req.admin.roleId, "update role");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const updateRoleResponse = await roleService.setStatus(req);

        response.setStatus(200).setRes(updateRoleResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
