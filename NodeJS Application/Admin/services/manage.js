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
        const limit = req.query.size ? req.query.size : 3;
        const offset = req.query.page ? req.query.page * limit : 0;
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

        let status = req.body.activityStatus
            ? +req.body.activityStatus
            : +foundAdmin.activityStatus;

        const upadmin = await Admin.findByPk(adminId).then((admin) => {
            admin.roleId = roleId;
            admin.activityStatus = status;
            // ? req.body.activityStatus
            // : +admin.activityStatus;
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
