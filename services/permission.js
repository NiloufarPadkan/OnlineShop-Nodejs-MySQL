const Permission = require("../models/Permission");

exports.insertPermission = async (req, res, next) => {
    try {
        const permission = req.body.permission;

        const newPermission = new Permission({
            title: permission,
        });
        try {
            const savedPermission = await newPermission.save();
            next();
            //return res.status(200).send(savedAdmin);
        } catch (e) {
            return res.status(500).send(e);
        }
    } catch (e) {
        return res.status(500).send(e);
    }
};
