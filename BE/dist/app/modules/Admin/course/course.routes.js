"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRouter = void 0;
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../../../middlewares/Auth");
const enums_1 = require("../../../../enums");
const course_controller_1 = require("./course.controller");
const router = express_1.default.Router();
router.post('/', (0, Auth_1.isAuth)(enums_1.AuthUser.ADMIN), course_controller_1.CourseController.addCourse);
router.get('/', course_controller_1.CourseController.getAllCourses);
exports.CourseRouter = router;
//# sourceMappingURL=course.routes.js.map