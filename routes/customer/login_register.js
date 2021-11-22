const express = require("express");
const router = express.Router();
const loginRegisterController = require("../../controller/customer/login_register");
// const meController = require("../../../controller/admins/Admin/me");
const { customerValidation } = require("../../middleware/validations/customerValidation");
const { auth } = require("../../middleware/auth/customer");

router.post(
    "/customer/login-register",
    customerValidation,
    auth,
    loginRegisterController.login_register
);
// router.get("/admin/me", verifyToken, meController.me);

module.exports = router;
// stor index update destory  show
