const adminService = require("../../services/admin");
const AdminRes = require("../../services/responses/AdminCreated");
const dict = require("../../resources/dict");

exports.store = async (req, res, next) => {
    try {
        const storedAdmin = await adminService.insertAdmin(req);
        let response = new AdminRes(200, "success", storedAdmin);
        if (storedAdmin != "") res.status(200).send(response.handler());
        else res.status(500).send("admin registration failed");
    } catch (e) {
        return res.status(500).send(e);
    }
};

exports.update = async (req, res, next) => {
    try {
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
        const adminIndexResponse = await adminService.indexAdmins();
        let response = new AdminRes(200, "success", adminIndexResponse);

        return res.status(200).send(response.handler());
    } catch (e) {
        let response = new AdminRes(404, "fail", e);
        return res.status(400).send(response.handler());
    }
};
