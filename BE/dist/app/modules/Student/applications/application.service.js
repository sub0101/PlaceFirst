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
exports.ApplicationService = void 0;
const prisma_1 = __importDefault(require("../../../../Shared/prisma"));
const ApiError_1 = __importDefault(require("../../../../Error/ApiError"));
const database_1 = require("../../../../config/database");
const mailer_1 = require("../../../../utils/mailer");
const mailBody_1 = require("../../../../utils/mailBody");
const createApplication = (user, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = user;
    const student = yield prisma_1.default.student.findUnique({ where: { id: id } });
    if (!student)
        throw new ApiError_1.default(401, "User Does Not Exist");
    const isApplicationExist = yield database_1.ApplicantModel.findOne({
        studentId: data.studentId,
        companyApplicationId: data.companyApplicationId
    });
    console.log(isApplicationExist);
    if (isApplicationExist)
        throw new ApiError_1.default(401, "Application Already Exist");
    const respone = yield database_1.ApplicantModel.create(Object.assign({}, data));
    console.log(respone);
    (0, mailer_1.mailSender)(student === null || student === void 0 ? void 0 : student.email, "Application Successful!", yield (0, mailBody_1.successfully_applied)(student.name, student.email, ""));
    return respone;
    // const {cgpa , backlog,precentage,studentId , companyId } = data
    // const isExist = await prisma.applicant.findFirst({
    //     where:{
    //         studentId:studentId,
    //         companyApplicationId:companyId,
    //     }
    // })
    // if(isExist) {
    //     throw new ApiError(409 , "Application Already Exist")
    // }
    // const application =  await prisma.applicant.create( {
    //    data:{
    //     cgpa: parseInt(cgpa),
    //     backlog:backlog,
    //     precentage:precentage,
    //     Student:{
    //         connect:{id:studentId}      
    //     },
    //     CompanyApplication:{
    //         connect:{id:companyId}
    //     }
    //    }
    // })
    // console.log(application)
    // return application
});
exports.ApplicationService = {
    createApplication
};
//# sourceMappingURL=application.service.js.map