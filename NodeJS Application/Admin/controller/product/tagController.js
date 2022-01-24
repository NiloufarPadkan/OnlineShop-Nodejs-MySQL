const tagService = require("../../services/Product/TagService");
const Response = require("../../../services/responses/general");
const dict = require("../../../resources/dict");
const Can = require("../../../services/can/can").can;

exports.store = async (req, res, next) => {
    let response = new Response();
    let permissionResult = false;
    if (req.admin) permissionResult = await Can(req.admin.roleId, "add tag");
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

        response.setStatus(200).setRes(storedTagResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};

exports.update = async (req, res, next) => {
    let response = new Response();
    let permissionResult = false;
    if (req.admin) permissionResult = await Can(req.admin.roleId, "update tag");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const updatedtagResponse = await tagService.updatetag(req);
        if (updatedtagResponse === "tagNotFound" || updatedtagResponse === "titleEmpty") {
            response.setStatus(403).setMessage("fail").setRes(updatedtagResponse);
            return res.status(404).send(response.handler());
        }

        response.setStatus(200).setRes(updatedtagResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
exports.destroy = async (req, res, next) => {
    let response = new Response();
    let permissionResult = false;
    if (req.admin) permissionResult = await Can(req.admin.roleId, "delete tag");
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
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};

exports.index = async (req, res, next) => {
    let response = new Response();
    try {
        const tagIndexResponse = await tagService.gettag(req);

        response.setStatus(200).setRes(tagIndexResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
