"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/Auth/auth.routes");
const company_router_1 = require("../modules/Admin/Company/company.router");
const profile_routes_1 = require("../modules/Student/profile/profile.routes");
const application_routes_1 = require("../modules/Student/applications/application.routes");
const applicants_routes_1 = require("../modules/Admin/applicants/applicants.routes");
const department_routes_1 = require("../modules/Admin/departments/department.routes");
const adminProfile_routes_1 = require("../modules/Admin/adminProfile/adminProfile.routes");
const course_routes_1 = require("../modules/Admin/course/course.routes");
const stats_routes_1 = require("../modules/Admin/statistics/stats.routes");
const router = express_1.default.Router();
router.use("/auth", auth_routes_1.AuthRouter);
router.use("/company", company_router_1.CompanyRouter);
router.use("/s_profile", profile_routes_1.S_ProfileRouter);
router.use('/a_profile', adminProfile_routes_1.A_ProfileRouter);
router.use("/application", application_routes_1.ApplicationRouter);
router.use("/applicants", applicants_routes_1.ApplicantRouter);
router.use('/department', department_routes_1.DepartmentRouter);
router.use('/course', course_routes_1.CourseRouter);
router.use('/stats', stats_routes_1.StatsRouter);
exports.default = router;
//# sourceMappingURL=index.js.map