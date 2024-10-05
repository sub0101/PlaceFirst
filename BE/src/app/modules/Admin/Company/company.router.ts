import express from "express"
import { isAuth } from "../../../middlewares/Auth"
import { CompanyController } from "./company.controller"
import { AuthUser } from "../../../../enums"

const router = express.Router()


router.get("/" ,isAuth(AuthUser.ADMIN),  CompanyController.getAllCompanies)
router.post("/" , isAuth(AuthUser.ADMIN) , CompanyController.addCompany)

export const CompanyRouter = router