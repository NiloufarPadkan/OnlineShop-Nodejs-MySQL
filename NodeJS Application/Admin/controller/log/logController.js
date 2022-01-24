const logService = require("../../services/log/indexLog");
const AdminRes = require("../../../services/responses/AdminCreated");
const Can = require("../../../services/can/can").can;
var path = require("path");

exports.index = async (req, res, next) => {
    let response = new AdminRes();
    let permissionResult = false;
    if (req.admin) permissionResult = await Can(req.admin.roleId, "read log");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const logIndexResponse = await logService.indexLog(req);
        //let x = JSON.parse(logIndexResponse);
        if (logIndexResponse != "") response.setStatus(200).setRes(logIndexResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
