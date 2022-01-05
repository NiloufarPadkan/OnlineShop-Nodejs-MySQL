const Product = require("../../../models/Product");
const Category = require("../../../models/Category");
const Tag = require("../../../models/Tag");
const Brand = require("../../../models/Brand");
const Sequelize = require("sequelize");
const Comment = require("../../../models/Comment");
const Customer = require("../../../models/Customer");
const Product_views = require("../../../models/Product_views");
const Product_Rating = require("../../../models/Customer_ProductRating");
const Product_Tag = require("../../../models/Product_tag");
const Product_tag = require("../../../models/Product_tag");

const Op = Sequelize.Op;

exports.indexProducts = async (req) => {
    try {
        let filter = {};

        filter.category = req.query.category ? req.query.category.split(",") : {};
        filter.tag = req.query.tag ? req.query.tag.split(",") : {};
        filter.brand = req.query.brand ? req.query.brand.split(",") : {};
        filter.price = req.query.price ? req.query.price.split(",") : [0, 99990000];

        // let order = req.query.sortBy ? req.query.sortBy : "";
        let sortBy = [];
        switch (req.query.sortBy) {
            case "mostViewd":
                sortBy = [[Product_views, "viewCount", "desc"]];
                break;
            case "mostPopuler":
                sortBy = [["AvgRating", "DESC"]];
                break;
            case "mostExpensive":
                sortBy = [["base_price", "DESC"]];
                break;
            case "cheapest":
                sortBy = [["base_price", "ASC"]];
                break;
            default:
                sortBy = [[Product_views, "viewCount", "desc"]];
        }

        const limit = req.query.size ? req.query.size : 3;
        const offset = req.query.page ? req.query.page * limit : 0;
        const products = await Product.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            subQuery: false,

            include: [
                { model: Category, where: { id: { [Op.or]: filter.category } } },
                { model: Brand, where: { id: { [Op.or]: filter.brand } } },
                {
                    model: Tag,
                    required: false,
                    exclude: [{ model: Product_tag }],
                },
                {
                    model: Product_views,
                    required: false,
                    attributes: ["viewCount"],
                },
            ],

            order: sortBy,

            where: {
                base_price: {
                    [Op.between]: filter.price,
                },
                "$Tags.id$": { [Op.or]: filter.tag },

                activityStatus: 1,
            },
        });
        return products;
    } catch (e) {
        throw new Error(e);
    }
};
exports.getProductComments = async (req) => {
    try {
        const limit = req.query.size ? req.query.size : 3;
        const offset = req.query.page ? req.query.page * limit : 0;

        const id = req.params.id;
        const comments = await Comment.findAll({
            include: [{ model: Customer }],
            where: {
                productId: id,
                visible: 1,
            },
            include: [{ model: Customer, attributes: ["fname", "lname"] }],
            raw: true,
            limit: parseInt(limit),
            offset: parseInt(offset),
        });
        return comments;
    } catch (e) {
        throw new Error(e);
    }
};

exports.getOneProduct = async (req) => {
    try {
        const comments = await this.getProductComments(req);
        const ratingCount = await Product_Rating.count({
            where: { productId: req.params.id },
        });
        const viewersIp = await Product_views.findOne({
            where: {
                productId: req.params.id,
            },
        }).then((viewers) => {
            if (viewers) {
                let list = viewers.dataValues.IpList;
                list = list.split(",");
                if (!list.includes(req.socket.remoteAddress)) {
                    list.push(req.socket.remoteAddress);
                    viewers.viewCount = viewers.viewCount + 1;
                }
                viewers.IpList = list.toString();
                return viewers.save();
            } else {
                let view = new Product_views({
                    IpList: req.socket.remoteAddress,
                    productId: req.params.id,
                    viewCount: 1,
                });
                return view.save({});
            }
        });

        let products = await Product.findOne({
            include: [
                { model: Category },
                { model: Brand },
                {
                    model: Tag,
                    required: false,
                    exclude: [{ model: Product_tag }],
                },
            ],
            where: {
                id: req.params.id,
                activityStatus: 1,
            },
        });
        products = products.toJSON();
        products.ratingCount = ratingCount;

        let result = { products, comments };
        return result;
    } catch (e) {
        throw new Error(e);
    }
};

exports.searchProducts = async (req) => {
    try {
        let filter = {};
        filter.category = req.query.category ? req.query.category.split(",") : {};
        filter.tag = req.query.tag ? req.query.tag.split(",") : {};
        filter.brand = req.query.brand ? req.query.brand.split(",") : {};
        filter.price = req.query.price ? req.query.price.split(",") : [0, 99990000];
        // let order = req.query.sortBy ? req.query.sortBy : "";
        let sortBy = [];
        switch (req.query.sortBy) {
            case "mostViewd":
                sortBy = [[Product_views, "viewCount", "desc"]];
                break;
            case "mostPopuler":
                sortBy = [["AvgRating", "DESC"]];
                break;
            case "mostExpensive":
                sortBy = [["base_price", "DESC"]];
                break;
            case "cheapest":
                sortBy = [["base_price", "ASC"]];
                break;
            default:
                sortBy = [[Product_views, "viewCount", "desc"]];
        }
        let searchString = req.query.search;

        const limit = req.query.size ? req.query.size : 3;
        const offset = req.query.page ? req.query.page * limit : 0;
        const products = await Product.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            subQuery: false,
            include: [
                {
                    model: Category,
                    where: {
                        id: { [Op.or]: filter.category },
                    },
                },
                {
                    model: Tag,
                    required: false,
                    exclude: [{ model: Product_tag }],
                },
                { model: Brand, where: { id: { [Op.or]: filter.brand } } },
                {
                    model: Product_views,
                    required: false,
                    attributes: ["viewCount"],
                },
            ],
            order: sortBy,

            where: {
                base_price: {
                    [Op.between]: filter.price,
                },
                activityStatus: 1,

                [Op.or]: [
                    { name: { [Op.like]: "%" + searchString + "%" } },

                    { "$Tags.title$": { [Op.like]: "%" + searchString + "%" } },
                ],
            },
        });
        if (!products) {
            return "ProductNotFound";
        }
        return products;
    } catch (e) {
        throw new Error(e);
    }
};
