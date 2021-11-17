const Product = require("../../models/Product");

exports.indexProducts = async (req) => {
    try {
        const limit = req.params.size ? req.params.size : 3;
        const offset = req.params.page ? req.params.page * limit : 0;
        const products = await Product.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
        });
        return products;
    } catch (e) {
        console.log(e);
        return "";
    }
};
