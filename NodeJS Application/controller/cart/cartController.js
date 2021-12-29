const cartService = require("../../services/cartService/cart");
const Response = require("../../services/response");

exports.store = async (req, res, next) => {
    let response = new Response();
    try {
        const addToCartResponse = await cartService.add(req);

        if (addToCartResponse !== "") {
            response.setStatus(200).setRes(addToCartResponse);
            return res.status(200).send(response.handler());
        }
    } catch (e) {
        return res.status(500).send(e);
    }
};
exports.show = async (req, res, next) => {
    let response = new Response();
    try {
        const showCartResponse = await cartService.showCart(req);
        if (showCartResponse !== "") {
            response.setStatus(200).setRes(showCartResponse);
            return res.status(200).send(response.handler());
        }
    } catch (e) {
        return res.status(500).send(e);
    }
};
