const permissionService = require("../../../services/rootService/permission");
const Response = require("../../../services/responses/general");
const Can = require("../../../services/can/can");

exports.canAdmin = async (roleId, permissionTitle) => {
    const can = await Can.can(roleId, permissionTitle);
    if (!can) {
        return false;
    }
    return true;
};

exports.store = async (req, res, next) => {
    let response = new Response();
    let permissionResult = false;
    if (req.admin)
        permissionResult = await this.canAdmin(req.admin.roleId, "add permission");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const insertPermissionResponse = await permissionService.insertPermission(req);

        if (insertPermissionResponse === "alreadyExists") {
            response.setStatus(400).setMessage("fail").setRes("alreadyExists");
            return res.status(400).send(response.handler());
        } else {
            response.setStatus(200).setRes(insertPermissionResponse);
            res.status(200).send(response.handler());
        }
    } catch (e) {
        response.setStatus(400).setMessage("fail").setRes(e);
        return res.status(400).send(response.handler());
    }
};
exports.index = async (req, res, next) => {
    let response = new Response();
    let permissionResult = false;
    if (req.admin)
        permissionResult = await this.canAdmin(req.admin.roleId, "read permission");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const indexPermissionResponse = await permissionService.getPermissions(req);

        if (indexPermissionResponse === "") {
            response.setStatus(400).setMessage("fail").setRes("failed");
            res.status(400).send(response.handler());
        } else {
            response.setStatus(200).setRes(indexPermissionResponse);
            res.status(200).send(response.handler());
        }
    } catch (e) {
        response.setStatus(400).setMessage("fail").setRes(e);
        return res.status(400).send(response.handler());
    }
};
