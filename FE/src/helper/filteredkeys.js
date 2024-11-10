const keysToDelete = ["departmentId", "courseId" , 'image' ,  'appliedAt' ,'deleteAt' ,'Student' ,'id','studentId','companyApplicationId','StudentId' ,'_id'];


export const filterKeys =(students)=> {
const updatedStudents = students.map(student => {
    keysToDelete.forEach(key => delete student[key]);
    return student;
});
return updatedStudents;
}