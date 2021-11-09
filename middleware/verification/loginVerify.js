const jwt = require("jsonwebtoken");
const dict = require("../../resources/dict");
const Admin = require("../../models/Admin");
const verifyToken = async (req, res, next) => {
    if (!req.headers.token) {
        return res.status(500).send(dict.enterToken);
    }
    const token = req.headers.token.split(" ")[1];

    jwt.verify(token, process.env.JWT_KEY, async (err, admin) => {
        if (err) {
            console.log("invalid token");
            return res.status(403).json(dict.invalidToken);
        }
        const foundAdmin = await Admin.findByPk(admin.id);
        req.admin = foundAdmin;
        //  console.log(req.admin);

        next();
    });
};

module.exports = {
    verifyToken,
};
