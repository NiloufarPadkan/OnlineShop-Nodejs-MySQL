const orderService = require("../../services/order/order");
const Response = require("../../../services/response");

exports.addPayment = async (req, res, next) => {
    let response = new Response();
    try {
        const AddPaymentIdResponse = await orderService.AddPaymentId(req);
        if (
            AddPaymentIdResponse === "paymentIdExists" ||
            AddPaymentIdResponse === "orderNotFound" ||
            AddPaymentIdResponse === "invalidPaymentId"
        ) {
            response.setStatus(400).setMessage("fail").setRes(AddPaymentIdResponse);
            return res.status(400).send(response.handler());
        }
        response.setStatus(200).setRes(AddPaymentIdResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
