const rolePermissionService = require("../../services/role-permission");
const Response = require("../../services/responses/general");

exports.store = async (req, res, next) => {
    try {
        const assignPermissionResponse =
            await rolePermissionService.AssignPermission(req);

        if (assignPermissionResponse === "alreadyExists") {
            let response = new Response(400, "fail", "alreadyExists");
            res.status(400).send(response.handler());
        } else {
            let response = new Response(
                200,
                "success",
                assignPermissionResponse
            );
            res.status(200).send(response.handler());
        }
    } catch (e) {
        let response = new Response(400, "fail", e);
        res.status(400).send(response.handler());
    }
};
