const Response = require("../../../services/responses/general");

exports.me = async (req, res, next) => {
    let response = new Response();

    try {
        const admin = res.locals.Admin;
        let { hash, salt, ...me } = admin.toJSON();
        response.setStatus(200).setRes(me);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
