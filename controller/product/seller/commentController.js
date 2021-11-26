const commentService = require("../../../services/productService/seller/comment");
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
            permissionResult = await this.canAdmin(req.admin.roleId, "read comment");
        if (!permissionResult) {
            response.setStatus(403).setMessage("fail").setRes("notAllowed");
            return res.status(403).send(response.handler());
        }
        const commentIndexResponse = await commentService.indexComments(req);
        if (commentIndexResponse != "") {
            response.setStatus(200).setRes(commentIndexResponse);
            return res.status(200).send(response.handler());
        }
    } catch (e) {
        response.setStatus(400).setMessage("fail").setRes(e);
        return res.status(400).send(response.handler());
    }
};

exports.show = async (req, res, next) => {
    let response = new Response();
    let permissionResult = false;
    if (req.admin)
        permissionResult = await this.canAdmin(req.admin.roleId, "read comment");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const showCommentResponse = await commentService.showComment(req);
        if (showCommentResponse != "") {
            response.setStatus(200).setRes(showCommentResponse);
            return res.status(200).send(response.handler());
        }
    } catch (e) {
        response.setStatus(400).setMessage("fail").setRes(e);
        return res.status(400).send(response.handler());
    }
};

exports.update = async (req, res, next) => {
    let response = new Response();
    let permissionResult = false;
    if (req.admin)
        permissionResult = await this.canAdmin(req.admin.roleId, "update comment");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const commentStatusResponse = await commentService.setCommentStatus(req);
        if (commentStatusResponse === "commentNotFound") {
            response.setStatus(403).setMessage("fail").setRes("commentNotFound");
            res.status(404).send(response.handler());
        }

        if (commentStatusResponse != "") {
            response.setStatus(200).setRes(commentStatusResponse);
            res.status(200).send(response.handler());
        }
    } catch (e) {
        return res.status(500).send(e);
    }
};

//add destroy
