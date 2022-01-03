const checkCartService = require("../../services/cart/checkCart");
const Response = require("../../../services/response");

exports.show = async (req, res, next) => {
    let response = new Response();
    try {
        const checkCartResponse = await checkCartService.check(req);

        response.setStatus(200).setRes(checkCartResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
