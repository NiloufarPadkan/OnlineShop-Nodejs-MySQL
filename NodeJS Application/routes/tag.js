const express = require("express");
const router = express.Router();
const TagController = require("../controller/product/seller/tagController");
const { verifyToken } = require("../middleware/verification/adminLoginVerify");

router.post("/Tag/add", verifyToken, TagController.store);
router.get("/Tag", TagController.index);
router.put("/Tag/edit", verifyToken, TagController.update);
router.delete("/Tag/remove", verifyToken, TagController.destroy);

module.exports = router;
