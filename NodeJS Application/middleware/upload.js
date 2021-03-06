const { response } = require("express");
const multer = require("multer");
const Response = require("../services/responses/general");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname.replace(/\s+/g, ""));
    },
});
const fileFilter = (req, file, cb) => {
    //let response = new Response();
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(new Error("Not an image! Please upload an image.", 400), false);
    }
};
exports.upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },

    fileFilter: fileFilter,
});
