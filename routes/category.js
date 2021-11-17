const express = require("express");
const router = express.Router();
const categoryController = require("../controller/seller/categoryController");
const { verifyToken } = require("../middleware/verification/loginVerify");

router.post("/category/add", verifyToken, categoryController.store);
router.get("/category", verifyToken, categoryController.index);
router.put("/category/edit", verifyToken, categoryController.update);

router.delete("/category/remove", verifyToken, categoryController.destroy);

module.exports = router;
// stor index update destory  show
