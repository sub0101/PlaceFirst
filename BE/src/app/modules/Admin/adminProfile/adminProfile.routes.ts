import express from "express"
import { isAuth } from "../../../middlewares/Auth"
import { AuthUser } from "../../../../enums"
import { A_ProfileController } from "./adminProfile.controller"
const router = express.Router()


router.get("/" ,isAuth(AuthUser.ADMIN) , A_ProfileController.getProfile)
// router.patch("/" , isAuth(AuthUser.STUDENT) , S_ProfileController.updateProfile)
router.get( '/all' , isAuth(AuthUser.ADMIN) , A_ProfileController.getAllProfiles );

export const A_ProfileRouter = router;