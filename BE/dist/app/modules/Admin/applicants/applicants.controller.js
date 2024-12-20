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
exports.ApplicantsController = void 0;
const ayncError_1 = require("../../../../utils/ayncError");
const applicants_service_1 = require("./applicants.service");
const sendResponse_1 = __importDefault(require("../../../../Shared/sendResponse"));
const getApplicants = (0, ayncError_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params.id;
    const response = yield applicants_service_1.ApplicantService.getApplicants(req.body, params);
    (0, sendResponse_1.default)(res, {
        message: "Successfully feched Applicants",
        success: true,
        statusCode: 200,
        data: response
    });
}));
const updateApplicant = (0, ayncError_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const params:string = req.params.id;
    const response = yield applicants_service_1.ApplicantService.updateApplicant(req.body, req.body);
    (0, sendResponse_1.default)(res, {
        message: "Successfully feched Applicants",
        success: true,
        statusCode: 200,
        data: response
    });
}));
const updateStatus = (0, ayncError_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield applicants_service_1.ApplicantService.updateStatus(req.user, req.body);
    (0, sendResponse_1.default)(res, {
        message: "Successfully feched Applicants",
        success: true,
        statusCode: 200,
        data: response
    });
}));
exports.ApplicantsController = {
    getApplicants,
    updateApplicant,
    updateStatus
};
//# sourceMappingURL=applicants.controller.js.map