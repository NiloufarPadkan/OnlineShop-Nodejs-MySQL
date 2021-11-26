const Product = require("../../models/Product");
const Category = require("../../models/Category");
const Tag = require("../../models/Tag");
const Brand = require("../../models/Brand");
const Sequelize = require("sequelize");
const Comment = require("../../models/Comment");
const Customer = require("../../models/Customer");
const Op = Sequelize.Op;

exports.indexProducts = async (req) => {
    try {
        let filter = {};
        filter.category = req.query.category ? req.query.category.split(",") : {};
        filter.tag = req.query.tag ? req.query.tag.split(",") : {};
        filter.brand = req.query.brand ? req.query.brand.split(",") : {};

        const limit = req.params.size ? req.params.size : 3;
        const offset = req.params.page ? req.params.page * limit : 0;
        const products = await Product.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            include: [{ model: Category }, { model: Tag }, { model: Brand }],
            where: {
                "$Category.id$": {
                    [Op.or]: filter.category,
                },
                "$Brand.id$": {
                    [Op.or]: filter.brand,
                },
                "$Tag.id$": {
                    [Op.or]: filter.tag,
                },
                avtivityStatus: 1,
            },
        });
        return products;
    } catch (e) {
        console.log(e);
        return "";
    }
};
exports.getProductComments = async (req) => {
    try {
        const id = req.params.id;
        const comments = await Comment.findAll({
            include: [{ model: Customer }],
            where: {
                productId: id,
                //visible: 1,
            },
        });
        return comments;
    } catch (e) {
        console.log(e);
        return "";
    }
};
exports.getOneProduct = async (req) => {
    try {
        const id = req.params.id;

        const products = await Product.findOne({
            include: [{ model: Category }, { model: Tag }, { model: Brand }],
            where: {
                id: id,
                avtivityStatus: 1,
            },
        });
        return products;
    } catch (e) {
        console.log(e);
        return "";
    }
};

exports.searchProducts = async (req) => {
    try {
        let filter = {};
        filter.category = req.query.category ? req.query.category.split(",") : {};
        filter.tag = req.query.tag ? req.query.tag.split(",") : {};
        filter.brand = req.query.brand ? req.query.brand.split(",") : {};

        let searchString = req.query.search;

        const limit = req.params.size ? req.params.size : 3;
        const offset = req.params.page ? req.params.page * limit : 0;
        const products = await Product.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            include: [{ model: Category }, { model: Tag }, { model: Brand }],
            where: {
                [Op.or]: [
                    {
                        "$Category.title$": { [Op.like]: "%" + searchString + "%" },
                    },
                    {
                        "$Brand.name$": { [Op.like]: "%" + searchString + "%" },
                    },
                    {
                        "$Tag.title$": { [Op.like]: "%" + searchString + "%" },
                    },
                    {
                        name: { [Op.like]: "%" + searchString + "%" },
                    },
                ],
                "$Category.id$": {
                    [Op.or]: filter.category,
                },
                "$Brand.id$": {
                    [Op.or]: filter.brand,
                },
                "$Tag.id$": {
                    [Op.or]: filter.tag,
                },
                avtivityStatus: 1,
            },
        });
        if (!products) {
            return "ProductNotFound";
        }
        return products;
    } catch (e) {
        console.log(e);
        return "";
    }
};
