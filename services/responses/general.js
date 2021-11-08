const Response = require("../response");

class roleRes extends Response {
    constructor(status, message, response) {
        super(status, message, response);
    }

    handler() {
        return {
            status: this.getStatus(),
            message: this.toUp(this.getMessage()),
            response: this.getRes(),
        };
    }

    toUp(myarg) {
        return myarg.toUpperCase();
    }
}
module.exports = roleRes;
