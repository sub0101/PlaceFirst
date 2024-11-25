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
exports.CompanyController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ayncError_1 = require("../../../../utils/ayncError");
const sendResponse_1 = __importDefault(require("../../../../Shared/sendResponse"));
const company_service_1 = require("./company.service");
const getAllCompanies = (0, ayncError_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield company_service_1.CompanyService.getAllCompanies(req.user);
    return (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "sucess",
        data: response
    });
}));
const getAllApplications = (0, ayncError_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getALl");
    const response = yield company_service_1.CompanyService.getAllApplications(req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully Fetched Company Application",
        data: response
    });
}));
const addCompany = (0, ayncError_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield company_service_1.CompanyService.addCompany(req.user, req.body);
    return (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "sucess",
        data: response
    });
}));
const getApplicationDetail = (0, ayncError_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield company_service_1.CompanyService.getApplication(req.user, req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully Fetched Company Application",
        data: response
    });
}));
const updateCompany = (0, ayncError_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield company_service_1.CompanyService.updateCompany(req.user, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully Updated Company Application",
        data: response
    });
}));
const addForm = (0, ayncError_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const response  = await CompanyService.addForm(req.body) ;
    // sendResponse<any>(res , {
    //     statusCode:httpStatus.OK,
    //     success:true,
    //     message:"Successfully added Company Application",
    //     data:response
    // })
}));
const getForm = (0, ayncError_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield company_service_1.CompanyService.getForm();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully added Company Application",
        data: response
    });
}));
const updateCompanyStatus = (0, ayncError_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield company_service_1.CompanyService.updateStatus(req.user, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully update Company Status",
        data: response
    });
}));
const getApplied = (0, ayncError_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield company_service_1.CompanyService.getApplied(req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully fetch Company Application",
        data: response
    });
}));
exports.CompanyController = {
    getAllCompanies,
    addCompany,
    getAllApplications,
    getApplicationDetail,
    updateCompany,
    addForm,
    getForm,
    updateCompanyStatus,
    getApplied
};
//# sourceMappingURL=company.controller.js.map