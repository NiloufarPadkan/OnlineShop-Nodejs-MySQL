const rolePermissionService = require("../../../services/rootService/role-permission");
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
    const permissionResult = await this.canAdmin(req.admin.roleId, "add permission");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const permissionResult = await this.canAdmin(
            req.admin.roleId,
            "assign permission"
        );
        if (!permissionResult) {
            response.setStatus(403).setMessage("fail").setRes("notAllowed");
            return res.status(403).send(response.handler());
        }
        const assignPermissionResponse = await rolePermissionService.AssignPermission(
            req
        );

        if (assignPermissionResponse === "alreadyExists") {
            response.setStatus(400).setMessage("fail").setRes("alreadyExists");
            return res.status(400).send(response.handler());
        } else if (assignPermissionResponse != "") {
            let response = new Response(200, "success", assignPermissionResponse);
            res.status(200).send(response.handler());
        } else {
            //if role or permission doesnt exsist
            response.setStatus(400).setMessage("fail").setRes("failed");
            res.status(400).send(response.handler());
        }
    } catch (e) {
        response.setStatus(400).setMessage("fail").setRes(e);
        return res.status(400).send(response.handler());
    }
};
