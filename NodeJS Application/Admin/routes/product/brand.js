const express = require("express");
const router = express.Router();
const brandController = require("../../controller/product/brandController");
const { verifyToken } = require("../../../middleware/verification/adminLoginVerify");
const upload = require("../../../middleware/upload").upload;

router.post("/brand/add", verifyToken, upload.single("photo"), brandController.store);
router.get("/brand", brandController.index);
router.put("/brand/edit", verifyToken, upload.single("photo"), brandController.update);

router.delete("/brand/remove", verifyToken, brandController.destroy);

module.exports = router;
// stor index update destory  show
