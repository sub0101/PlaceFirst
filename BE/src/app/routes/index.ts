import { Router } from "express";
import express from "express"
import { AuthRouter } from "../modules/Auth/auth.routes";
import { CompanyRouter } from "../modules/Admin/Company/company.router";
import { S_ProfileRouter } from "../modules/Student/profile/profile.routes";
import { ApplicationRouter } from "../modules/Student/applications/application.routes";
import { ApplicantRouter } from "../modules/Admin/applicants/applicants.routes";
const router = express.Router()


router.use("/auth" ,AuthRouter )
router.use("/company"  , CompanyRouter)
router.use("/s_profile" , S_ProfileRouter)
router.use("/application" , ApplicationRouter)
router.use("/applicants" , ApplicantRouter)

export default router