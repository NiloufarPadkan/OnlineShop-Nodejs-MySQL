const jwt = require("jsonwebtoken");
const validToken = require("../../lib/jwtUtil").verifyToken;
const dict = require("../../resources/dict");
const verifyToken = (req, res, next) => {
    console.log(req.headers.token);
    if (!req.headers.token) {
        return res.status(500).send(dict.enterToken);
    }
    console.log(validToken(req.headers.token));
    if (validToken(req.headers.token)) {
        next();
    } else {
        return res.status(401).json(dict.invalidToken);
    }
};
module.exports = {
    verifyToken,
};
