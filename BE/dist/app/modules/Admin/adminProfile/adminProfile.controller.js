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
exports.A_ProfileController = void 0;
const ayncError_1 = require("../../../../utils/ayncError");
const sendResponse_1 = __importDefault(require("../../../../Shared/sendResponse"));
const adminProfile_service_1 = require("./adminProfile.service");
const getProfile = (0, ayncError_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield adminProfile_service_1.A_ProfileService.getProfile(req.user);
    (0, sendResponse_1.default)(res, {
        message: "SuccessFully get details",
        success: true,
        statusCode: 201,
        data: response
    });
}));
// const updateProfile = catchAsync(async(req:Request , res:Response) =>{
//     console.log(req.body)
//     const response = await S_ProfileService.updateProfile(req.user , req.body)
//     sendResponse<any>(res , {
//         message:"SuccessFully get details",
//         success:true,
//         statusCode:201,
//         data:response
//     })
// })
const getAllProfiles = (0, ayncError_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield adminProfile_service_1.A_ProfileService.getAllProfiles();
    (0, sendResponse_1.default)(res, {
        message: "SuccessFully get all Profiles",
        success: true,
        statusCode: 201,
        data: response
    });
}));
exports.A_ProfileController = {
    getProfile,
    getAllProfiles
};
//# sourceMappingURL=adminProfile.controller.js.map