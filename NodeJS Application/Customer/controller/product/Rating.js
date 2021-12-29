const ratingService = require("../../services/product/ratingService");

const Response = require("../../../services/response");

exports.addRating = async (req, res, next) => {
    try {
        const addRatingRes = await ratingService.add(req);
        if (addRatingRes == "") {
            let response = new Response(400, "fail", "ss");
            return res.status(400).send(response.handler());
        }

        let response = new Response(200, "success", addRatingRes);
        return res.status(200).send(response.handler());
        //res.status(200).send(res.locals.accessToken);
    } catch (e) {
        return res.status(500).send(e);
    }
};

exports.show = async (req, res, next) => {
    let response = new Response();

    try {
        const productRatingResponse = await ratingService.getProductRating(req);
        if (productRatingResponse != "")
            response.setStatus(200).setRes(productRatingResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        response.setStatus(400).setMessage("fail").setRes(e);
        return res.status(400).send(response.handler());
    }
};
