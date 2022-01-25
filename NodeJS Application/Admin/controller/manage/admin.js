const adminService = require("../../services/manage");
const AdminRes = require("../../../services/responses/AdminCreated");
const dict = require("../../../resources/dict");
const Can = require("../../../services/can/can").can;

exports.store = async (req, res, next) => {
    let response = new AdminRes();
    try {
        const storedAdminResponse = await adminService.insertAdmin(req);
        response.setStatus(200).setRes(storedAdminResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};

exports.update = async (req, res, next) => {
    let response = new AdminRes();
    let permissionResult = false;
    if (req.admin) permissionResult = await Can(req.admin.roleId, "update admin");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const updatedAdminResponse = await adminService.updateAdmin(req);

        if (
            updatedAdminResponse === "duplicateUsername" ||
            updatedAdminResponse === "duplicateEmail" ||
            updatedAdminResponse === "duplicatePhone" ||
            updatedAdminResponse === "adminNotFound" ||
            updatedAdminResponse === "roleNotfound" ||
            updatedAdminResponse === "rootCantBeEdited"
        ) {
            response.setStatus(404).setMessage("fail").setRes(updatedAdminResponse);
            return res.status(404).send(response.handler());
        }

        response.setStatus(200).setRes(updatedAdminResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
exports.destroy = async (req, res, next) => {
    let response = new AdminRes();
    let permissionResult = false;
    if (req.admin) permissionResult = await Can(req.admin.roleId, "delete admin");

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
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};

exports.index = async (req, res, next) => {
    let response = new AdminRes();
    let permissionResult = false;
    if (req.admin) permissionResult = await Can(req.admin.roleId, "read admin");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const adminIndexResponse = await adminService.indexAdmins(req);
        if (adminIndexResponse != "") response.setStatus(200).setRes(adminIndexResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
