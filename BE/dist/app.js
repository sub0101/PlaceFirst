"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importStar(require("express"));
const ApiError_1 = __importDefault(require("./Error/ApiError"));
const routes_1 = __importDefault(require("./app/routes"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({ origin: ["http://localhost:5173", 'https://place-first.vercel.app'],
    optionsSuccessStatus: 200,
    preflightContinue: false,
    methods: "GET,POST,OPTIONS,PATCH,DELETE",
    credentials: true }));
exports.app.use(express_1.default.json());
exports.app.use((0, express_1.urlencoded)({ extended: true }));
exports.app.use("/api/v1", routes_1.default);
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((err, req, res, next) => {
    console.log("error detections");
    if (err instanceof ApiError_1.default) {
        console.log(err);
        return res.status(err.statusCode).json({ success: false, message: err.message });
    }
    else {
        console.log(err);
        return res.status(500).json({ success: false, message: "something went Wrong" });
    }
});
mongoose_1.default.connect(config_1.default.DATABASEMONGO_URL).then(() => console.log("mongo db conected"));
//# sourceMappingURL=app.js.map