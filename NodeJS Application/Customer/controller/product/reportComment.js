const commentService = require("../../services/product/Comment");
const Response = require("../../../services/response");

exports.report = async (req, res, next) => {
    try {
        let response;
        const reportingCommentRespnse = await commentService.report(req);

        if (
            reportingCommentRespnse === "comentNotFound" ||
            "youHaveReportedBefore" ||
            "youCantReportYourself"
        ) {
            response = new Response(400, "fail", reportingCommentRespnse);
            return res.status(400).send(response.handler());
        } else {
            response = new Response(200, "success", reportingCommentRespnse);

            return res.status(200).send(response.handler());
        }
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
