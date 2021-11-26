const express = require("express");
const router = express.Router();
const productController = require("../../controller/product/users/productController");
const commentController = require("../../controller/product/users/commentController");
const { verifyToken } = require("../../middleware/verification/customerLoginVerify");
const addComment = require("../../controller/customer/addComment");
router.post("/product/addComment", verifyToken, addComment.addComment);

router.get("/product/list/:size/:page", productController.index);
router.get("/product/search/:size/:page", productController.search);
router.get("/product/:id/comments", commentController.show);

router.get("/product/get/:id", productController.show);

module.exports = router;
// stor index update destory  show
