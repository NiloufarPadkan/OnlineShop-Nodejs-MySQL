const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const dict = require("../resources/dict");
const validPassword = require("../lib/passwordUtil").validPassword;
const tokenGenerator = require("../lib//jwtUtil").genToken;
exports.loginAdmin = async (req, res, next) => {
    try {
        const admin = await Admin.findOne({
            where: {
                username: req.body.username,
            },
        });
        if (!admin) return res.status(500).send(dict.loginError);

        const passwordValidation = validPassword(
            req.body.password,
            admin.hash,
            admin.salt
        );
        if (!passwordValidation) return res.status(400).send(dict.loginError);
        const accessToken = tokenGenerator(admin.id);
        // req.admin = admin;
        // console.log(req.admin);
        res.locals.accessToken = accessToken;
        next();
    } catch (e) {
        return res.status(500).send(e);
    }
};
