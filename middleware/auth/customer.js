// const Customer = require("../../models/Customer");
const Response = require("../../services/responses/general");

const code = 2564;
//to do : add sms service and get code from that and check the code user enters with code that service generated
const auth = async (req, res, next) => {
    let response = new Response();
    if (req.body.code === code) {
        next();
    } else {
        response.setStatus(404).setMessage("fail").setRes("invalidcode");
        return res.status(400).send(response.handler());
    }
};

module.exports = {
    auth,
};

//valid verify
