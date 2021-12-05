const Product_Rating = require("../../models/Product_Rating");
const Sequelize = require("sequelize");
const { result } = require("persianize/validator");

exports.add = async (req, res, next) => {
    try {
        let rating;
        rating = await Product_Rating.findOne({
            where: {
                customerId: req.customer.id,
                productId: req.body.id,
            },
        }).then((product_rating) => {
            product_rating.rating = req.body.rating;
            return product_rating.save();
        });
        if (rating != "") {
            return rating;
        }
        rating = new Product_Rating({
            rating: req.body.rating,
            customerId: req.customer.id,
            productId: req.body.id,
        });
        const newRating = await rating.save();
        return newRating;
    } catch (e) {
        return "";
    }
};
exports.getProductRating = async (req) => {
    try {
        const id = req.params.id;
        let rating = await Product_Rating.findAll({
            where: {
                productId: id,
            },
            attributes: [[Sequelize.fn("AVG", Sequelize.col("rating")), "average"]],
        });

        return rating[0];
    } catch (e) {
        console.log(e);
        return "";
    }
};
