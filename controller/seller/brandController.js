const brandService = require("../../services/sellerService/brandService");
const Response = require("../../services/responses/general");
const dict = require("../../resources/dict");
const Can = require("../../services/can/can");

exports.canAdmin = async (roleId, permissionTitle) => {
    const can = await Can.can(roleId, permissionTitle);
    if (!can) {
        return false;
    }
    return true;
};

exports.store = async (req, res, next) => {
    let response = new Response();
    //to do : check permission

    try {
        const storedBrandResponse = await brandService.insertBrand(req);
        if (storedBrandResponse == "alreadyExists") {
            response.setStatus(400).setRes("alreadyExists");
            return res.status(400).send(response.handler());
        }
        if (storedBrandResponse != "") {
            response.setStatus(200).setRes(storedBrandResponse);
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
    const permissionResult = await this.canAdmin(req.admin.roleId, "update brand");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const updatedbrandResponse = await brandService.updatebrand(req);
        if (updatedbrandResponse === "brandNotFound") {
            response.setStatus(403).setMessage("fail").setRes("brandNotFound");
            return res.status(404).send(response.handler());
        }
        if (updatedbrandResponse === "nameEmpty") {
            response.setStatus(403).setMessage("fail").setRes("nameEmpty");
            return res.status(404).send(response.handler());
        }
        if (updatedbrandResponse != "") {
            response.setStatus(200).setRes(updatedbrandResponse);
            return res.status(200).send(response.handler());
        }
    } catch (e) {
        response.setStatus(400).setMessage("fail").setRes(e);
        return res.status(400).send(response.handler());
    }
};
exports.destroy = async (req, res, next) => {
    let response = new Response();
    const permissionResult = await this.canAdmin(req.admin.roleId, "delete brand");
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
        response.setStatus(400).setMessage("fail").setRes(e);
        return res.status(400).send(response.handler());
    }
};

exports.index = async (req, res, next) => {
    let response = new Response();

    try {
        const brandIndexResponse = await brandService.getbrand(req);
        if (brandIndexResponse != "") response.setStatus(200).setRes(brandIndexResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        response.setStatus(400).setMessage("fail").setRes(e);
        return res.status(400).send(response.handler());
    }
};
