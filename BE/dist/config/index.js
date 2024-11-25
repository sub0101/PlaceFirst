"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envSchema = zod_1.default.object({
    PORT: zod_1.default.string().default("8000"),
    DATABASE_URL: zod_1.default.string().url(),
    JWT_SECRET: zod_1.default.string(),
    REFRESH_TOKEN_EXPIRE: zod_1.default.string(),
    ACCESS_TOKEN_EXPIRE: zod_1.default.string(),
    CLOUDINARY_NAME: zod_1.default.string(),
    CLOUDINARY_SECRET_KEY: zod_1.default.string(),
    CLOUDINARY_KEY: zod_1.default.string(),
    ACCESS_TOKEN_SECRET: zod_1.default.string(),
    DATABASEMONGO_URL: zod_1.default.string().url()
});
const env = envSchema.parse(process.env);
exports.default = env;
//# sourceMappingURL=index.js.map