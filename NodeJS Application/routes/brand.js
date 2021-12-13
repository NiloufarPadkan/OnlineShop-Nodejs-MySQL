const express = require("express");
const router = express.Router();
const brandController = require("../controller/product/seller/brandController");
const { verifyToken } = require("../middleware/verification/adminLoginVerify");
const upload = require("../middleware/upload").upload;

router.post("/brand/add", verifyToken, upload.any("photo"), brandController.store);
router.get("/brand", verifyToken, brandController.index);
router.put("/brand/edit", verifyToken, brandController.update);

router.delete("/brand/remove", verifyToken, brandController.destroy);

module.exports = router;
// stor index update destory  show
