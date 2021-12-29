const express = require("express");
const router = express.Router();
const cartController = require("../../../controller/cart/admin/cartController");
const { verifyToken } = require("../../../middleware/verification/adminLoginVerify");
const {
    quantityValidator,
} = require("../../../middleware/validations/quantityValidator");

router.post("/admin/cart/:id/add", verifyToken, quantityValidator, cartController.store);
router.get("/admin/:id/cart", verifyToken, cartController.show);
module.exports = router;
