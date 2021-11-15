const Product = require("../../models/Product");

exports.insertProduct = async (req) => {
    try {
        const newProduct = new Product({
            name: req.body.name,
            base_price: req.body.base_price,
            temp_price: req.body.temp_price,
            count: req.body.count,
            description: req.body.description,
            photo: req.body.photo,
            avtivityStatus: req.body.avtivityStatus,
        });
        const savedProduct = await newProduct.save();
        return savedProduct;
    } catch (e) {
        return "";
    }
};

// exports.updateProduct = async (req) => {
//     try {
//         const productId = req.body.productId;
//         const foundProduct = await Product.findByPk(productId);
//         if (!foundProduct) {
//             return "productNotFound";
//         }

//         const roleId = req.body.roleId ? req.body.roleId : foundProduct.roleId;

//         const activity = req.body.activity
//             ? req.body.activity
//             : foundProduct.avtivityStatus;

//         const foundRole = await Role.findByPk(roleId);
//         if (!foundRole) {
//             return "roleNotfound";
//         }
//         const upproduct = await Product.findByPk(productId).then((product) => {
//             product.roleId = roleId;
//             product.avtivityStatus = activity;
//             return product.save();
//         });
//         //const productrole = await upproduct.getRole(); /*get role of product*/
//         return upproduct;
//     } catch (e) {
//         return "";
//     }
// };
// exports.destroyProduct = async (req) => {
//     const productId = req.body.productId;
//     try {
//         const product = await Product.destroy({
//             where: {
//                 id: productId,
//             },
//         });
//         //console.log(product);
//         if (product) return true;
//         else return false;
//     } catch (e) {
//         return false;
//     }
// };
