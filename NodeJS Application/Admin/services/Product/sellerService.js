const Product = require("../../../models/Product");
const Category = require("../../../models/Category");
const Tag = require("../../../models/Tag");
const Brand = require("../../../models/Brand");
const Sequelize = require("sequelize");
const Comment = require("../../../models/Comment");
const Customer = require("../../../models/Customer");
const Product_views = require("../../../models/Product_views");

const Product_tag = require("../../../models/Product_tag");
const generateThumb = require("../../../lib/sharp").generateThumb;
const generateSmalller = require("../../../lib/sharp").generateSmalller;
const { request } = require("express");
const Op = Sequelize.Op;

exports.insertProduct = async (req) => {
    try {
        let coverThumb,
            smallCover,
            pathArray = "";
        if (req.files[0]) {
            let photoPath = req.files;
            pathArray = Object.values(photoPath).map(
                (a) => process.env.IMAGE_PREFIX + a.path
            );
            console.log(JSON.stringify(pathArray));
            generateThumb(req.files[0].path, req.files[0].originalname);
            generateSmalller(req.files[0].path, req.files[0].originalname, 600);

            coverThumb =
                process.env.IMAGE_PREFIX +
                "uploads/thumbnail-" +
                req.files[0].originalname;

            smallCover =
                process.env.IMAGE_PREFIX + "uploads/small-" + req.files[0].originalname;
        }

        const newProduct = new Product({
            name: req.body.name,
            base_price: req.body.base_price,
            temp_price: req.body.temp_price,
            quantity: parseInt(req.body.quantity),
            description: req.body.description,
            activityStatus: req.body.activityStatus,
            categoryId: req.body.categoryId,
            photo: pathArray,
            coverThumb: coverThumb,
            smallCover: smallCover,
            tagId: req.body.tagId,
            brandId: req.body.brandId,
        });

        const savedProduct = await newProduct.save();
        return savedProduct;
    } catch (e) {
        throw new Error(e);
    }
};

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
            case "mostViewed":
                sortBy = [[Product_views, "viewCount", "desc"]];
                break;
            case "mostPopular":
                sortBy = [["AvgRating", "DESC"]];
                break;
            case "bestSeller":
                sortBy = [["quantity_sold", "DESC"]];
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
            },
        });
        return products;
    } catch (e) {
        console.log(e);
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

        const products = await Product.findOne({
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
            },
        });

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
            case "mostViewed":
                sortBy = [[Product_views, "viewCount", "desc"]];
                break;
            case "mostPopular":
                sortBy = [["AvgRating", "DESC"]];
                break;
            case "mostExpensive":
                sortBy = [["base_price", "DESC"]];
                break;
            case "bestSeller":
                sortBy = [["quantity_sold", "DESC"]];
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

exports.updateProduct = async (req) => {
    try {
        let coverThumb,
            smallCover,
            pathArray = "";
        if (req.files[0]) {
            let photoPath = req.files;
            pathArray = Object.values(photoPath).map(
                (a) => process.env.IMAGE_PREFIX + a.path
            );

            generateThumb(req.files[0].path, req.files[0].originalname);
            generateSmalller(req.files[0].path, req.files[0].originalname, 600);

            coverThumb =
                process.env.IMAGE_PREFIX +
                "uploads/thumbnail-" +
                req.files[0].originalname;

            smallCover =
                process.env.IMAGE_PREFIX + "uploads/small-" + req.files[0].originalname;
        }
        const productId = req.params.id;
        const foundProduct = await Product.findByPk(productId);
        if (!foundProduct) {
            return "productNotFound";
        }
        const name = req.body.name;

        const base_price = req.body.base_price
            ? req.body.base_price
            : foundProduct.base_price;

        const temp_price = req.body.temp_price
            ? req.body.temp_price
            : foundProduct.temp_price;

        const count = req.body.count ? req.body.count : foundProduct.count;
        const description = req.body.description
            ? req.body.description
            : foundProduct.description;

        const photo = req.body.photo ? req.body.photo : foundProduct.photo;

        let activityStatus = req.body.activityStatus
            ? +req.body.activityStatus
            : +foundProduct.activityStatus;

        foundProduct.name = name;
        foundProduct.base_price = base_price;
        foundProduct.temp_price = temp_price;
        foundProduct.count = count;
        foundProduct.description = description;
        foundProduct.photo = pathArray;
        foundProduct.coverThumb = coverThumb;
        foundProduct.smallCover = smallCover;
        foundProduct.activityStatus = activityStatus;
        await foundProduct.save();

        return foundProduct;
    } catch (e) {
        throw new Error(e);
    }
};
exports.destroyProduct = async (req) => {
    const productId = req.body.productId;
    // to do :nabayad az order ha pak she
    try {
        const product = await Product.destroy({
            where: {
                id: productId,
            },
        });
        if (product) return true;
        else return false;
    } catch (e) {
        return false;
    }
};
