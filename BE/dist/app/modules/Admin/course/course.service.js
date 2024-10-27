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
exports.CourseService = void 0;
const prisma_1 = __importDefault(require("../../../../Shared/prisma"));
const addCourse = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield prisma_1.default.course.create({
        data: payload
    });
    return course;
});
const getAllCourses = () => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield prisma_1.default.course.findMany();
    return courses;
});
exports.CourseService = {
    addCourse,
    getAllCourses
};
//# sourceMappingURL=course.service.js.map