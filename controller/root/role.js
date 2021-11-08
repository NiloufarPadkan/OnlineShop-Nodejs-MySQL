const roleService = require("../../services/role");
const Response = require("../../services/responses/general");
exports.store = async (req, res, next) => {
    try {
        const insertRoleResponse = await roleService.insertRole(req);

        if (insertRoleResponse === "alreadyExists") {
            let response = new Response(400, "fail", "alreadyExists");
            res.status(400).send(response.handler());
        } else {
            let response = new Response(200, "success", insertRoleResponse);
            res.status(200).send(response.handler());
        }
    } catch (e) {
        let response = new Response(400, "fail", e);
        res.status(400).send(test.handler());
    }
};
