const express = require("express");
const router = express.Router();
const checkCartconttroller = require("../../controller/cart/checkCartController");
const { verifyToken } = require("../../../middleware/verification/adminLoginVerify");

router.get("/checkCart/:id", verifyToken, checkCartconttroller.show);
module.exports = router;
