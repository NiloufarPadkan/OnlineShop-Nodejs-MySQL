const express = require("express");
const router = express.Router();
const cartService = require("../../services/cartService/cart");
const cartController = require("../../controller/cart/cartController");
const { verifyToken } = require("../../middleware/verification/customerLoginVerify");

router.post("/cart/:id/add", verifyToken, cartController.store);
router.get("/myCart", verifyToken, cartController.show);
module.exports = router;
// stor index update destory  show
