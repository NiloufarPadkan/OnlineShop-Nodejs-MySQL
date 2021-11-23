const jwt = require("jsonwebtoken");

function genToken(id, roleId) {
    const accessToken = jwt.sign(
        {
            id: id,
            roleId: roleId,
        },
        process.env.JWT_KEY,
        { expiresIn: process.env.EXPIRE_TIME }
    );
    return {
        accessToken,
    };
}

// function verifyToken(authHeader) {
//     const token = authHeader.split(" ")[1];
//     try {
//         const result = jwt.verify(token, process.env.JWT_KEY);

//         if (result) return true;
//     } catch (e) {
//         return false;
//     }
//     return false;
// }
module.exports.genToken = genToken;
// module.exports.verifyToken = verifyToken;
