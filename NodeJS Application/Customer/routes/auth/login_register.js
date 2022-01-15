const express = require("express");
const router = express.Router();
const loginRegisterController = require("../../controller/auth/login_register");
const meController = require("../../controller/auth/me");
const {
    customerValidation,
} = require("../../../middleware/validations/customerValidation");
const { auth } = require("../../../middleware/auth/customer");
const { verifyToken } = require("../../../middleware/verification/customerLoginVerify");

router.post(
    "/customer/login-register",
    customerValidation,
    auth,
    loginRegisterController.login_register
);
router.get("/customer/me", verifyToken, meController.me);

module.exports = router;
// stor index update destory  show
