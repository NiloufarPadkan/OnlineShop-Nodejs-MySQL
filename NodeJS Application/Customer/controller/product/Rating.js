const ratingService = require("../../services/product/ratingService");

const Response = require("../../../services/response");

exports.addRating = async (req, res, next) => {
    try {
        const addRatingRes = await ratingService.add(req);

        let response = new Response(200, "success", addRatingRes);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};

exports.show = async (req, res, next) => {
    let response = new Response();

    try {
        const productRatingResponse = await ratingService.getProductRating(req);

        response.setStatus(200).setRes(productRatingResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
