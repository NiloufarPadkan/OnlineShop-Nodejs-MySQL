const express = require("express");
const router = express.Router();
const productController = require("../../controller/product/seller/productController");
const productCommentController = require("../../controller/product/seller/product-commentController");

const commentController = require("../../controller/product/seller/commentController");
const reportController = require("../../controller/product/seller/reportsController");
const { verifyToken } = require("../../middleware/verification/adminLoginVerify");
const upload = require("../../middleware/upload").upload;

router.post("/product/add", verifyToken, upload.any("photo"), productController.store);
router.put("/product/:id/update", verifyToken, productController.update);
router.delete("/product/remove", verifyToken, productController.destroy);

router.get("/comments/:size/:page", verifyToken, commentController.index);
router.get("/comment/:id", verifyToken, commentController.show);
router.put("/comment/updateStatus/:id", verifyToken, commentController.update);

router.get("/reports", verifyToken, reportController.index);

router.get("/reports/:id", verifyToken, reportController.show);
router.get("/unreadreports/counts", verifyToken, reportController.showUnreadReportCount);

router.get("/admin/product/list/:size/:page", verifyToken, productController.index);
router.get("/admin/product/search/:size/:page", verifyToken, productController.search);
router.get("/admin/product/:id/show", verifyToken, productController.show);

router.get(
    "/admin/product/:id/comments/:size/:page",
    verifyToken,
    productCommentController.show
);
// router.get("/product/:id/rating", ratingController.show);

module.exports = router;
