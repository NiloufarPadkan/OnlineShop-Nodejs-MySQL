const express = require("express");
const router = express.Router();
const loginController = require("../../controller/Admin/login");
router.post("/admin/login", loginController.login);

module.exports = router;
// stor index update destory  show
