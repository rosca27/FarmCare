class NotFound extends Error {
    statusCode = 404;
    constructor(message: string) {
        super(message);
        this.name = "NotFound";
        Error.captureStackTrace(this, this.constructor);
    }
}

class Unauthorized extends Error {
    statusCode = 401;
    constructor(message: string) {
        super(message);
        this.name = "Unauthorized";
        Error.captureStackTrace(this, this.constructor);
    };
};

export { NotFound, Unauthorized };

