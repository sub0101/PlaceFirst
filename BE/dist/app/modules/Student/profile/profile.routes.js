"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S_ProfileRouter = void 0;
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../../../middlewares/Auth");
const enums_1 = require("../../../../enums");
const profile_controller_1 = require("./profile.controller");
const router = express_1.default.Router();
router.get("/", (0, Auth_1.isAuth)(enums_1.AuthUser.STUDENT), profile_controller_1.S_ProfileController.getProfile);
router.patch("/", (0, Auth_1.isAuth)(enums_1.AuthUser.STUDENT), profile_controller_1.S_ProfileController.updateProfile);
router.get('/all', (0, Auth_1.isAuth)(enums_1.AuthUser.ADMIN), profile_controller_1.S_ProfileController.getAllProfiles);
exports.S_ProfileRouter = router;
//# sourceMappingURL=profile.routes.js.map