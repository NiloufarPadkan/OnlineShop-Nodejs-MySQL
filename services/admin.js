const Admin = require("../models/Admin");
const Role = require("../models/Role");

const genPassword = require("../lib//passwordUtil").genPassword;

exports.insertAdmin = async (req) => {
    try {
        const saltHash = genPassword(req.body.password);
        const salt = saltHash.salt;
        const hash = saltHash.hash;
        const newAdmin = new Admin({
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            avtivityStatus: req.body.avtivityStatus,
            hash: hash,
            salt: salt,
            roleId: req.body.roleId,
        });
        const savedAdmin = await newAdmin.save();
        return savedAdmin;
    } catch (e) {
        return "";
    }
};

exports.indexAdmins = async () => {
    try {
        const admins = await Admin.findAll();
        return admins;
    } catch (e) {
        return "";
    }
};

exports.updateAdmin = async (req) => {
    try {
        const adminId = req.body.adminId;
        const foundAdmin = await Admin.findByPk(adminId);
        if (!foundAdmin) {
            return "adminNotFound";
        }
        const roleId = req.body.roleId ? req.body.roleId : foundAdmin.roleId;
        const activity = req.body.activity
            ? req.body.activity
            : foundAdmin.avtivityStatus;

        const foundRole = await Role.findByPk(roleId);
        if (!foundRole) {
            return "roleNotfound";
        }
        const upadmin = await Admin.findByPk(adminId).then((admin) => {
            admin.roleId = roleId;
            admin.avtivityStatus = activity;
            return admin.save();
        });
        //const adminrole = await upadmin.getRole(); /*get role of admin*/
        return upadmin;
    } catch (e) {
        return "";
    }
};
exports.destroyAdmin = async (req) => {
    const adminId = req.body.adminId;
    try {
        const admin = await Admin.destroy({
            where: {
                id: adminId,
            },
        });
        console.log(admin);
        if (admin) return true;
        else return false;
    } catch (e) {
        return false;
    }
};
