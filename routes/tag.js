const express = require("express");
const router = express.Router();
const TagController = require("../controller/tagController");
const { verifyToken } = require("../middleware/verification/loginVerify");

router.post("/Tag/add", verifyToken, TagController.store);
router.get("/Tag", verifyToken, TagController.index);
router.put("/Tag/edit", verifyToken, TagController.update);

router.delete("/Tag/remove", verifyToken, TagController.destroy);

module.exports = router;
// stor index update destory  show
