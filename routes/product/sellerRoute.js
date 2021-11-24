const express = require("express");
const router = express.Router();
const productController = require("../../controller/product/seller/productController");
const { verifyToken } = require("../../middleware/verification/adminLoginVerify");
const upload = require("../../middleware/upload").upload;

router.post("/product/add", verifyToken, upload.any("photo"), productController.store);
router.put("/product/update", verifyToken, productController.update);
router.delete("/product/remove", verifyToken, productController.destroy);

module.exports = router;
