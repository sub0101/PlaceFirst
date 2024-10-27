"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post("/signup/student", auth_controller_1.AuthController.signupStudent);
router.post("/signup/admin", auth_controller_1.AuthController.signupAdmin);
router.post("/login", auth_controller_1.AuthController.login);
exports.AuthRouter = router;
//# sourceMappingURL=auth.routes.js.map