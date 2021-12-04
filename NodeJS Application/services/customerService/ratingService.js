const Product_Rating = require("../../models/Product_Rating");
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
            attributes: ["rating"],
        });
        result = [];
        var keys = Object.keys(rating);
        keys.forEach(function (key) {
            result.push(rating[key].rating);
        });
        return result;
    } catch (e) {
        console.log(e);
        return "";
    }
};
