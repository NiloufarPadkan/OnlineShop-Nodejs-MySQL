const Comment_report = require("../../models/Comment_report");
const Comment = require("../../models/Comment");
exports.add = async (req, res, next) => {
    try {
        const comment = new Comment({
            content: req.body.content,
            customerId: req.customer.id,
            productId: req.body.id,
        });
        const newComment = await comment.save();

        return newComment;
    } catch (e) {
        console.log(e);
        return "";
    }
};
exports.report = async (req, res, next) => {
    try {
        const description = req.body.description;
        const commentId = req.params.id;

        const comment_report = new Comment_report({
            description: description,
            commentId: commentId,
            customerId: req.customer.id,
        });
        const newReport = await comment_report.save();

        return newReport;
    } catch (e) {
        console.log(e);
        return "";
    }
};
