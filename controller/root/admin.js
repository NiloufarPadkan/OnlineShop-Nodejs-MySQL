const adminService = require("../../services/admin");
const AdminRes = require("../../services/responses/AdminCreated");
const dict = require("../../resources/dict");
const Can = require("../../services/can/can");

exports.store = async (req, res, next) => {
    try {
        const storedAdminResponse = await adminService.insertAdmin(req);
        if (storedAdminResponse != "") {
            let response = new AdminRes(200, "success", storedAdminResponse);
            return res.status(200).send(response.handler());
        }
        let response = new AdminRes(404, "fail", "failed");
        return res.status(404).send(response.handler());
    } catch (e) {
        return res.status(500).send(e);
    }
};

exports.update = async (req, res, next) => {
    try {
        const can = await Can.can(req.admin.roleId, "update admin");
        if (!can) {
            let response = new AdminRes(403, "fail", "notAllowed");
            return res.status(403).send(response.handler());
        }

        const updatedAdminResponse = await adminService.updateAdmin(req);
        if (updatedAdminResponse === "adminNotFound") {
            let response = new AdminRes(404, "fail", "adminNotFound");
            res.status(404).send(response.handler());
        }
        if (updatedAdminResponse === "roleNotfound") {
            let response = new AdminRes(404, "fail", "roleNotfound");
            res.status(404).send(response.handler());
        }
        let response = new AdminRes(200, "success", updatedAdminResponse);
        if (updatedAdminResponse != "")
            if (updatedAdminResponse != "")
                res.status(200).send(response.handler());
    } catch (e) {
        console.log(e);
    }
};
exports.destroy = async (req, res, next) => {
    try {
        const can = await Can.can(req.admin.roleId, "delete admin");
        if (!can) {
            let response = new AdminRes(403, "fail", "notAllowed");
            return res.status(403).send(response.handler());
        }

        const destroyAdminResult = await adminService.destroyAdmin(req);
        if (destroyAdminResult === true) {
            let response = new AdminRes(200, "success", dict.successfulRemove);

            return res.status(200).send(response.handler());
        } else {
            let response = new AdminRes(404, "fail", "adminNotFound");
            return res.status(400).send(response.handler());
        }
    } catch (e) {
        let response = new AdminRes(404, "fail", e);
        return res.status(400).send(response.handler());
    }
};
exports.index = async (req, res, next) => {
    try {
        const can = await Can.can(req.admin.roleId, "read admin");
        if (!can) {
            let response = new AdminRes(403, "fail", "notAllowed");
            return res.status(403).send(response.handler());
        }

        const adminIndexResponse = await adminService.indexAdmins();
        let response = new AdminRes(200, "success", adminIndexResponse);

        return res.status(200).send(response.handler());
    } catch (e) {
        let response = new AdminRes(404, "fail", e);
        return res.status(400).send(response.handler());
    }
};
