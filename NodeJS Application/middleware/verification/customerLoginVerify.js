const jwt = require("jsonwebtoken");
const dict = require("../../resources/dict");
const Customer = require("../../models//Customer");
const Response = require("../../services/responses/general");

const verifyToken = async (req, res, next) => {
    let response = new Response();
    if (!req.headers.authorization) {
        response.setStatus(400).setMessage("fail").setRes(dict.enterToken);
        return res.status(400).send(response.handler());
    }
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, async (err, customer) => {
        if (err) {
            response.setStatus(400).setMessage("fail").setRes(dict.invalidToken);
            return res.status(400).send(response.handler());
        }
        const foundCustomer = await Customer.findOne({
            where: {
                id: customer.id,
                roleId: customer.roleId,
            },
        });
        if (foundCustomer)
            if (foundCustomer.activityStatus === false) {
                response
                    .setStatus(400)
                    .setMessage("fail")
                    .setRes("yourAcoountIsNotActive");
                return res.status(400).send(response.handler());
            }
        if (!foundCustomer) {
            response.setStatus(400).setMessage("fail").setRes(dict.invalidToken);
            return res.status(400).send(response.handler());
        }

        req.customer = foundCustomer;

        next();
    });
};

module.exports = {
    verifyToken,
};
