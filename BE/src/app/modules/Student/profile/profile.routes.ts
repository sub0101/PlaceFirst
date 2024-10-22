import express from "express"
import { isAuth } from "../../../middlewares/Auth"
import { AuthUser } from "../../../../enums"
import { S_ProfileController } from "./profile.controller"

const router = express.Router()


router.get("/" ,isAuth(AuthUser.STUDENT) , S_ProfileController.getProfile)
router.patch("/" , isAuth(AuthUser.STUDENT) , S_ProfileController.updateProfile)

export const S_ProfileRouter = router;