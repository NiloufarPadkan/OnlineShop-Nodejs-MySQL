const express = require("express");
const router = express.Router();
const categoryController = require("../../controller/product/categoryController");
const { verifyToken } = require("../../../middleware/verification/adminLoginVerify");
const upload = require("../../../middleware/upload").upload;

router.post(
    "/category/add",
    verifyToken,
    upload.single("photo"),
    categoryController.store
);

router.get("/category", categoryController.index);
router.put(
    "/category/edit",
    verifyToken,
    upload.single("photo"),
    categoryController.update
);
router.delete("/category/remove", verifyToken, categoryController.destroy);

module.exports = router;
// stor index update destory  show
