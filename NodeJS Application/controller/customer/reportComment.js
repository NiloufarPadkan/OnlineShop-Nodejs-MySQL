const commentService = require("../../services/customerService/Comment");
const Response = require("../../services/response");

exports.report = async (req, res, next) => {
    try {
        let response;
        const reportingCommentRespnse = await commentService.report(req);
        if (reportingCommentRespnse === "comentNotFound")
            response = new Response(400, "fail", reportingCommentRespnse);
        else response = new Response(200, "success", reportingCommentRespnse);
        if (reportingCommentRespnse != "")
            return res.status(200).send(response.handler());
    } catch (e) {
        return res.status(500).send(e);
    }
};
