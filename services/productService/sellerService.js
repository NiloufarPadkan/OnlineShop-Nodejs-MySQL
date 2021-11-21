const Product = require("../../models/Product");

exports.insertProduct = async (req) => {
    try {
        // if (!req.body.categoryId || !req.body.brandId) {
        //     return "categoryOrBrandEmpty";
        // }
        const newProduct = new Product({
            name: req.body.name,
            base_price: req.body.base_price,
            temp_price: req.body.temp_price,
            count: req.body.count,
            description: req.body.description,
            photo: req.body.photo,
            avtivityStatus: req.body.avtivityStatus,
            categoryId: req.body.categoryId,
            // tagId: req.body.tagId,
            // brandId: req.body.brandId,
        });

        const savedProduct = await newProduct.save();
        return savedProduct;
    } catch (e) {
        return "";
    }
};

exports.updateProduct = async (req) => {
    try {
        const productId = req.body.productId;
        const foundProduct = await Product.findByPk(productId);
        if (!foundProduct) {
            return "productNotFound";
        }
        const name = req.body.name ? req.body.name : foundProduct.name;

        const base_price = req.body.base_price
            ? req.body.base_price
            : foundProduct.base_price;

        const temp_price = req.body.temp_price
            ? req.body.temp_price
            : foundProduct.roleId;

        const count = req.body.count ? req.body.count : foundProduct.count;
        const description = req.body.description
            ? req.body.description
            : foundProduct.roleId;

        const photo = req.body.photo ? req.body.photo : foundProduct.photo;

        const avtivityStatus = req.body.avtivityStatus
            ? req.body.avtivityStatus
            : foundProduct.avtivityStatus;

        const upproduct = await Product.findByPk(productId).then((product) => {
            product.name = name;
            product.base_price = base_price;
            product.temp_price = temp_price;
            product.count = count;
            product.description = description;
            product.photo = photo;
            product.avtivityStatus = avtivityStatus;
            return product.save();
        });
        //const productrole = await upproduct.getRole(); /*get role of product*/
        return upproduct.getCategory();
    } catch (e) {
        return "";
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
        console.log(e);
        return false;
    }
};
