import { register } from "module"
import ApiError from "../../../Error/ApiError"
import prisma from "../../../Shared/prisma"
const isUserExist = async(user_id:string ,email:string)=>{
    console.log(user_id + email)
    const auth  = await prisma.auth.findFirst({
        where: {
            OR: [
              { user_id: user_id },
              { email: email }
            ]
          }
    })
    console.log(auth)

    if(auth!=null) throw new ApiError(401 , "Email or Student Id is Already Exist")
        console.log("user not exist")
}

export const AuthHelper = {
    isUserExist , 
    
}