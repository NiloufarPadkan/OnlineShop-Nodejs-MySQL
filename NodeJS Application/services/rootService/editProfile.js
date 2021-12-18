const Admin = require("../../models/Admin");
const Role = require("../../models/Role");
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

        const saltHash = genPassword(req.body.password);

        const foundRole = await Role.findByPk(req.body.roleId);
        if (!foundRole) {
            return "roleNotfound";
        }

        const upadmin = await Admin.findByPk(adminId).then((admin) => {
            admin.roleId = req.body.roleId ? req.body.roleId : admin.roleId;

            admin.activityStatus = req.body.activityStatus
                ? req.body.activityStatus
                : foundAdmin.activityStatus;

            admin.username = req.body.username ? req.body.username : admin.username;

            admin.email = req.body.email ? req.body.email : admin.email;

            admin.phone = req.body.phone ? req.body.phone : admin.email;

            admin.hash = saltHash.hash;
            admin.salt = saltHash.salt;

            return admin.save();
        });
        let { salt, hash, ...savedAdmin } = upadmin.toJSON();

        return savedAdmin;
    } catch (e) {
        console.log(e);
        return "";
    }
};
