const express = require("express");
const router = express.Router();
const productController = require("../../controller/seller/productController");
//const { verifyToken } = require("../../middleware/verification/loginVerify");

router.get("/product/list/:size/:page", productController.index);

module.exports = router;
// stor index update destory  show
