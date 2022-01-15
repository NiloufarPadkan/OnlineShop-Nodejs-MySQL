const commentService = require("../../services/product/Comment");
const Response = require("../../../services/response");

exports.addComment = async (req, res, next) => {
    try {
        const addingComentResponse = await commentService.add(req);
        let response = new Response(200, "success", addingComentResponse);
        return res.status(200).send(response.handler());
    } catch (e) {
        if (e.statusCode) {
            err.statusCode = 500;
        }
        next(e);
    }
};
