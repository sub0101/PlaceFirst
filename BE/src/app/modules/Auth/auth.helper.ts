import { register } from "module"
import ApiError from "../../../Error/ApiError"
import prisma from "../../../Shared/prisma"
const isUserExist = async(user_id:string ,email:string)=>{
    const auth  = await prisma.auth.findUnique({
        where:{
            user_id:user_id,
            email:email
        }
    })
    console.log(auth)
    if(auth!=null) throw new ApiError(401 , "Email is Already Exist")

}

export const AuthHelper = {
    isUserExist , 
    
}