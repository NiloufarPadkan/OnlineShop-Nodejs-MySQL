const orderService = require("../../services/order/order");
const Response = require("../../../services/response");

exports.cancel = async (req, res, next) => {
    let response = new Response();
    try {
        const cancelResponse = await orderService.cancel(req);

        response.setStatus(200).setRes(cancelResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
