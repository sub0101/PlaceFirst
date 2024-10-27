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
exports.A_ProfileService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../../Error/ApiError"));
const prisma_1 = __importDefault(require("../../../../Shared/prisma"));
const getProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user);
    const response = yield prisma_1.default.admin.findUnique({
        where: {
            id: user.id
        }
    });
    if (!response)
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User Does not Exist");
    return response;
});
// const updateProfile = async(user:any , data:any) =>{
//     const {studentInfo , education} = data
//     console.log(user)
//     console.log(data)
//     const student = await  prisma.student.update({
//        data:studentInfo,
//         where:{
//             id:user.id
//         }
//     })
//     return student
// }
const getAllProfiles = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma_1.default.admin.findMany();
    return response;
});
exports.A_ProfileService = {
    getProfile,
    // updateProfile,
    getAllProfiles
};
//# sourceMappingURL=adminProfile.service.js.map