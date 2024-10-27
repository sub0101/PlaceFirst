"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicantRouter = void 0;
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../../../middlewares/Auth");
const enums_1 = require("../../../../enums");
const applicants_controller_1 = require("./applicants.controller");
const router = express_1.default.Router();
router.get("/:id", (0, Auth_1.isAuth)(enums_1.AuthUser.ADMIN), applicants_controller_1.ApplicantsController.getApplicants);
exports.ApplicantRouter = router;
//# sourceMappingURL=applicants.routes.js.map