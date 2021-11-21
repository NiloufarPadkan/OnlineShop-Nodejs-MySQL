const categoryService = require("../services/sellerService/categoryService");
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
    const permissionResult = await this.canAdmin(req.admin.roleId, "add category");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const storedCategoryResponse = await categoryService.insertCategory(req);
        if (storedCategoryResponse === "alreadyExists") {
            response.setStatus(400).setMessage("fail").setRes("alreadyExists");
            return res.status(400).send(response.handler());
        }
        if (storedCategoryResponse != "") {
            response.setStatus(200).setRes(storedCategoryResponse);
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
    const permissionResult = await this.canAdmin(req.admin.roleId, "update category");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const updatedcategoryResponse = await categoryService.updatecategory(req);
        if (updatedcategoryResponse === "categoryNotFound") {
            response.setStatus(403).setMessage("fail").setRes("categoryNotFound");
            return res.status(404).send(response.handler());
        }
        if (updatedcategoryResponse === "titleEmpty") {
            response.setStatus(403).setMessage("fail").setRes("titleEmpty");
            return res.status(404).send(response.handler());
        }
        if (updatedcategoryResponse != "") {
            response.setStatus(200).setRes(updatedcategoryResponse);
            return res.status(200).send(response.handler());
        }
    } catch (e) {
        response.setStatus(400).setMessage("fail").setRes(e);
        return res.status(400).send(response.handler());
    }
};
exports.destroy = async (req, res, next) => {
    let response = new Response();
    const permissionResult = await this.canAdmin(req.admin.roleId, "delete category");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const destroyCategoryResult = await categoryService.destroyCategory(req);
        if (destroyCategoryResult === true) {
            response.setStatus(200).setRes(dict.successfulRemove);
            return res.status(200).send(response.handler());
        } else {
            response.setStatus(403).setMessage("fail").setRes("categoryNotFound");
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
        const catgeoryIndexResponse = await categoryService.getcategory(req);
        if (catgeoryIndexResponse != "") {
            response.setStatus(200).setRes(catgeoryIndexResponse);
            return res.status(200).send(response.handler());
        }
        response.setStatus(400).setMessage("fail").setRes("no categories found");
        return res.status(400).send(response.handler());
    } catch (e) {
        response.setStatus(400).setMessage("fail").setRes(e);
        return res.status(400).send(response.handler());
    }
};
