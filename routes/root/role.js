const express = require("express");
const router = express.Router();
const rolePermissionController = require("../../controller/root/role-permission");
const roleController = require("../../controller/root/role");

router.post("/role", roleController.store);

router.post("/role/addPermissiion", rolePermissionController.store);

module.exports = router;
// stor index update destory  show
