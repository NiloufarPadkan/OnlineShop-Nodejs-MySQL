const userProductService = require("../../../services/productService/userService");
const Response = require("../../../services/responses/general");

exports.search = async (req, res, next) => {
    let response = new Response();

    try {
        const productSearchResponse = await userProductService.searchProducts(req);
        if (productSearchResponse != "")
            response.setStatus(200).setRes(productSearchResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        response.setStatus(400).setMessage("fail").setRes(e);
        return res.status(400).send(response.handler());
    }
};

exports.index = async (req, res, next) => {
    let response = new Response();

    try {
        const productIndexResponse = await userProductService.indexProducts(req);
        if (productIndexResponse != "")
            response.setStatus(200).setRes(productIndexResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        response.setStatus(400).setMessage("fail").setRes(e);
        return res.status(400).send(response.handler());
    }
};

exports.show = async (req, res, next) => {
    let response = new Response();

    try {
        const productshowResponse = await userProductService.getOneProduct(req);
        if (productshowResponse != "")
            response.setStatus(200).setRes(productshowResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        response.setStatus(400).setMessage("fail").setRes(e);
        return res.status(400).send(response.handler());
    }
};
