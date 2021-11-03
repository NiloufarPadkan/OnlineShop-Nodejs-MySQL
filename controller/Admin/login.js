const Admin = require("../../models/Admin");

const dict = require("../../resources/dict");
exports.login = async (req, res, next) => {
    try {
        res.status(200).send(res.locals.accessToken);
    } catch (e) {
        return res.status(500).send(e);
    }
};
