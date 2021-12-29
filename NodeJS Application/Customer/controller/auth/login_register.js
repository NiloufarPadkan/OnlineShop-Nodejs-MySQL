const loginService = require("../../services/auth/login_signup");
const Response = require("../../../services/response");

exports.login_register = async (req, res, next) => {
    try {
        const loginResponse = await loginService.login_signup(req);
        if (loginResponse === "yourAcoountIsNotActive") {
            let response = new Response(400, "fail", loginResponse);
            if (loginResponse != "") return res.status(400).send(response.handler());
        }
        let response = new Response(200, "success", loginResponse);
        if (loginResponse != "") return res.status(200).send(response.handler());
    } catch (e) {
        return res.status(500).send(e);
    }
};
