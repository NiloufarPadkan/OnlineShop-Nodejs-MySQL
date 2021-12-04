const commentService = require("../../services/customerService/Comment");
const Response = require("../../services/response");

exports.report = async (req, res, next) => {
    try {
        const reportingCommentRespnse = await commentService.report(req);
        let response = new Response(200, "success", reportingCommentRespnse);
        if (reportingCommentRespnse != "")
            return res.status(200).send(response.handler());
    } catch (e) {
        return res.status(500).send(e);
    }
};
