const Admin = require("../../../models/Admin");
const Role = require("../../../models/Role");
const genPassword = require("../../../lib/passwordUtil").genPassword;

exports.editProfile = async (req) => {
    try {
        const adminId = req.admin.id;
        const foundAdmin = await Admin.findByPk(adminId);
        if (!foundAdmin) {
            return "adminNotFound";
        }

        const username = req.body.username ? req.body.username : foundAdmin.username;
        const email = req.body.email ? req.body.email : foundAdmin.email;
        const phone = req.body.phone ? req.body.phone : foundAdmin.phone;
        const roleId = req.body.roleId ? req.body.roleId : foundAdmin.roleId;

        const duplicateUsername = await Admin.findOne({
            where: {
                username: username,
            },
        });
        if (duplicateUsername && duplicateUsername.id !== foundAdmin.id) {
            return "duplicateUsername";
        }
        const duplicateEmail = await Admin.findOne({
            where: {
                email: email,
            },
        });
        if (duplicateEmail && duplicateEmail.id !== foundAdmin.id) {
            return "duplicateEmail";
        }
        const duplicatephone = await Admin.findOne({
            where: {
                phone: phone,
            },
        });
        if (duplicatephone && duplicatephone.id !== foundAdmin.id) {
            return "duplicatePhone";
        }
        let saltHash;
        if (req.body.password) saltHash = genPassword(req.body.password);

        const foundRole = await Role.findByPk(roleId);
        if (!foundRole) {
            return "roleNotfound";
        }

        const upadmin = await Admin.findByPk(adminId).then((admin) => {
            admin.roleId = roleId;

            admin.username = username;

            admin.email = email;

            admin.phone = phone;

            admin.hash = req.body.password ? saltHash.hash : admin.hash;

            admin.salt = req.body.password ? saltHash.salt : admin.salt;

            return admin.save();
        });
        let { salt, hash, ...savedAdmin } = upadmin.toJSON();

        return savedAdmin;
    } catch (e) {
        console.log(e);
        return "";
    }
};
