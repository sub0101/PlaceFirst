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
exports.CompanyService = exports.updateStatus = void 0;
const prisma_1 = __importDefault(require("../../../../Shared/prisma"));
const ApiError_1 = __importDefault(require("../../../../Error/ApiError"));
const database_1 = require("../../../../config/database");
const comapny_helper_1 = require("./comapny.helper");
const addForm = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("adding applicant");
    console.log(payload);
    console.log(id);
    const form = new database_1.CustomFormModel({
        companyApplicationId: id,
        fields: payload
    });
    yield form.save();
    console.log(form);
    return form;
});
const getForm = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.CustomFormModel.find({});
    console.log(response);
    console.log(response[0]);
    return response[0].fields;
});
const addCompany = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!user)
        throw new ApiError_1.default(401, "user Does not exist");
    console.log(payload);
    const { companyDetails: company, companyApplication, customForm } = payload;
    const admin = prisma_1.default.admin.findUnique({
        where: { id: user.id }
    });
    const result = yield prisma_1.default.company.create({
        data: Object.assign(Object.assign({}, company), { companyApplication: {
                create: Object.assign({}, companyApplication)
            } }),
        include: {
            companyApplication: true
        }
    });
    addForm(customForm, ((_a = result === null || result === void 0 ? void 0 : result.companyApplication) === null || _a === void 0 ? void 0 : _a.id) || "");
    return result;
});
const getAllCompanies = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma_1.default.company.findMany({
        include: {
            companyApplication: true
        }
    });
    const updatedData = yield Promise.all(data.map((company) => __awaiter(void 0, void 0, void 0, function* () {
        const applicants = yield (0, comapny_helper_1.getApplicants)(company.companyApplication.id);
        return Object.assign(Object.assign({}, company), { applicants: applicants });
    })));
    return updatedData;
});
const getCompanyDetails = () => __awaiter(void 0, void 0, void 0, function* () { });
const updateCompany = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyApplication, company } = payload;
    console.log(company);
    console.log(companyApplication);
    const response = yield prisma_1.default.company.update({
        where: {
            id: company.id
        },
        data: {
            companyApplication: {
                update: Object.assign({}, companyApplication)
            }
        },
        select: {
            companyApplication: true
        }
    });
    return response;
});
const getAllApplications = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = user;
    console.log(id);
    const data = yield prisma_1.default.company.findMany({
        select: {
            name: true,
            industry: true,
            visitDate: true,
            location: true,
            companyApplication: true
        }
    });
    //   const student = await prisma.student.findUnique({where:{id:id}})
    //   const placementStatus:any= student?.placementStatus || [];
    // !placementStatus?.some((item: any) => console.log(item));
    // const canApply  = canApply(id , )
    const updatedData = yield Promise.all(data.map((company) => __awaiter(void 0, void 0, void 0, function* () {
        const applicants = yield (0, comapny_helper_1.getApplicants)(company.companyApplication.id);
        return Object.assign(Object.assign({}, company), { applicants: applicants, canApply: (yield (0, comapny_helper_1.canApply)(id, company.companyApplication.tier, applicants)) && company.companyApplication.applicationStatus });
    })));
    console.log(updatedData);
    return updatedData;
});
const getApplication = (user, comapnyId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("get Application");
    const { role, id } = user;
    const is_admin = role === "admin";
    const application = yield prisma_1.default.companyApplication.findUnique({
        where: {
            id: comapnyId
        },
        include: {
            company: {
                select: {
                    name: true,
                    location: true,
                    industry: true,
                    contactPerson: is_admin,
                    contactEmail: is_admin,
                    contactPhone: is_admin,
                    visitDate: true
                }
            },
            // applicants:is_admin,
            // _count:true
        }
    });
    const { company } = application, companyApplication = __rest(application, ["company"]);
    console.log(companyApplication);
    const response = Object.assign(Object.assign({}, company), companyApplication);
    return response;
});
const updateStatus = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, status } = payload;
    const updateCompany = yield prisma_1.default.companyApplication.update({
        where: {
            id: id
        },
        data: {
            applicationStatus: status
        }
    });
});
exports.updateStatus = updateStatus;
const getApplied = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = user;
    const student = yield prisma_1.default.student.findUnique({
        where: {
            id: id
        }
    });
    const applicant = yield database_1.ApplicantModel.find({ studentId: id });
    const companyApplications = yield Promise.all(applicant.map((applicant) => __awaiter(void 0, void 0, void 0, function* () {
        const companyApplication = yield prisma_1.default.companyApplication.findUnique({
            where: {
                id: applicant === null || applicant === void 0 ? void 0 : applicant.companyApplicationId
            },
            include: {
                company: {
                    select: {
                        name: true,
                        location: true
                    }
                }
            }
        });
        return Object.assign({ applicant }, companyApplication);
    })));
    console.log(companyApplications);
    return companyApplications;
});
exports.CompanyService = {
    addCompany,
    getAllCompanies,
    getCompanyDetails,
    updateCompany,
    getAllApplications,
    getApplication,
    addForm,
    getForm,
    updateStatus: exports.updateStatus,
    getApplied
};
//# sourceMappingURL=company.service.js.map