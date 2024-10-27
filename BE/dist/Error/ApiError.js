"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}
class ApiError extends BaseApiError {
    constructor(statusCode, message) {
        super(statusCode, message);
    }
}
exports.default = ApiError;
//# sourceMappingURL=ApiError.js.map