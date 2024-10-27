import httpStatus from "http-status"
import ApiError from "../../../../Error/ApiError"
import prisma from "../../../../Shared/prisma"


const getProfile = async (user:any)=>{
    console.log(user)
    const student = await prisma.student.findUnique({
        where:{
        id:user.id
        },
        include:{
            education:true,
            department:true,
            course:true
        }
        
    })
    if(!student) throw new ApiError( httpStatus.UNAUTHORIZED , "User Does not Exist")
        return student
}
const updateProfile = async(user:any , data:any) =>{
    // console.log(user)
    const {studentInfo , education} = data
    const {departmentId ,department, courseId, course , ...updateData } = studentInfo
    console.log(updateData)
    const student = await  prisma.student.update({
       data:{
        ...updateData,
        departmentId:departmentId,
        courseId:courseId
       },
        where:{
            id:user.id
        }
    })
    // await prisma.education.create({
    //     data: {
    //         degree: 'Bachelor of Science',
    //         institution: 'University X',
    //         year:"1022",
    //         currentEducation:false,
    //         student: {
    //           connect: { id: student.id }, 
    //         },
    //       }
    // })
    // if(education.length > 0) {
    //     console.log(education)
    //     await prisma.student.crea({
    //         where:{
    //             studentId:user.id
    //         },
    //         data:{
    //            education:education
    //         }
    //     })
    // }
    return student
}

const getAllProfiles = async()=>{

    const response  = await prisma.student.findMany({
        include:{
            department:true,
            course:true
        }
    });

    return response;
}
export const S_ProfileService = {
    getProfile,
    updateProfile,
    getAllProfiles
}

