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
exports.S_ProfileService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../../Error/ApiError"));
const prisma_1 = __importDefault(require("../../../../Shared/prisma"));
const getProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user);
    const student = yield prisma_1.default.student.findUnique({
        where: {
            id: user.id
        },
        include: {
            education: true,
            department: true,
            course: true
        }
    });
    if (!student)
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User Does not Exist");
    return student;
});
const updateProfile = (user, data) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(user)
    const { studentInfo, education } = data;
    const { departmentId, department, courseId, course } = studentInfo, updateData = __rest(studentInfo, ["departmentId", "department", "courseId", "course"]);
    const student = yield prisma_1.default.student.update({
        data: Object.assign(Object.assign({}, updateData), { departmentId: departmentId, courseId: courseId }),
        where: {
            id: user.id
        }
    });
    if (education.length > 0) {
        yield prisma_1.default.student.update({
            where: { id: user.id },
            data: {
                education: {
                    upsert: education.map((ed) => ({
                        where: { id: ed.id || 0 },
                        update: {
                            degree: ed.degree,
                            institution: ed.institution,
                            year: ed.year,
                            currentEducation: ed.currentEducation,
                            grade: parseFloat(ed.grade),
                            specialization: ed.specialization
                        },
                        create: {
                            degree: ed.degree,
                            institution: ed.institution,
                            year: ed.year,
                            currentEducation: ed.currentEducation,
                            grade: parseFloat(ed.grade),
                            specialization: ed.specialization
                        },
                    }))
                },
            }
        });
    }
    return student;
});
const getAllProfiles = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma_1.default.student.findMany({
        include: {
            department: true,
            course: true,
        }
    });
    return response;
});
const getStudentInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield prisma_1.default.student.findUnique({
        where: {
            id: id
        },
        include: {
            education: true,
            department: true,
            course: true,
        }
    });
    if (!student)
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User Does not Exist");
    return student;
});
const deleteEducation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const respone = yield prisma_1.default.education.delete({
        where: {
            id: id
        }
    });
    return respone;
});
exports.S_ProfileService = {
    getProfile,
    updateProfile,
    getAllProfiles,
    getStudentInfo
};
//# sourceMappingURL=profile.service.js.map