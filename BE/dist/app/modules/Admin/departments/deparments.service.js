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
exports.DepartmentService = void 0;
const prisma_1 = __importDefault(require("../../../../Shared/prisma"));
const addDeparment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const department = yield prisma_1.default.department.create({
        data: payload
    });
    return department;
});
const getAllDepartments = () => __awaiter(void 0, void 0, void 0, function* () {
    const departments = yield prisma_1.default.department.findMany();
    return departments;
});
exports.DepartmentService = {
    addDeparment,
    getAllDepartments
};
//# sourceMappingURL=deparments.service.js.map