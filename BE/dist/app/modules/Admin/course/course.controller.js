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
exports.CourseController = void 0;
const ayncError_1 = require("../../../../utils/ayncError");
const course_service_1 = require("./course.service");
const sendResponse_1 = __importDefault(require("../../../../Shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const addCourse = (0, ayncError_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield course_service_1.CourseService.addCourse(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully Add Course",
        data: response
    });
}));
const getAllCourses = (0, ayncError_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield course_service_1.CourseService.getAllCourses();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully Fetched Courses",
        data: response
    });
}));
exports.CourseController = {
    addCourse,
    getAllCourses
};
//# sourceMappingURL=course.controller.js.map