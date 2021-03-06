const sellerProductService = require("../../services/Product/sellerService");
const Response = require("../../../services/responses/general");
const Can = require("../../../services/can/can").can;

exports.show = async (req, res, next) => {
    let response = new Response();
    let permissionResult = false;
    if (req.admin) permissionResult = await Can(req.admin.roleId, "read comment");
    if (!permissionResult) {
        response.setStatus(403).setMessage("fail").setRes("notAllowed");
        return res.status(403).send(response.handler());
    }
    try {
        const productCommentsResponse = await sellerProductService.getProductComments(
            req
        );
        response.setStatus(200).setRes(productCommentsResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
