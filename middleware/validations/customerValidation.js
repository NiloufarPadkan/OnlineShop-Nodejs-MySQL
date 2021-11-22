const persianize = require("persianize");

const dict = require("../../resources/dict");

const Response = require("../../services/responses/general");

const customerValidation = async (req, res, next) => {
    let response = new Response();
    try {
        if (!persianize.validator().mobile(req.body.phone)) {
            response.setStatus(500).setMessage("fail").setRes(dict.notPhoneNumber);
            return res.status(400).send(response.handler());
        }
        next();
    } catch (e) {
        return res.status(422).send({ error: e });
    }
};

module.exports = {
    customerValidation,
};
