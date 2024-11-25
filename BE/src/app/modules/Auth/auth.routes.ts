import exp from "constants"
import express, { Router } from "express"
import { AuthController } from "./auth.controller"

const router = express.Router()

router.post('/otp' ,AuthController.sendOTP  )
router.post("/log" , AuthController.login)
router.post("/signup/student" , AuthController.signupStudent )
router.post("/signup/admin" , AuthController.signupAdmin)




export const AuthRouter = router