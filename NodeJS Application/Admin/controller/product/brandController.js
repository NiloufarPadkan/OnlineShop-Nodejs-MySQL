const brandService = require("../../services/Product/brandService");
const Response = require("../../../services/responses/general");
const dict = require("../../../resources/dict");
const Can = require("../../../services/can/can").can;

exports.store = async (req, res, next) => {
    let response = new Response();
    let permissionResult = false;
    if (req.admin) permissionResult = await Can(req.admin.roleId, "add brand");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const storedBrandResponse = await brandService.insertBrand(req);
        if (storedBrandResponse == "alreadyExists") {
            response.setStatus(400).setRes("alreadyExists");
            return res.status(400).send(response.handler());
        }

        response.setStatus(200).setMessage("fail").setRes(storedBrandResponse);
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
    if (req.admin) permissionResult = await Can(req.admin.roleId, "update brand");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const updatedbrandResponse = await brandService.updatebrand(req);

        if (
            updatedbrandResponse === "nameEmpty" ||
            updatedbrandResponse === "brandNotFound"
        ) {
            response.setStatus(403).setMessage("fail").setRes(updatedbrandResponse);
            return res.status(404).send(response.handler());
        }

        response.setStatus(200).setRes(updatedbrandResponse);
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
    if (req.admin) permissionResult = await Can(req.admin.roleId, "delete brand");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const destroyBrandResult = await brandService.destroyBrand(req);
        if (destroyBrandResult === true) {
            response.setStatus(200).setRes(dict.successfulRemove);
            return res.status(200).send(response.handler());
        } else {
            response.setStatus(403).setMessage("fail").setRes("brandNotFound");
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
    let response = new Response();

    try {
        const brandIndexResponse = await brandService.getbrand(req);
        response.setStatus(200).setRes(brandIndexResponse);
        return res.status(200).send(response.handler());
        //}
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
