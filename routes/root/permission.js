const express = require("express");
const router = express.Router();
const permissionController = require("../../controller/root/permission");
router.post("/permission/add", permissionController.store);

module.exports = router;
// stor index update destory  show
