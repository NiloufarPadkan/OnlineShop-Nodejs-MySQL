const express = require("express");
const router = express.Router();
const adminController = require("../../controller/Admin/admin");

router.post("/admin/create", adminController.store);
router.put("/admin/edit", adminController.update);
router.delete("/admin/delete", adminController.destroy);
router.get("/admin/list", adminController.index);

module.exports = router;
// stor index update destory  show
