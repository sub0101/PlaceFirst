import express from "express"
import { isAuth } from "../../../middlewares/Auth"
import { AuthUser } from "../../../../enums"
import { ApplicantsController } from "./applicants.controller"

const router = express.Router()

router.get("/:id" , isAuth(AuthUser.ADMIN) , ApplicantsController.getApplicants)


export const ApplicantRouter = router