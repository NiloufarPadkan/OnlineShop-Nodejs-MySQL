const express = require("express");
const router = express.Router();
const productController = require("../../controller/product/productController");
const productCommentController = require("../../controller/product/product-commentController");

const commentController = require("../../controller/product/commentController");
const reportController = require("../../controller/product/reportsController");
const { verifyToken } = require("../../../middleware/verification/adminLoginVerify");
const upload = require("../../../middleware/upload").upload;

router.post("/product/add", verifyToken, upload.any("photo"), productController.store);
router.put(
    "/product/:id/update",
    verifyToken,
    upload.any("photo"),
    productController.update
);
router.delete("/product/remove", verifyToken, productController.destroy);

router.get("/comments", verifyToken, commentController.index);
router.get("/comment/:id", verifyToken, commentController.show);
router.put("/comment/updateStatus/:id", verifyToken, commentController.update);

router.get("/reports", verifyToken, reportController.index);

router.get("/reports/:id", verifyToken, reportController.show);
router.get("/unreadreports/counts", verifyToken, reportController.showUnreadReportCount);

router.get("/admin/product/list", verifyToken, productController.index);
router.get("/admin/product/search", verifyToken, productController.search);
router.get("/admin/product/:id/show", verifyToken, productController.show);

router.get("/admin/product/:id/comments", verifyToken, productCommentController.show);
// router.get("/product/:id/rating", ratingController.show);

module.exports = router;
