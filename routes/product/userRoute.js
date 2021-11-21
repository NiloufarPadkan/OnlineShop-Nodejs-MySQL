const express = require("express");
const router = express.Router();
const productController = require("../../controller/seller/productController");
const searchController = require("../../controller/users/searchController");
//const { verifyToken } = require("../../middleware/verification/loginVerify");

router.get("/product/list/:size/:page", productController.index);
router.get("/product/search/:size/:page", searchController.search);

module.exports = router;
// stor index update destory  show
