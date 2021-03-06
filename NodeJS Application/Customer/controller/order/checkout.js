const orderService = require("../../services/order/order");
const Response = require("../../../services/response");

exports.store = async (req, res, next) => {
    let response = new Response();
    try {
        const checkOutResponse = await orderService.store(req);

        if (
            checkOutResponse === "outofstockProducts" ||
            checkOutResponse === "CartNotFound"
        ) {
            response.setStatus(400).setMessage("fail").setRes(checkOutResponse);
            return res.status(400).send(response.handler());
        }
        response.setStatus(200).setRes(checkOutResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
exports.update = async (req, res, next) => {};
