const tagService = require("../services/sellerService/TagService");
const Response = require("../services/responses/general");
const dict = require("../resources/dict");
const Can = require("../services/can/can");

exports.canAdmin = async (roleId, permissionTitle) => {
    const can = await Can.can(roleId, permissionTitle);
    if (!can) {
        return false;
    }
    return true;
};

exports.store = async (req, res, next) => {
    let response = new Response();
    const permissionResult = await this.canAdmin(req.admin.roleId, "add tag");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const storedTagResponse = await tagService.insertTag(req);
        if (storedTagResponse === "alreadyExists") {
            response.setStatus(400).setMessage("fail").setRes("alreadyExists");
            return res.status(400).send(response.handler());
        }
        if (storedTagResponse != "") {
            response.setStatus(200).setRes(storedTagResponse);
            return res.status(200).send(response.handler());
        }

        response.setStatus(404).setMessage("fail").setRes("failed");
        return res.status(404).send(response.handler());
    } catch (e) {
        return res.status(500).send(e);
    }
};

exports.update = async (req, res, next) => {
    let response = new Response();
    const permissionResult = await this.canAdmin(req.admin.roleId, "update tag");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const updatedtagResponse = await tagService.updatetag(req);
        if (updatedtagResponse === "tagNotFound") {
            response.setStatus(403).setMessage("fail").setRes("tagNotFound");
            return res.status(404).send(response.handler());
        }
        if (updatedtagResponse === "titleEmpty") {
            response.setStatus(403).setMessage("fail").setRes("titleEmpty");
            return res.status(404).send(response.handler());
        }
        if (updatedtagResponse != "") {
            response.setStatus(200).setRes(updatedtagResponse);
            return res.status(200).send(response.handler());
        }
    } catch (e) {
        response.setStatus(400).setMessage("fail").setRes(e);
        return res.status(400).send(response.handler());
    }
};
exports.destroy = async (req, res, next) => {
    let response = new Response();
    const permissionResult = await this.canAdmin(req.admin.roleId, "delete tag");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const destroyTagResult = await tagService.destroyTag(req);
        if (destroyTagResult === true) {
            response.setStatus(200).setRes(dict.successfulRemove);
            return res.status(200).send(response.handler());
        } else {
            response.setStatus(403).setMessage("fail").setRes("tagNotFound");
            return res.status(404).send(response.handler());
        }
    } catch (e) {
        response.setStatus(400).setMessage("fail").setRes(e);
        return res.status(400).send(response.handler());
    }
};

exports.index = async (req, res, next) => {
    let response = new Response();
    try {
        const tagIndexResponse = await tagService.gettag(req);
        if (tagIndexResponse != "") {
            response.setStatus(200).setRes(tagIndexResponse);
            return res.status(200).send(response.handler());
        }
        response.setStatus(400).setMessage("fail").setRes("no tags found");
        return res.status(400).send(response.handler());
    } catch (e) {
        response.setStatus(400).setMessage("fail").setRes(e);
        return res.status(400).send(response.handler());
    }
};
