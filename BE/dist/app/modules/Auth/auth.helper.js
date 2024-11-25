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
exports.AuthHelper = exports.verifyStudent = exports.sendOtp = void 0;
const ApiError_1 = __importDefault(require("../../../Error/ApiError"));
const prisma_1 = __importDefault(require("../../../Shared/prisma"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const mailer_1 = require("../../../utils/mailer");
const Student_DB_1 = require("../../../Shared/Student_DB");
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
const sendOtp = (email, enrollment) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if user is already present
        if (!(0, exports.verifyStudent)(enrollment))
            throw new ApiError_1.default(401, "User Not Registered to MIS");
        const checkUserPresent = yield prisma_1.default.student.findUnique({ where: { email: email } });
        if (checkUserPresent)
            throw new ApiError_1.default(401, "Uer Already Exist");
        let otp = otp_generator_1.default.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        let result = yield prisma_1.default.oTP.findUnique({ where: { code: otp } });
        while (result) {
            otp = otp_generator_1.default.generate(6, {
                upperCaseAlphabets: false,
            });
            result = yield prisma_1.default.oTP.findUnique({ where: { code: otp } });
        }
        const otpPayload = { email, otp };
        const otpBody = yield prisma_1.default.oTP.create({
            data: {
                email,
                code: otp
            }
        });
        console.log(otpBody);
        (0, mailer_1.sendVerificationEmail)(email, otp);
        // throw new ApiError(200 , "OTP  sent Successfully")
        // res.status(200).json({
        //   success: true,
        //   message: 'OTP sent successfully',
        //   otp,
        // });
    }
    catch (error) {
        console.log(error.message);
        // return res.status(500).json({ success: false, error: error.message });
        throw new ApiError_1.default(500, error.message);
    }
    return "Successfully Sent OTP";
});
exports.sendOtp = sendOtp;
const verifyStudent = (enrollment) => {
    const data = (0, Student_DB_1.student_DB)();
    const is_Exist = data.some((info) => info.enrollment === enrollment);
    console.log(is_Exist);
    return is_Exist;
};
exports.verifyStudent = verifyStudent;
exports.AuthHelper = {
    isUserExist,
};
//# sourceMappingURL=auth.helper.js.map