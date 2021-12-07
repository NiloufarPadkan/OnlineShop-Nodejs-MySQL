const Product_Rating = require("../../models/Product_Rating");
const Sequelize = require("sequelize");

exports.add = async (req, res, next) => {
    try {
        let product_rating;
        product_rating = await Product_Rating.findOne({
            where: {
                customerId: req.customer.id,
                productId: req.body.id,
            },
        });
        if (product_rating !== null) {
            product_rating.rating = req.body.rating;
            product_rating.save();
            return product_rating;
        }

        product_rating = new Product_Rating({
            rating: req.body.rating,
            customerId: req.customer.id,
            productId: req.body.id,
        });
        const newRating = await product_rating.save();
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
