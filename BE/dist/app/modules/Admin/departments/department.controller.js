"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentController = void 0;
const ayncError_1 = require("../../../../utils/ayncError");
const deparments_service_1 = require("./deparments.service");
const sendResponse_1 = __importDefault(require("../../../../Shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const addDeparment = (0, ayncError_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield deparments_service_1.DepartmentService.addDeparment(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully Fetched Company Application",
        data: response
    });
}));
const getAllDepartments = (0, ayncError_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield deparments_service_1.DepartmentService.getAllDepartments();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully Fetched Company Application",
        data: response
    });
}));
const deleteDepartment = (0, ayncError_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield deparments_service_1.DepartmentService.deleteDepartment(req.user, Number(req.params.id));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully deleted Department",
        data: response
    });
}));
exports.DepartmentController = {
    addDeparment,
    getAllDepartments,
    deleteDepartment
};
//# sourceMappingURL=department.controller.js.map