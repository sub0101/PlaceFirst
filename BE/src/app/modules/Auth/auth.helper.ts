import { register } from "module"
import ApiError from "../../../Error/ApiError"
import prisma from "../../../Shared/prisma"
const isEmailExist = async(email:string)=>{
    const student = await  prisma.student.findUnique({
        where:{
email:email        }
    })
    const admin  = await  prisma.admin.findUnique({
        where:{
email:email        }

    })
    console.log(student)
    console.log(admin)
    if(student !=null ||  admin !=null) throw new ApiError(401 , "Email is Already Exist")

}
const isEnrollmentExist = async(enrollment:string) =>{
    const user =  await prisma.student.findFirst({
        where:{
            enrollment:enrollment
        }
    })
    if(user!=null) throw new ApiError(401 , "Enrollment  Number is Already Exist")
}

const isRegistraionNumberExist = async(registeration:string) =>{
    const user =  await prisma.admin.findFirst({
        where:{
            registration_number:registeration
        }
    })
    if(user!=null) throw new ApiError(401 , "Registraion Number is Already Exist")
}

export const AuthHelper = {
    isEmailExist , 
    isEnrollmentExist,
    isRegistraionNumberExist
}