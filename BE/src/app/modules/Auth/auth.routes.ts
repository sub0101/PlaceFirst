import exp from "constants"
import express, { Router } from "express"
import { AuthController } from "./auth.controller"

const router = express.Router()

router.post("/signup/student" , AuthController.signupStudent )
router.post("/signup/admin" , AuthController.signupAdmin)
router.post("/login" , AuthController.login)



export const AuthRouter = router