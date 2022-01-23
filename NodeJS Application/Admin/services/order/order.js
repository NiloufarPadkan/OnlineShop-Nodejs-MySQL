const Order = require("../../../models/Order");
const Product = require("../../../models/Product");
const Customer = require("../../../models/Customer");
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

exports.show = async (req, res, next) => {
    try {
        const id = req.params.id;
        let order = await Order.findOne({
            where: {
                id: id,
            },
            include: [
                {
                    model: Product,
                    attributes: ["id", "name", "quantity", "base_price", "temp_price"],
                },
            ],
        });
        return order;
    } catch (error) {
        throw new Error(e);
    }
};

exports.index = async (req, res, next) => {
    try {
        let filter = {};
        filter.customers = req.query.customers ? req.query.customers.split(",") : {};
        filter.products = req.query.products ? req.query.products.split(",") : {};

        let order = await Order.findAll({
            include: [
                {
                    model: Customer,
                    where: { id: { [Op.or]: filter.customers } },
                    attributes: ["fname", "lname"],
                },
                {
                    model: Product,
                    where: { id: { [Op.or]: filter.products } },
                    attributes: ["id", "name", "quantity", "base_price", "temp_price"],
                },
            ],
        });
        return order;
    } catch (error) {
        throw new Error(e);
    }
};
