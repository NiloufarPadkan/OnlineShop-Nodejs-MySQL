const jwt = require("jsonwebtoken");
const dict = require("../../resources/dict");
const Admin = require("../../models/Admin");
const Response = require("../../services/responses/general");

const verifyToken = async (req, res, next) => {
    let response = new Response();
    console.log(req.headers["authorization"]);
    if (!req.headers.authorization) {
        response.setStatus(400).setMessage("fail").setRes(dict.enterToken);
        return res.status(400).send(response.handler());
    }
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, async (err, admin) => {
        if (err) {
            response.setStatus(400).setMessage("fail").setRes(dict.invalidToken);
            return res.status(400).send(response.handler());
        }
        const foundAdmin = await Admin.findByPk(admin.id);
        req.admin = foundAdmin;
        res.locals.Admin = foundAdmin;
        //  console.log(req.admin);

        next();
    });
};

module.exports = {
    verifyToken,
};
