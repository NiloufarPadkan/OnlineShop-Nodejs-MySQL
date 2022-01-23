const express = require("express");
const router = express.Router();
const checkOutOrder = require("../../controller/order/checkout");
const addPayment = require("../../controller/order/AddPaymentId");
const cancelOrder = require("../../controller/order/cancel");
const showOrder = require("../../controller/order/showOrder");
const { verifyToken } = require("../../../middleware/verification/customerLoginVerify");
const {
    quantityValidator,
} = require("../../../middleware/validations/quantityValidator");

router.post("/checkout", verifyToken, checkOutOrder.store);
router.get("/order/:id/show", verifyToken, showOrder.show);
router.get("/myOrders", verifyToken, showOrder.index);
router.put("/order/:id/addPayment", verifyToken, addPayment.addPayment);
router.put("/order/:id/cancel", verifyToken, cancelOrder.cancel);
module.exports = router;
