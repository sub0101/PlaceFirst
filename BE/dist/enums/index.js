"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Department = exports.AuthUser = void 0;
var USER_ROLES;
(function (USER_ROLES) {
    USER_ROLES[USER_ROLES["ADMIN"] = 0] = "ADMIN";
    USER_ROLES[USER_ROLES["STUDENT"] = 1] = "STUDENT";
})(USER_ROLES || (USER_ROLES = {}));
var AuthUser;
(function (AuthUser) {
    AuthUser["ADMIN"] = "admin";
    AuthUser["STUDENT"] = "student";
})(AuthUser || (exports.AuthUser = AuthUser = {}));
var Department;
(function (Department) {
    Department["CSE"] = "Computer Science & Engineering";
    Department["ECE"] = "Electronics & Communication Engineering";
    Department["EE"] = "Electrical Engineering";
    Department["ME"] = "Mechanical Engineering";
    Department["CE"] = "Civil Engineering";
    Department["CHE"] = "Chemical Engineering";
    Department["IT"] = "Information Technology";
    Department["AE"] = "Aerospace Engineering";
    Department["BT"] = "Biotechnology Engineering";
})(Department || (exports.Department = Department = {}));
//# sourceMappingURL=index.js.map