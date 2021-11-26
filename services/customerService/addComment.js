const Product_Comment = require("../../models/Product_comment");
const Product = require("../../models/Product");
const Customer = require("../../models/Customer");
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
