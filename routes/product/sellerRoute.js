const express = require("express");
const router = express.Router();
const productController = require("../../controller/product/productController");
//const { verifyToken } = require("../../middleware/verification/loginVerify");

router.post("/product/add", productController.store);

module.exports = router;
// stor index update destory  show
