const userProductService = require("../../services/product/userService");
const Response = require("../../../services/responses/general");

exports.show = async (req, res, next) => {
    let response = new Response();

    try {
        const productCommentsResponse = await userProductService.getProductComments(req);

        response.setStatus(200).setRes(productCommentsResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
