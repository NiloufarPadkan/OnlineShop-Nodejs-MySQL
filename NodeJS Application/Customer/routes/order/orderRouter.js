const express = require("express");
const router = express.Router();
const orderController = require("../../controller/order/orderController");
const { verifyToken } = require("../../../middleware/verification/customerLoginVerify");
const {
    quantityValidator,
} = require("../../../middleware/validations/quantityValidator");

router.post("/checkout", verifyToken, orderController.store);
// router.get("/myCart", verifyToken, cartController.show);
module.exports = router;
