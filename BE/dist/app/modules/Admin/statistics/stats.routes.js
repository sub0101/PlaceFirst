"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsRouter = void 0;
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../../../middlewares/Auth");
const enums_1 = require("../../../../enums");
const stats_controller_1 = require("./stats.controller");
const router = express_1.default.Router();
router.get('/', (0, Auth_1.isAuth)(enums_1.AuthUser.ADMIN), stats_controller_1.StatsController.getStats);
exports.StatsRouter = router;
//# sourceMappingURL=stats.routes.js.map