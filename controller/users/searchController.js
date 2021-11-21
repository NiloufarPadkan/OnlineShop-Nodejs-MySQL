const userProductService = require("../../services/productService/userService");
const Response = require("../../services/responses/general");

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
