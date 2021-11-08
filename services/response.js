class Response {
    constructor(status, message, response) {
        this.setStatus(status);

        this.setMessage(message);

        this.setRes(response);
    }

    setStatus(status) {
        this.status = status;
    }

    setMessage(message) {
        this.message = message;
    }

    setRes(res) {
        this.response = res;
    }

    getStatus() {
        return this.status;
    }

    getMessage() {
        return this.message;
    }

    getRes() {
        return this.response;
    }

    handler() {
        return {
            status: this.status,
            message: this.message,
            response: this.response,
        };
    }
}

module.exports = Response;
