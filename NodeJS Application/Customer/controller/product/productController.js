const userProductService = require("../../services/product/userService");
const Response = require("../../../services/responses/general");

exports.search = async (req, res, next) => {
    let response = new Response();

    try {
        const productSearchResponse = await userProductService.searchProducts(req);

        response.setStatus(200).setRes(productSearchResponse);
        return res.status(200).send(response.handler());
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
        const productIndexResponse = await userProductService.indexProducts(req);

        response.setStatus(200).setRes(productIndexResponse);
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

    try {
        const productshowResponse = await userProductService.getOneProduct(req);
        response.setStatus(200).setRes(productshowResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
