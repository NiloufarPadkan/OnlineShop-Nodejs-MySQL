const express = require("express");
const router = express.Router();
const cartService = require("../../services/cartService/cart");
const cartController = require("../../controller/cart/cartController");
const { verifyToken } = require("../../middleware/verification/customerLoginVerify");
const { quantityValidator } = require("../../middleware/validations/quantityValidator");

router.post("/cart/:id/add", verifyToken, quantityValidator, cartController.store);
router.get("/myCart", verifyToken, cartController.show);
module.exports = router;
// stor index update destory  show
