"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentRouter = void 0;
const express_1 = __importDefault(require("express"));
const department_controller_1 = require("./department.controller");
const Auth_1 = require("../../../middlewares/Auth");
const enums_1 = require("../../../../enums");
const router = express_1.default.Router();
router.post('/', (0, Auth_1.isAuth)(enums_1.AuthUser.ADMIN), department_controller_1.DepartmentController.addDeparment);
router.get('/', department_controller_1.DepartmentController.getAllDepartments);
exports.DepartmentRouter = router;
//# sourceMappingURL=department.routes.js.map