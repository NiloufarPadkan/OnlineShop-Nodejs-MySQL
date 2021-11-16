const sellerProductService = require("../../services/productService/sellerService");
const userProductService = require("../../services/productService/userService");

const Response = require("../../services/responses/general");

exports.store = async (req, res, next) => {
    let response = new Response();
    //to do : check permission

    try {
        const insertProductResponse = await sellerProductService.insertProduct(req);

        if (insertProductResponse != "") {
            response.setStatus(200).setRes(insertProductResponse);
            return res.status(200).send(response.handler());
        }

        response.setStatus(404).setMessage("fail").setRes("failed");
        return res.status(404).send(response.handler());
    } catch (e) {
        return res.status(500).send(e);
    }
};
