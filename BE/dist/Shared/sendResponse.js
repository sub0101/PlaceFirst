"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    return res.status(data.statusCode).json(data);
};
exports.default = sendResponse;
//# sourceMappingURL=sendResponse.js.map