const Product = require("../../models/Product");

const Response = require("../../services/responses/general");

const quantityValidator = async (req, res, next) => {
    let response = new Response();
    let product = await Product.findByPk(req.params.id);
    try {
        if (product.quantity < 1 || parseInt(req.body.quantity) > product.quantity) {
            response.setStatus(400).setMessage("fail").setRes("outOfStock");
            return res.status(400).send(response.handler());
        }
        console.log("ddddddd");

        next();
    } catch (e) {
        return res.status(422).send({ error: e });
    }
};

module.exports = {
    quantityValidator,
};
