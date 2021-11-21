const express = require("express");
const router = express.Router();
const brandController = require("../controller/brandController");
const { verifyToken } = require("../middleware/verification/loginVerify");

router.post("/brand/add", verifyToken, brandController.store);
router.get("/brand", verifyToken, brandController.index);
router.put("/brand/edit", verifyToken, brandController.update);

router.delete("/brand/remove", verifyToken, brandController.destroy);

module.exports = router;
// stor index update destory  show
