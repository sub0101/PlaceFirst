import express from "express"
import { isAuth } from "../../../middlewares/Auth"
import { AuthUser } from "../../../../enums"
import { S_ProfileController } from "./profile.controller"

const router = express.Router()


router.get("/" ,isAuth(AuthUser.STUDENT) , S_ProfileController.getProfile)
router.patch("/" , isAuth(AuthUser.STUDENT) , S_ProfileController.updateProfile)
router.get( '/all' , isAuth(AuthUser.ADMIN) , S_ProfileController.getAllProfiles );
router.get('/info/:id' ,isAuth(AuthUser.ADMIN) ,S_ProfileController.getStudentInfo);

export const S_ProfileRouter = router;