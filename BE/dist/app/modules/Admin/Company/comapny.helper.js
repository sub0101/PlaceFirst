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
exports.canApply = exports.getApplicants = void 0;
const database_1 = require("../../../../config/database");
const prisma_1 = __importDefault(require("../../../../Shared/prisma"));
const getApplicants = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield database_1.ApplicantModel.find({ companyApplicationId: id }).select("studentId");
    console.log(response);
    return response;
});
exports.getApplicants = getApplicants;
const canApply = (id, tier, applicants) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(tier);
    const student = yield prisma_1.default.student.findUnique({ where: { id: id } });
    const placementStatus = (student === null || student === void 0 ? void 0 : student.placementStatus) || [];
    const canApply = !(placementStatus === null || placementStatus === void 0 ? void 0 : placementStatus.some((item) => {
        if (tier == item.tier)
            return true;
        if (item.tier === "DREAM") {
            return true;
        }
        if (item.tier === "STANDARD" && tier == "NORMAL")
            return true;
        return false;
    }));
    const isExist = applicants && !applicants.some((val) => val.studentId === id);
    console.log(canApply && isExist);
    return canApply && isExist;
});
exports.canApply = canApply;
[{ "status": "offered", "company": "Amazon", "position": "SDE-1", "tier": "DREAM" }];
//# sourceMappingURL=comapny.helper.js.map