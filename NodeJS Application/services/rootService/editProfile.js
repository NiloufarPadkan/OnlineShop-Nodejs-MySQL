const Admin = require("../../models/Admin");

const genPassword = require("../../lib/passwordUtil").genPassword;

exports.editProfile = async (req) => {
    try {
        const adminId = req.admin.id;
        const foundAdmin = await Admin.findByPk(adminId);
        if (!foundAdmin) {
            return "adminNotFound";
        }

        const duplicateUsername = await Admin.findOne({
            where: {
                username: req.body.username,
            },
        });
        if (duplicateUsername && duplicateUsername.id !== foundAdmin.id) {
            return "duplicateUsername";
        }
        const duplicateEmail = await Admin.findOne({
            where: {
                email: req.body.email ? req.body.email : "",
            },
        });
        if (duplicateEmail && duplicateEmail.id !== foundAdmin.id) {
            return "duplicateEmail";
        }
        const duplicatephone = await Admin.findOne({
            where: {
                phone: req.body.phone ? req.body.phone : "",
            },
        });
        if (duplicatephone && duplicatephone.id !== foundAdmin.id) {
            return "duplicatePhone";
        }

        const username = req.body.username ? req.body.username : foundAdmin.username;

        const email = req.body.email ? req.body.email : foundAdmin.email;

        const phone = req.body.phone ? req.body.phone : foundAdmin.phone;

        const hash = req.body.password
            ? genPassword(req.body.password).hash
            : foundAdmin.hash;

        const salt = req.body.password
            ? genPassword(req.body.password).salt
            : foundAdmin.salt;

        const upadmin = await Admin.findByPk(adminId).then((admin) => {
            admin.username = username;

            admin.email = email;

            admin.phone = phone;

            admin.hash = hash;

            admin.salt = salt;

            return admin.save();
        });
        return upadmin;
    } catch (e) {
        console.log(e);
        return "";
    }
};
