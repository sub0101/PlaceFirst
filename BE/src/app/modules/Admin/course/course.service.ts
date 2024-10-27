import prisma from "../../../../Shared/prisma"

const addCourse = async(payload:any)=>{
    const course =  await prisma.course.create({
        data:payload
    }) 
    return course;

}

const getAllCourses = async() =>{
    const courses= await prisma.course.findMany();
    return courses
}

export const CourseService = {
    addCourse,
    getAllCourses
}