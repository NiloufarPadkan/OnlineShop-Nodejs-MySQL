const Comment = require("../../../models/Comment");
const Customer = require("../../../models/Customer");
const Product = require("../../../models/Product");
exports.indexComments = async (req) => {
    try {
        let filter = {};
        filter.visible = req.query.visible ? { visible: req.query.visible } : {};
        filter.productId = req.query.productId ? { productId: req.query.productId } : {};

        const limit = req.params.size ? req.params.size : 3;
        const offset = req.params.page ? req.params.page * limit : 0;
        const comments = await Comment.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            where: {
                ...filter.visible,
                ...filter.productId,
            },
            include: [
                { model: Customer, attributes: ["id", "fname", "lname"] },
                { model: Product, attributes: ["id", "name"] },
            ],

            order: [["createdAt", "DESC"]],
        });

        return comments;
    } catch (e) {
        console.log(e);
        return "";
    }
};

exports.showComment = async (req) => {
    try {
        const comment = await Comment.findOne({
            include: [
                { model: Customer, attributes: ["id", "fname", "lname"] },
                { model: Product, attributes: ["id", "name"] },
            ],

            where: {
                id: req.params.id,
            },
        });
        return comment;
    } catch (e) {
        console.log(e);
        return "";
    }
};
exports.setCommentStatus = async (req) => {
    try {
        const comment = await Comment.findByPk(req.params.id)
            .then((comment) => {
                comment.visible = req.body.visible;
                return comment.save();
            })
            .catch((e) => {
                return "commentNotFound";
            });
        return comment;
    } catch (e) {
        console.log(e);
        return "";
    }
};
