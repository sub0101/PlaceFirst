import express from "express"
import { ApplicationController } from "./applications.controller"
import { isAuth } from "../../../middlewares/Auth"
import { AuthUser } from "../../../../enums"

const router = express.Router()

router.post("/" , isAuth(AuthUser.STUDENT , AuthUser.ADMIN), ApplicationController.createApplication)

export const ApplicationRouter = router