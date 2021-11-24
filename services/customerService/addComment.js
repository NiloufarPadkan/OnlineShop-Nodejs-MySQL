const Product_Comment = require("../../models/Product_comment");
const Comment = require("../../models/Comment");
exports.add = async (req, res, next) => {
    try {
        const productId = req.body.id;

        const comment = new Comment({
            content: req.body.content,
            customerId: req.customer.id,
        });
        const newComment = await comment.save();

        const product_comment = new Product_Comment({
            commentId: newComment.id,
            productId: productId,
        });
        const savedComment = await product_comment.save();

        return newComment;
    } catch (e) {
        console.log(e);
        return "";
    }
};
