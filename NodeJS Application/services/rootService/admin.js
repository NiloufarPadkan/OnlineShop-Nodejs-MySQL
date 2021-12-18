const Admin = require("../../models/Admin");
const Role = require("../../models/Role");

const genPassword = require("../../lib/passwordUtil").genPassword;

exports.insertAdmin = async (req) => {
    try {
        const saltHash = genPassword(req.body.password);
        let newAdmin = new Admin({
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            activityStatus: req.body.activityStatus,
            hash: saltHash.hash,
            salt: saltHash.salt,
            roleId: req.body.roleId,
        });
        await newAdmin.save({});
        let { hash, salt, ...savedAdmin } = newAdmin.toJSON();
        return savedAdmin;
    } catch (e) {
        console.log(e);
        return "";
    }
};

exports.indexAdmins = async (req) => {
    try {
        const limit = req.params.size ? req.params.size : 3;
        const offset = req.params.page ? req.params.page * limit : 0;
        const admins = await Admin.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            attributes: { exclude: ["hash", "salt"] },
        });
        return admins;
    } catch (e) {
        console.log(e);
        return "";
    }
};

exports.updateAdmin = async (req) => {
    try {
        const adminId = req.params.id;
        const foundAdmin = await Admin.findByPk(adminId);
        if (!foundAdmin) {
            return "adminNotFound";
        }
        const role = (await foundAdmin.getRole()).role; /*get role of admin*/
        if (role === "root") return "rootCantBeEdited";
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
exports.destroyAdmin = async (req) => {
    const adminId = req.params.id;
    try {
        const admin = await Admin.destroy({
            where: {
                id: adminId,
            },
        });
        if (admin) return true;
        else return false;
    } catch (e) {
        return false;
    }
};
