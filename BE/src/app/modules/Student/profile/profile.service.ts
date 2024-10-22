import httpStatus from "http-status"
import ApiError from "../../../../Error/ApiError"
import prisma from "../../../../Shared/prisma"


const getProfile = async (user:any)=>{
    console.log(user)
    const student = await prisma.student.findUnique({
        where:{
        studentId:user.id
        },
        include:{
            education:true
        }
        
    })
    if(!student) throw new ApiError( httpStatus.UNAUTHORIZED , "User Does not Exist")
        return student
}
const updateProfile = async(user:any , data:any) =>{
    // console.log(user)
    const {studentInfo , education} = data
    console.log(user)
    console.log(data)
    const student = await  prisma.student.update({
       data:studentInfo,
        where:{
            studentId:user.id
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
export const S_ProfileService = {
    getProfile,
    updateProfile
}

