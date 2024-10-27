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
exports.isAuth = void 0;
const ApiError_1 = __importDefault(require("../../Error/ApiError"));
const jwt_1 = require("../../utils/jwt");
const ayncError_1 = require("../../utils/ayncError");
const AppRole = ["Student", "Admin"];
const isAuth = (...roles) => (0, ayncError_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(roles);
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split("Bearer ")[1];
    if (token)
        console.log(token);
    else
        throw new ApiError_1.default(404, "Token Not Found");
    const user = yield (0, jwt_1.verifyToken)(token);
    console.log(user);
    if (!user)
        throw new ApiError_1.default(401, "Invalid Token");
    const role = user.role;
    console.log(role);
    if (!roles.includes((role.toLowerCase())))
        throw new ApiError_1.default(401, "your are not authorized");
    req.user = { id: user.id, role: user === null || user === void 0 ? void 0 : user.role };
    console.log("authenticated succes");
    next();
}));
exports.isAuth = isAuth;
//# sourceMappingURL=Auth.js.map