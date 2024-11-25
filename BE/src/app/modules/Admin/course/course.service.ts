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

const deleteCourse = async(user:any , id:number) =>{

    const response  = await prisma.course.delete({where:{id:id}})
    return response
}


export const CourseService = {
    addCourse,
    getAllCourses,
    deleteCourse
}