class Response {
    constructor(status = 200, message = "SUCCESS", response = {}) {
        this.setStatus(status);

        this.setMessage(message);

        this.setRes(response);
    }

    setStatus(status) {
        this.status = status;
        return this;
    }

    setMessage(message) {
        this.message = message;
        return this;
    }

    setRes(res) {
        this.response = res;
        return this;
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
