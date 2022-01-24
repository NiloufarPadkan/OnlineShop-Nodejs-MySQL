const rolePermissionService = require("../../services/role-permission/role-permission");
const Response = require("../../../services/responses/general");
const Can = require("../../../services/can/can").can;

exports.store = async (req, res, next) => {
    let response = new Response();
    let permissionResult = false;
    if (req.admin) permissionResult = await Can(req.admin.roleId, "assign permission");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const assignPermissionResponse = await rolePermissionService.AssignPermission(
            req
        );

        if (assignPermissionResponse === "alreadyExists") {
            response.setStatus(400).setMessage("fail").setRes("alreadyExists");
            return res.status(400).send(response.handler());
        }
        let response = new Response(200, "success", assignPermissionResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
exports.readRolePermission = async (req, res, next) => {
    let response = new Response();
    let permissionResult = false;
    if (req.admin) permissionResult = await Can(req.admin.roleId, "read role-permission");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const RolePermissionList = await rolePermissionService.AssignedPermission(req);
        let response = new Response(200, "success", RolePermissionList);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
