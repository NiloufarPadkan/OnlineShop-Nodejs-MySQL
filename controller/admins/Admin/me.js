const Response = require("../../../services/responses/general");

exports.me = async (req, res, next) => {
    let response = new Response();

    try {
        const admin = res.locals.Admin;
        response.setStatus(200).setRes(admin);
        return res.status(200).send(response.handler());
    } catch (e) {
        return res.status(500).send(e);
    }
};
