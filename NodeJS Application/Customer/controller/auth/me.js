const Response = require("../../../services/responses/general");

exports.me = async (req, res, next) => {
    let response = new Response();

    try {
        const customer = req.customer;
        response.setStatus(200).setRes(customer);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
