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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicantService = void 0;
const prisma_1 = __importDefault(require("../../../../Shared/prisma"));
const database_1 = require("../../../../config/database");
const ApiError_1 = __importDefault(require("../../../../Error/ApiError"));
const getApplicants = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("get applicants");
    console.log(id);
    const response = yield database_1.ApplicantModel.find({
        companyApplicationId: id
    });
    return response;
});
// const updateApplicant = async(user:any , payload:any) =>{
//     const{id , ...data} = payload
//     const response = await prisma.applicant.update({
//         where:{
//             id:id
//         },
//         data:data
//     })
//     return response;
// }
const updateApplicant = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = payload, data = __rest(payload, ["id"]);
    console.log(id);
    const response = yield database_1.ApplicantModel.updateOne({ _id: id }, { $set: data });
    return response;
});
const updateStatus = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = payload, data = __rest(payload, ["id"]);
    console.log(id);
    const applicant = yield database_1.ApplicantModel.findOne({ _id: id });
    const companyApplication = yield prisma_1.default.companyApplication.findUnique({
        where: {
            id: applicant.companyApplicationId
        },
        include: {
            company: true
        }
    });
    const studentId = applicant === null || applicant === void 0 ? void 0 : applicant.studentId;
    const student = yield prisma_1.default.student.findFirst({
        where: {
            id: studentId
        }
    });
    const currentPlacementStatus = Array.isArray(student === null || student === void 0 ? void 0 : student.placementStatus) ? student === null || student === void 0 ? void 0 : student.placementStatus : [];
    const check = currentPlacementStatus.some((info) => info.id === (companyApplication === null || companyApplication === void 0 ? void 0 : companyApplication.id));
    if (check)
        throw new ApiError_1.default(400, "Can Not Update Status Already Selected");
    if (data.status == "accepted") {
        // const response = prisma.student.update({
        // })
        const updateStudent = yield prisma_1.default.student.update({
            where: {
                id: studentId
            },
            data: {
                placementStatus: [
                    ...currentPlacementStatus,
                    {
                        status: "offered",
                        company: companyApplication === null || companyApplication === void 0 ? void 0 : companyApplication.company.name,
                        position: companyApplication === null || companyApplication === void 0 ? void 0 : companyApplication.jobTitle,
                        tier: companyApplication === null || companyApplication === void 0 ? void 0 : companyApplication.tier,
                        id: companyApplication === null || companyApplication === void 0 ? void 0 : companyApplication.id
                    },
                ],
            }
        });
    }
    const response = yield database_1.ApplicantModel.updateOne({ _id: id }, { $set: data });
    console.log(response);
    return response;
});
exports.ApplicantService = {
    getApplicants,
    updateApplicant,
    updateStatus
};
//# sourceMappingURL=applicants.service.js.map