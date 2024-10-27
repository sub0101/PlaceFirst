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
exports.AuthHelper = void 0;
const ApiError_1 = __importDefault(require("../../../Error/ApiError"));
const prisma_1 = __importDefault(require("../../../Shared/prisma"));
const isUserExist = (user_id, email) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user_id + email);
    const auth = yield prisma_1.default.auth.findFirst({
        where: {
            OR: [
                { user_id: user_id },
                { email: email }
            ]
        }
    });
    console.log(auth);
    if (auth != null)
        throw new ApiError_1.default(401, "Email or Student Id is Already Exist");
    console.log("user not exist");
});
exports.AuthHelper = {
    isUserExist,
};
//# sourceMappingURL=auth.helper.js.map