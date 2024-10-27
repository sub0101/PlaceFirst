import httpStatus from "http-status"
import ApiError from "../../../../Error/ApiError"
import prisma from "../../../../Shared/prisma"


const getProfile = async (user:any)=>{
    console.log(user)
    const response  = await prisma.admin.findUnique({
        where:{
        id:user.id
        }
        
    })
    if(!response) throw new ApiError( httpStatus.UNAUTHORIZED , "User Does not Exist")
        return response
}
// const updateProfile = async(user:any , data:any) =>{

//     const {studentInfo , education} = data
//     console.log(user)
//     console.log(data)
//     const student = await  prisma.student.update({
//        data:studentInfo,
//         where:{
//             id:user.id
//         }
//     })
 
//     return student
// }

const getAllProfiles = async()=>{

    const response  = await prisma.admin.findMany();

    return response;
}
export const A_ProfileService = {
    getProfile,
    // updateProfile,
    getAllProfiles
}

