const checkCartService = require("../../../services/cartService/admin/checkCart");
const Response = require("../../../services/response");

exports.show = async (req, res, next) => {
    let response = new Response();
    try {
        const checkCartResponse = await checkCartService.check(req);
        if (checkCartResponse !== "") {
            response.setStatus(200).setRes(checkCartResponse);
            return res.status(200).send(response.handler());
        }
    } catch (e) {
        return res.status(500).send(e);
    }
};
