import express from "express"
import { isAuth } from "../../../middlewares/Auth"
import { CompanyController } from "./company.controller"
import { AuthUser } from "../../../../enums"

const router = express.Router()


router.get("/" ,isAuth(AuthUser.ADMIN),  CompanyController.getAllCompanies)
router.get("/applications" ,isAuth(AuthUser.STUDENT) , CompanyController.getAllApplications)
router.get('/:id' , isAuth(AuthUser.ADMIN , AuthUser.STUDENT) , CompanyController.getApplicationDetail)
router.post("/" , isAuth(AuthUser.ADMIN) , CompanyController.addCompany)
router.patch('/' , isAuth(AuthUser.ADMIN) ,CompanyController.updateCompany)


export const CompanyRouter = router