import { Router } from "express";
import express from "express"
import { AuthRouter } from "../modules/Auth/auth.routes";
const router = express.Router()


router.use("/auth" ,AuthRouter )

export default router