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
        const foundCustomer = await Customer.findByPk(customer.id);
        console.log(foundCustomer);
        req.customer = foundCustomer;
        res.customer = foundCustomer;
        //  console.log(req.admin);

        next();
    });
};

module.exports = {
    verifyToken,
};
