"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manageStats = void 0;
const manageStats = (totalPlaced, totalStudent) => {
    const result = [];
    totalPlaced.map((item) => {
        result.push({
            id: item.id,
            departmentName: (item.name).trim(),
            shortName: getShortName((item.name).trim()),
            totalPlaced: item._count.student
        });
    });
    for (let i = 0; i < result.length; i++) {
        result[i].totalStudent = totalStudent[i]._count.student;
    }
    console.log(result);
    return result;
};
exports.manageStats = manageStats;
const getShortName = (name) => {
    const arr = name.split(' ');
    let shortName = "";
    console.log(arr);
    arr.forEach((item) => {
        var _a;
        item = item.trim();
        console.log(item);
        if (((item === null || item === void 0 ? void 0 : item.toLocaleLowerCase()) !== "of".toLocaleLowerCase()) && (item === null || item === void 0 ? void 0 : item.toLocaleLowerCase()) !== 'and'.toLocaleLowerCase())
            shortName += (_a = item[0]) === null || _a === void 0 ? void 0 : _a.toLocaleUpperCase();
    });
    // console.log(shortName)
    return shortName;
};
//# sourceMappingURL=stats.helper.js.map