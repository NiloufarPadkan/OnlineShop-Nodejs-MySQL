const orderService = require("../../services/order/order");
const Response = require("../../../services/response");

exports.show = async (req, res, next) => {
    let response = new Response();
    try {
        const showOrderResponse = await orderService.show(req);
        response.setStatus(200).setRes(showOrderResponse);
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
        const indexOrderResponse = await orderService.index(req);
        response.setStatus(200).setRes(indexOrderResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
exports.update = async (req, res, next) => {
    let response = new Response();
    try {
        const updateOrderResponse = await orderService.update(req);
        response.setStatus(200).setRes(updateOrderResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
