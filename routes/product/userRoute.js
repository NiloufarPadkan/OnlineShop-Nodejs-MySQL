const express = require("express");
const router = express.Router();
const productController = require("../../controller/product/seller/productController");
const searchController = require("../../controller/product/users/searchController");
const { verifyToken } = require("../../middleware/verification/customerLoginVerify");
const addComment = require("../../controller/customer/addComment");
router.post("/product/addComment", verifyToken, addComment.addComment);

router.get("/product/list/:size/:page", productController.index);
router.get("/product/search/:size/:page", searchController.search);
router.get("/product/get/:id", productController.show);

module.exports = router;
// stor index update destory  show
