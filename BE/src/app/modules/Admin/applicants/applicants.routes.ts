import express from "express"
import { isAuth } from "../../../middlewares/Auth"
import { AuthUser } from "../../../../enums"
import { ApplicantsController } from "./applicants.controller"

const router = express.Router()

router.get("/:id" , isAuth(AuthUser.ADMIN) , ApplicantsController.getApplicants)
router.patch("/" , isAuth(AuthUser.ADMIN) , ApplicantsController.updateApplicant)


export const ApplicantRouter = router