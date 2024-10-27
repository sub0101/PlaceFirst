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
exports.StatsController = void 0;
const ayncError_1 = require("../../../../utils/ayncError");
const stats_service_1 = require("./stats.service");
const sendResponse_1 = __importDefault(require("../../../../Shared/sendResponse"));
const getStats = (0, ayncError_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield stats_service_1.StatsService.getStats();
    return (0, sendResponse_1.default)(res, {
        message: "successfully fetched the stats",
        success: true,
        statusCode: 200,
        data: response
    });
}));
exports.StatsController = {
    getStats
};
//# sourceMappingURL=stats.controller.js.map