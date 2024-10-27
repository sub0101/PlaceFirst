"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manageStats = void 0;
const manageStats = (totalPlaced, totalStudent) => {
    const result = [];
    totalPlaced.map((item) => {
        result.push({
            id: item.id,
            departmentName: item.name,
            shortName: getShortName(item.name),
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
    arr.forEach((item) => {
        if ((item.toLocaleLowerCase() !== "of".toLocaleLowerCase()) && item.toLocaleLowerCase() !== 'and'.toLocaleLowerCase())
            shortName += item[0].toLocaleUpperCase();
    });
    // console.log(shortName)
    return shortName;
};
//# sourceMappingURL=stats.helper.js.map