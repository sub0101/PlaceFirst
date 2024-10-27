import express from "express"
import { StatsService } from "./stats.service"
import { isAuth } from "../../../middlewares/Auth";
import { AuthUser } from "../../../../enums";
import { StatsController } from "./stats.controller";

const router = express.Router()

router.get('/' , isAuth(AuthUser.ADMIN), StatsController.getStats)

export const StatsRouter = router;