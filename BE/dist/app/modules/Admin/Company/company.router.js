"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRouter = void 0;
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../../../middlewares/Auth");
const company_controller_1 = require("./company.controller");
const enums_1 = require("../../../../enums");
const router = express_1.default.Router();
router.get("/", (0, Auth_1.isAuth)(enums_1.AuthUser.ADMIN), company_controller_1.CompanyController.getAllCompanies);
router.get("/applications", (0, Auth_1.isAuth)(enums_1.AuthUser.STUDENT), company_controller_1.CompanyController.getAllApplications);
router.get('/:id', (0, Auth_1.isAuth)(enums_1.AuthUser.ADMIN, enums_1.AuthUser.STUDENT), company_controller_1.CompanyController.getApplicationDetail);
router.post("/", (0, Auth_1.isAuth)(enums_1.AuthUser.ADMIN), company_controller_1.CompanyController.addCompany);
exports.CompanyRouter = router;
//# sourceMappingURL=company.router.js.map