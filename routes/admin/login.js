const express = require("express");
const router = express.Router();
const loginService = require("../../services/login");
const loginController = require("../../controller/Admin/login");
router.post("/admin/login", loginService.loginAdmin, loginController.login);

module.exports = router;
// stor index update destory  show
