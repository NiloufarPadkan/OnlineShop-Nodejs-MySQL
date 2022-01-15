const commentService = require("../../services/Product/commentReport");
const Response = require("../../../services/responses/general");
const Can = require("../../../services/can/can");

exports.canAdmin = async (roleId, permissionTitle) => {
    const can = await Can.can(roleId, permissionTitle);
    if (!can) {
        return false;
    }
    return true;
};

exports.index = async (req, res, next) => {
    let response = new Response();

    try {
        let permissionResult = false;
        if (req.admin)
            permissionResult = await this.canAdmin(req.admin.roleId, "read report");
        if (!permissionResult) {
            response.setStatus(403).setMessage("fail").setRes("notAllowed");
            return res.status(403).send(response.handler());
        }
        const reportIndexResponse = await commentService.readReports(req);

        response.setStatus(200).setRes(reportIndexResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};

exports.show = async (req, res, next) => {
    let response = new Response();
    let permissionResult = false;
    if (req.admin)
        permissionResult = await this.canAdmin(req.admin.roleId, "read report");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const countsReponse = await commentService.showReport(req);

        response.setStatus(200).setRes(countsReponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};

exports.showUnreadReportCount = async (req, res, next) => {
    let response = new Response();
    let permissionResult = false;
    if (req.admin)
        permissionResult = await this.canAdmin(req.admin.roleId, "read report");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const showReportResponse = await commentService.unreadReports(req);

        response.setStatus(200).setRes(showReportResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
