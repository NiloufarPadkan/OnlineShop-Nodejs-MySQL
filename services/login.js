const Admin = require("../models/Admin");
const dict = require("../resources/dict");
const validPassword = require("../lib/passwordUtil").validPassword;
const tokenGenerator = require("../lib//jwtUtil").genToken;
exports.loginAdmin = async (req) => {
    try {
        const admin = await Admin.findOne({
            where: {
                username: req.body.username,
            },
        });
        if (!admin) return "adminNotFound";

        const passwordValidation = validPassword(
            req.body.password,
            admin.hash,
            admin.salt
        );
        if (!passwordValidation) return "invalidPassword";
        const accessToken = tokenGenerator(admin.id);
        req.admin = admin;
        // console.log(req.admin);
        return accessToken;
    } catch (e) {
        return "";
    }
};
