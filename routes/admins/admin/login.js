const express = require("express");
const router = express.Router();
const loginController = require("../../../controller/admins/Admin/login");
const meController = require("../../../controller/admins/Admin/me");
const { verifyToken } = require("../../../middleware/verification/loginVerify");

router.post("/admin/login", loginController.login);
router.get("/admin/me", verifyToken, meController.me);

module.exports = router;
// stor index update destory  show
