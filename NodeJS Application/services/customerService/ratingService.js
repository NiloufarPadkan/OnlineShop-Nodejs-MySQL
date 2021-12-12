const Customer_ProductRating = require("../../models/Customer_ProductRating");
const Sequelize = require("sequelize");
const Product = require("../../models/Product");

exports.add = async (req, res, next) => {
    try {
        let customer_ProductRating;
        customer_ProductRating = await Customer_ProductRating.findOne({
            where: {
                customerId: req.customer.id,
                productId: req.body.id,
            },
        });
        if (customer_ProductRating !== null) {
            customer_ProductRating.rating = req.body.rating;
            await customer_ProductRating.save();
            // return customer_ProductRating;
        } else {
            customer_ProductRating = new Customer_ProductRating({
                rating: req.body.rating,
                customerId: req.customer.id,
                productId: req.body.id,
            });
            await customer_ProductRating.save();
        }
        let avgRating = await Customer_ProductRating.findAll({
            where: {
                productId: req.body.id,
            },
            raw: true,
            attributes: [[Sequelize.fn("AVG", Sequelize.col("rating")), "average"]],
        });
        const p = await Product.findOne({
            where: {
                id: req.body.id,
            },
        }).then((p) => {
            p.AvgRating = Object.values(avgRating[0]);
            return p.save();
        });

        return p;
    } catch (e) {
        console.log(e);
        return "";
    }
};
exports.getProductRating = async (req) => {
    try {
        const p = await Product.findOne({
            where: {
                id: req.params.id,
            },
        });
        console.log(p);
        return p.AvgRating;
    } catch (e) {
        console.log(e);
        return "";
    }
};
