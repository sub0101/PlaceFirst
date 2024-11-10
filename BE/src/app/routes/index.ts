import { Router } from "express";
import express from "express"
import { AuthRouter } from "../modules/Auth/auth.routes";
import { CompanyRouter } from "../modules/Admin/Company/company.router";
import { S_ProfileRouter } from "../modules/Student/profile/profile.routes";
import { ApplicationRouter } from "../modules/Student/applications/application.routes";
import { ApplicantRouter } from "../modules/Admin/applicants/applicants.routes";
import { DepartmentRouter } from "../modules/Admin/departments/department.routes";
import { A_ProfileRouter } from "../modules/Admin/adminProfile/adminProfile.routes";
import { CourseRouter } from "../modules/Admin/course/course.routes";
import { StatsRouter } from "../modules/Admin/statistics/stats.routes";
const router = express.Router()


router.use("/auth" ,AuthRouter )
router.use("/company"  , CompanyRouter)
router.use("/s_profile" , S_ProfileRouter)
router.use('/a_profile' , A_ProfileRouter)
router.use("/application" , ApplicationRouter)
router.use("/applicants" , ApplicantRouter)
router.use('/department' , DepartmentRouter)
router.use('/course' , CourseRouter)
router.use('/stats'  ,StatsRouter)
router.use('/form' , CompanyRouter)

export default router