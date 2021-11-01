const express = require("express");
const router = express.Router();
const roleController = require("../../controller/Admin/role");

router.post("/role", roleController.store);

module.exports = router;
// stor index update destory  show
