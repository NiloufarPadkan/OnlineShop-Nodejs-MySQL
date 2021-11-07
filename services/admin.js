const Admin = require("../models/Admin");
const Role = require("../models/Role");
const Role_Permission = require("../models/role-permission");
const Permission = require("../models/Permission");

const genPassword = require("../lib//passwordUtil").genPassword;

exports.insertAdmin = async (req, res, next) => {
    //check permission of create admin
    if (req.admin) console.log(req.admin.roleId + "role id ");
    //hala bayad berim to jadval role-permission kolle permisison haye marboot be on role ro list konim

    const permissionArray = await Role_Permission.findAll({
        where: { roleId: req.admin.roleId },
    });
    var result = [];
    var keys = Object.keys(permissionArray);

    console.log(keys);
    keys.forEach(function (key) {
        result.push(permissionArray[key].permissionId);
    });
    const permission = await Permission.findOne({
        where: { title: "add admin" },
    });

    if (result.includes(permission.id)) console.log("yes");
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
        try {
            const savedAdmin = await newAdmin.save();
            res.locals.savedAdmin = savedAdmin;
            next();
        } catch (e) {
            return res.status(500).send(e);
        }
    } catch (e) {
        return res.status(500).send(e);
    }
};
exports.updateAdmin = async (req, res, next) => {
    const adminId = req.body.adminId;
    const roleId = req.body.roleId ? req.body.roleId : "";
    const activity = req.body.activity ? req.body.activity : "";
    const foundAdmin = await Admin.findByPk(adminId);

    if (!foundAdmin) {
        res.status(500).send("admin not found ");
    }
    const foundRole = await Role.findByPk(roleId);
    if (!foundRole) {
        res.status(500).send("role not found ");
    }
    try {
        const upadmin = await Admin.findByPk(adminId).then((admin) => {
            admin.roleId = roleId;
            if (activity !== "") admin.avtivityStatus = activity;

            return admin.save();
        });
        const roole = await upadmin.getRole(); /*get role of admin*/
        res.locals.updatedAdmin = upadmin;
        next();
    } catch (e) {}
};
exports.destroyAdmin = async (req, res, next) => {
    const adminId = req.body.adminId;
    try {
        await Admin.destroy({
            where: {
                id: adminId,
            },
        });
        next();
    } catch (e) {
        return res.status(200).send("failed");
    }
};
exports.indexAdmins = async (req, res, next) => {
    try {
        const admins = await Admin.findAll();
        res.locals.admins = admins;
        next();
    } catch (e) {
        res.status(404).send(e);
    }
};
