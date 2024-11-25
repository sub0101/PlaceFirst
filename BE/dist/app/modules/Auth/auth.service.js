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
exports.AuthService = void 0;
const prisma_1 = __importDefault(require("../../../Shared/prisma"));
const auth_helper_1 = require("./auth.helper");
const bcrypt_1 = require("bcrypt");
const ApiError_1 = __importDefault(require("../../../Error/ApiError"));
const bcrypt_2 = require("../../../utils/bcrypt");
const jwt_1 = require("../../../utils/jwt");
const enums_1 = require("../../../enums");
const mailer_1 = require("../../../utils/mailer");
const mailsBody_1 = require("../../../Shared/mailsBody");
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let { userId, password } = payload;
    console.log(payload);
    userId = userId.toLocaleLowerCase();
    const auth = yield prisma_1.default.auth.findUnique({
        where: {
            user_id: userId
        }
    });
    if (!auth)
        throw new ApiError_1.default(401, "Invalid User Id");
    console.log(auth);
    const isPasswordValid = yield (0, bcrypt_1.compare)(password, auth.password);
    console.log(isPasswordValid);
    if (!isPasswordValid)
        throw new ApiError_1.default(401, "Invalid  User Id or Password.");
    const user = auth.role == "admin" ? yield prisma_1.default.admin.findUnique({ where: { adminId: userId } }) : yield prisma_1.default.student.findUnique({ where: { studentId: userId } });
    console.log(user.id);
    const accessToken = yield (0, jwt_1.generateAceessToken)({
        userId: userId,
        id: user.id,
        role: auth.role == "admin" ? "Admin" : "Student"
    });
    console.log(accessToken);
    const response = {
        userId: userId,
        token: accessToken,
        role: auth.role
    };
    return response;
});
const signupStudent = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, userId, email, password, contact, otp } = payload;
    if (!(0, auth_helper_1.verifyStudent)(userId))
        throw new ApiError_1.default(401, "User Does Not Registered to MIS");
    userId = userId.toLocaleLowerCase();
    yield auth_helper_1.AuthHelper.isUserExist(userId, email);
    const hpassword = yield (0, bcrypt_2.hashPassword)(password);
    const validOtp = yield prisma_1.default.oTP.findMany({ where: {
            email: email
        } });
    if (!validOtp)
        throw new ApiError_1.default(401, "OTp is Invalid");
    if (validOtp[0].code != otp)
        throw new ApiError_1.default(401, "OTP is Invalid");
    prisma_1.default.oTP.deleteMany({ where: { email: email } });
    const trasaction = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const auth = yield tx.auth.create({
            data: {
                email: email,
                user_id: userId,
                password: hpassword,
                role: enums_1.AuthUser.STUDENT
            }
        });
        const student = yield tx.student.create({
            data: {
                name: name,
                email: email,
                contact: contact,
                studentId: userId,
            }
        });
    }));
    (0, mailer_1.mailSender)(email, 'Account Successfully Registered', (0, mailsBody_1.registerd_body)(name, "PlaceTrack"));
});
const signupAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, userId, email, password, contact } = payload;
    userId = userId.toLocaleLowerCase();
    yield auth_helper_1.AuthHelper.isUserExist(userId, email);
    const hpassword = yield (0, bcrypt_2.hashPassword)(password);
    const trasaction = prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const auth = yield tx.auth.create({
            data: {
                email: email,
                user_id: userId,
                password: hpassword,
                role: enums_1.AuthUser.ADMIN
            }
        });
        const admin = yield tx.admin.create({
            data: {
                name: name,
                email: email,
                contact: contact,
                adminId: userId,
            }
        });
    }));
});
exports.AuthService = {
    login,
    signupStudent,
    signupAdmin
};
//# sourceMappingURL=auth.service.js.map