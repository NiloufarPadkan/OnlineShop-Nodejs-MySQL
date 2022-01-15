const Comment_report = require("../../../models/Comment_report");
const Comment = require("../../../models/Comment");
exports.add = async (req, res, next) => {
    try {
        const comment = new Comment({
            content: req.body.content,
            customerId: req.customer.id,
            productId: req.params.id,
        });
        const newComment = await comment.save();

        return newComment;
    } catch (e) {
        throw new Error(e);
    }
};
exports.report = async (req, res, next) => {
    try {
        const description = req.body.description;
        const commentId = req.params.id;
        const comment = await Comment.findOne({ where: { id: commentId } });
        if (!comment) return "comentNotFound";
        if (comment.customerId === req.customer.id) return "youCantReportYourself";
        else {
            let existingReport = await Comment_report.findOne({
                where: {
                    commentId: commentId,
                    customerId: req.customer.id,
                },
            });
            if (existingReport) return "youHaveReportedBefore";
            const comment_report = new Comment_report({
                description: description,
                commentId: commentId,
                customerId: req.customer.id,
            });
            const newReport = await comment_report.save();

            return newReport;
        }
    } catch (e) {
        throw new Error(e);
    }
};
