"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_ProfileRouter = void 0;
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../../../middlewares/Auth");
const enums_1 = require("../../../../enums");
const adminProfile_controller_1 = require("./adminProfile.controller");
const router = express_1.default.Router();
router.get("/", (0, Auth_1.isAuth)(enums_1.AuthUser.ADMIN), adminProfile_controller_1.A_ProfileController.getProfile);
// router.patch("/" , isAuth(AuthUser.STUDENT) , S_ProfileController.updateProfile)
router.get('/all', (0, Auth_1.isAuth)(enums_1.AuthUser.ADMIN), adminProfile_controller_1.A_ProfileController.getAllProfiles);
exports.A_ProfileRouter = router;
//# sourceMappingURL=adminProfile.routes.js.map