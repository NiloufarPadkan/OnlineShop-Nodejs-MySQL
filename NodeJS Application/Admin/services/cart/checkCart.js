const Product = require("../.././../models/Product");

//front checks quantity and price with this service
exports.check = async (req, res, next) => {
    try {
        let product = await Product.findOne({
            where: {
                id: req.params.id,
            },
            attributes: ["id", "name", "quantity", "base_price", "temp_price"],
        });
        return product;
    } catch (e) {
        console.log(e);
        throw new Error("something failed");
    }
};
