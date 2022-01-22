const fs = require("fs");
exports.indexLog = async (req) => {
    try {
        const data = fs.readFileSync("./logger/error.log", "utf8");
        const arrOfObjs = data.split("\n");

        return arrOfObjs;
    } catch (err) {
        console.error(err);
    }

    // fs.readFile("./logger/error.log", "utf8", (err, data) => {
    //     if (err) {
    //         throw new Error(err);
    //     }
    //     console.log("salam");
    //     return data;
    // });
};
