"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyToken = exports.generateRefreshToken = exports.generateAceessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const ApiError_1 = __importDefault(require("../Error/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const generateAceessToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role, id } = payload;
    const data = {
        userId: userId,
        role: role,
        id: id
    };
    const accessToken = jsonwebtoken_1.default.sign(data, config_1.default.JWT_SECRET, { expiresIn: config_1.default.ACCESS_TOKEN_EXPIRE });
    return accessToken;
});
exports.generateAceessToken = generateAceessToken;
const generateRefreshToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        id: payload.id,
        email: payload.email,
    };
    const refreshToken = jsonwebtoken_1.default.sign(data, config_1.default.JWT_SECRET, { expiresIn: config_1.default.REFRESH_TOKEN_EXPIRE });
    return refreshToken;
});
exports.generateRefreshToken = generateRefreshToken;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const response = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
    return response;
});
exports.verifyToken = verifyToken;
const verifyRefreshToken = (token, email) => __awaiter(void 0, void 0, void 0, function* () {
    let response = "";
    yield jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET, (err, decode) => {
        if (err || decode.email !== email) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "UNAUTHORIZED");
        }
        const data = { id: decode.id, email: decode.email };
        response = jsonwebtoken_1.default.sign(data, config_1.default.JWT_SECRET, { expiresIn: config_1.default.ACCESS_TOKEN_EXPIRE });
    });
    console.log(response);
    return response;
});
exports.verifyRefreshToken = verifyRefreshToken;
//# sourceMappingURL=jwt.js.map