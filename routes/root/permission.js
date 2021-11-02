const express = require("express");
const router = express.Router();
const permissionService = require("../../services/permission");
const permissionController = require("../../controller/Admin/permission");
router.post(
    "/permission/add",
    permissionService.insertPermission,
    permissionController.store
);

module.exports = router;
// stor index update destory  show
