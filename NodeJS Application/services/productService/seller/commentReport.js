const Comment = require("../../../models/Comment");
const Comment_report = require("../../../models/Comment_report");
const Customer = require("../../../models/Customer");
exports.readReports = async (req) => {
    try {
        const limit = req.params.size ? req.params.size : 3;
        const offset = req.params.page ? req.params.page * limit : 0;
        const reports = await Comment_report.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            include: [{ model: Customer, attributes: ["id", "fname", "lname"] }],
        });
        return reports;
    } catch (e) {
        console.log(e);
        return "";
    }
};

exports.showReport = async (req) => {
    try {
        const report = await Comment_report.findOne({
            include: [
                { model: Customer, attributes: ["id", "fname", "lname"] },
                { model: Comment },
            ],
            where: {
                id: req.params.id,
            },
        }).then((report) => {
            report.read_receipt = 1;
            return report.save();
        });
        return report;
    } catch (e) {
        console.log(e);
        return "";
    }
};
exports.unreadReports = async (req) => {
    try {
        const unreadReports = await Comment_report.findAndCountAll({
            where: {
                read_receipt: 0,
            },
        }).then(function (result) {
            console.log(result);
            return result;
        });
        return unreadReports;
    } catch (e) {
        console.log(e);
        return "";
    }
};
