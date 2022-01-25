const categoryService = require("../../services/Product/categoryService");
const Response = require("../../../services/responses/general");
const dict = require("../../../resources/dict");
const Can = require("../../../services/can/can").can;

exports.store = async (req, res, next) => {
    let response = new Response();
    let permissionResult = false;
    if (req.admin) permissionResult = await Can(req.admin.roleId, "add category");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const storedCategoryResponse = await categoryService.insertCategory(req);
        if (
            storedCategoryResponse === "alreadyExists" ||
            storedCategoryResponse === "parentNotFound"
        ) {
            response.setStatus(400).setMessage("fail").setRes(storedCategoryResponse);
            return res.status(400).send(response.handler());
        }

        response.setStatus(200).setRes(storedCategoryResponse);
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
    if (req.admin) permissionResult = await Can(req.admin.roleId, "update category");
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

        response.setStatus(200).setRes(updatedcategoryResponse);
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
    if (req.admin) permissionResult = await Can(req.admin.roleId, "delete category");
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
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};

exports.index = async (req, res, next) => {
    let response = new Response();

    try {
        const catgeoryIndexResponse = await categoryService.getcategory(req);

        response.setStatus(200).setRes(catgeoryIndexResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
