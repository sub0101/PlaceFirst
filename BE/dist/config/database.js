"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomFormModel = exports.ApplicantModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const formSchema = new mongoose_1.default.Schema({
    companyApplicationId: { type: String, require: true, unique: true },
    fields: [{
            label: { type: String, require: false }, // Ensure each field has a label
            type: { type: String, required: false }, // Ensure each field has a type
            required: { type: Boolean, default: false }, // Default to false
            options: { type: [String], default: [], require: false } // Default to an empty array
        }]
}, { strict: false });
const ApplicantSchema = new mongoose_1.default.Schema({
    companyApplicationId: { type: String, require: true },
    status: { type: String, default: "applied" }
}, { strict: false });
exports.ApplicantModel = mongoose_1.default.model("applicantSchema", ApplicantSchema);
exports.CustomFormModel = mongoose_1.default.model('CustomForm', formSchema);
//# sourceMappingURL=database.js.map