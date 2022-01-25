const express = require("express");
const router = express.Router();

const orderController = require("../../controller/order/orderController");
const { verifyToken } = require("../../../middleware/verification/adminLoginVerify");

router.get("/orders", verifyToken, orderController.index);
router.get("/order/:id/", verifyToken, orderController.show);
router.put("/order/:id/update", verifyToken, orderController.update);
module.exports = router;
