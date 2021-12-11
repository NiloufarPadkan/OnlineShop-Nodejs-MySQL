const loginService = require("../../../services/rootService/login");
const Response = require("../../../services/responses/general");
exports.login = async (req, res, next) => {
    try {
        const loginResponse = await loginService.loginAdmin(req);
        if (loginResponse === "yourAcoountIsNotActive") {
            let response = new Response(400, "fail", "yourAcoountIsNotActive");
            if (loginResponse != "") return res.status(400).send(response.handler());
        }
        if (loginResponse === "invalidPassword" || loginResponse === "adminNotFound") {
            let response = new Response(400, "fail", "wrongCredentials");
            if (loginResponse != "") return res.status(400).send(response.handler());
        }

        let response = new Response(200, "success", loginResponse);
        if (loginResponse != "") return res.status(200).send(response.handler());
    } catch (e) {
        return res.status(500).send(e);
    }
};
