const express = require("express");
const router = express.Router();
const cartService = require("../../services/cartService/cart");
const { verifyToken } = require("../../middleware/verification/customerLoginVerify");

router.post("/cart/:id/add", verifyToken, cartService.add);
module.exports = router;
// stor index update destory  show
