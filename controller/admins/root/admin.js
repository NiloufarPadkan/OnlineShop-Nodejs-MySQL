const adminService = require("../../../services/rootService/admin");
const AdminRes = require("../../../services/responses/AdminCreated");
const dict = require("../../../resources/dict");
const Can = require("../../../services/can/can");

exports.canAdmin = async (roleId, permissionTitle) => {
    const can = await Can.can(roleId, permissionTitle);
    if (!can) {
        return false;
    }
    return true;
};

exports.store = async (req, res, next) => {
    let response = new AdminRes();

    try {
        const storedAdminResponse = await adminService.insertAdmin(req);

        if (storedAdminResponse != "") {
            response.setStatus(200).setRes(storedAdminResponse);
            return res.status(200).send(response.handler());
        }

        response.setStatus(404).setMessage("fail").setRes("failed");
        return res.status(404).send(response.handler());
    } catch (e) {
        return res.status(500).send(e);
    }
};

exports.update = async (req, res, next) => {
    let response = new AdminRes();
    const permissionResult = await this.canAdmin(req.admin.roleId, "update admin");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const updatedAdminResponse = await adminService.updateAdmin(req);
        if (updatedAdminResponse === "adminNotFound") {
            response.setStatus(403).setMessage("fail").setRes("adminNotFound");
            return res.status(404).send(response.handler());
        }

        if (updatedAdminResponse === "roleNotfound") {
            response.setStatus(404).setMessage("fail").setRes("roleNotFound");
            return res.status(404).send(response.handler());
        }
        if (
            updatedAdminResponse === "duplicateUsername" ||
            updatedAdminResponse === "duplicateEmail" ||
            updatedAdminResponse === "duplicatePhone"
        ) {
            response.setStatus(404).setMessage("fail").setRes(updatedAdminResponse);
            return res.status(404).send(response.handler());
        }

        if (updatedAdminResponse != "") {
            response.setStatus(200).setRes(updatedAdminResponse);
            return res.status(200).send(response.handler());
        }
    } catch (e) {
        response.setStatus(400).setMessage("fail").setRes(e);
        return res.status(400).send(response.handler());
    }
};
exports.destroy = async (req, res, next) => {
    let response = new AdminRes();
    const permissionResult = await this.canAdmin(req.admin.roleId, "delete admin");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const destroyAdminResult = await adminService.destroyAdmin(req);
        if (destroyAdminResult === true) {
            response.setStatus(200).setRes(dict.successfulRemove);
            return res.status(200).send(response.handler());
        } else {
            response.setStatus(403).setMessage("fail").setRes("adminNotFound");
            res.status(404).send(response.handler());
        }
    } catch (e) {
        response.setStatus(400).setMessage("fail").setRes(e);
        return res.status(400).send(response.handler());
    }
};

exports.index = async (req, res, next) => {
    let response = new AdminRes();
    const permissionResult = await this.canAdmin(req.admin.roleId, "read admin");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const adminIndexResponse = await adminService.indexAdmins(req);
        if (adminIndexResponse != "") response.setStatus(200).setRes(adminIndexResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        response.setStatus(400).setMessage("fail").setRes(e);
        return res.status(400).send(response.handler());
    }
};
