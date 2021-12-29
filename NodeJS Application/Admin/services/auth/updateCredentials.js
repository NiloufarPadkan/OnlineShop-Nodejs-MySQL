const Admin = require("../../../models/Admin");
const genPassword = require("../../../lib/passwordUtil").genPassword;
const validator = require("validator");

exports.updateCredential = async (req) => {
    try {
        const adminId = req.body.adminId;
        const foundAdmin = await Admin.findByPk(adminId);
        if (!foundAdmin) {
            return "adminNotFound";
        }

        const username = req.body.username ? req.body.username : foundAdmin.username;
        if (req.body.password) {
            if (!validator.isStrongPassword(req.body.password)) {
                return "weakPass";
            }
        }
        const hash = req.body.password
            ? genPassword(req.body.password).hash
            : foundAdmin.hash;
        const salt = req.body.password
            ? genPassword(req.body.password).salt
            : foundAdmin.salt;

        const upadmin = await Admin.findByPk(adminId).then((admin) => {
            admin.username = username;
            admin.hash = hash;
            admin.salt = salt;
            return admin.save();
        });
        return upadmin;
    } catch (e) {
        return "";
    }
};
