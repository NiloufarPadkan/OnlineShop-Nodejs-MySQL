const Admin = require("../../models/Admin");

const dict = require("../../resources/dict");
exports.store = async (req, res, next) => {
    try {
        res.status(200).send(res.locals.savedAdmin);
    } catch (e) {
        return res.status(500).send(e);
    }
};
exports.update = async (req, res, next) => {
    try {
        res.status(200).send(res.locals.updatedAdmin);
    } catch (e) {}
};
exports.destroy = async (req, res, next) => {
    try {
        return res.status(200).send(dict.successfulRemove);
    } catch (e) {
        return res.status(200).send("failed");
    }
};
exports.index = async (req, res, next) => {
    try {
        return res.status(200).send(res.locals.admins);
    } catch (e) {
        res.status(404).send(e);
    }
};
