const cartService = require("../../services/cart/cart");
const Response = require("../../../services/response");

exports.store = async (req, res, next) => {
    //to do add to cart permissions to be checked
    let response = new Response();
    try {
        const addToCartResponse = await cartService.add(req);

        response.setStatus(200).setRes(addToCartResponse);
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
        const showCartResponse = await cartService.showCart(req);

        response.setStatus(200).setRes(showCartResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
