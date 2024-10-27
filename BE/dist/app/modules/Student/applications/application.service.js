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
const createApplication = (user, data) => __awaiter(void 0, void 0, void 0, function* () {
    // const application = null
    const { cgpa, backlog, precentage, studentId, companyId } = data;
    const isExist = yield prisma_1.default.applicant.findFirst({
        where: {
            studentId: studentId,
            companyApplicationId: companyId,
        }
    });
    if (isExist) {
        throw new ApiError_1.default(409, "Application Already Exist");
    }
    const application = yield prisma_1.default.applicant.create({
        data: {
            cgpa: parseInt(cgpa),
            backlog: backlog,
            precentage: precentage,
            Student: {
                connect: { id: studentId }
            },
            CompanyApplication: {
                connect: { id: companyId }
            }
        }
    });
    console.log(application);
    return application;
});
exports.ApplicationService = {
    createApplication
};
//# sourceMappingURL=application.service.js.map