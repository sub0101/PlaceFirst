import { Router } from "express";
import express from "express"
import { AuthRouter } from "../modules/Auth/auth.routes";
import { CompanyRouter } from "../modules/Admin/Company/company.router";
const router = express.Router()


router.use("/auth" ,AuthRouter )
router.use("/company"  , CompanyRouter)

export default router