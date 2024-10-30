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
exports.CompanyService = void 0;
const prisma_1 = __importDefault(require("../../../../Shared/prisma"));
const ApiError_1 = __importDefault(require("../../../../Error/ApiError"));
const addCompany = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        throw new ApiError_1.default(401, "user Does not exist");
    console.log(payload);
    const { companyDetails: company, companyApplication } = payload;
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
    return result;
});
const getAllCompanies = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma_1.default.company.findMany({
        include: {
            companyApplication: {
                include: {
                    applicants: {
                        select: {
                            id: true
                        }
                    }
                }
            }
        }
    });
    return data;
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
    console.log(response);
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
            companyApplication: {
                include: {
                    applicants: {
                        where: {
                            studentId: id
                        },
                        select: {
                            studentId: true
                        },
                    },
                    _count: {
                        select: {
                            applicants: true
                        }
                    }
                }
            }
        }
    });
    return data;
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
            applicants: is_admin,
            _count: true
        }
    });
    const { company } = application, companyApplication = __rest(application, ["company"]);
    console.log(companyApplication);
    const response = Object.assign(Object.assign({}, company), companyApplication);
    return response;
});
exports.CompanyService = {
    addCompany,
    getAllCompanies,
    getCompanyDetails,
    updateCompany,
    getAllApplications,
    getApplication
};
//# sourceMappingURL=company.service.js.map