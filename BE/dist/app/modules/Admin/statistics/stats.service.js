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
exports.StatsService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../../Shared/prisma"));
const stats_helper_1 = require("./stats.helper");
const getStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalStudent = yield prisma_1.default.department.findMany({
        select: {
            name: true,
            _count: true,
        },
    });
    const totalPlaced = yield prisma_1.default.department.findMany({
        include: {
            _count: {
                select: {
                    student: {
                        where: {
                            // status: true
                            placementStatus: {
                                not: client_1.Prisma.JsonNullValueFilter.JsonNull,
                            }
                        }
                    }
                }
            }
        }
    });
    console.log(totalPlaced);
    console.log(totalStudent);
    return (0, stats_helper_1.manageStats)(totalPlaced, totalStudent);
    //  return {totalPlaced , totalStudent}
});
exports.StatsService = {
    getStats,
};
//# sourceMappingURL=stats.service.js.map