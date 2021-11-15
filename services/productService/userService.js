// const Product = require("../../models/Product");

// exports.indexAdmins = async (req) => {
//     try {
//         const limit = req.body.size ? req.body.size : 3;
//         const offset = req.body.page ? req.body.page * limit : 0;
//         const admins = await Admin.findAll({
//             limit: limit,
//             offset: offset,
//         });
//         return admins;
//     } catch (e) {
//         console.log(e);
//         return "";
//     }
// };
