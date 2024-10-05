import { Request , Response ,NextFunction  } from "express"
import ApiError from "../../Error/ApiError"
import { verifyToken } from "../../utils/jwt"
import env from "../../config"
import { JwtPayload } from "jsonwebtoken"
import { string } from "zod"


const AppRole = ["Student" , "Admin"]
export const isAuth = (...roles :string[])=> async (req:Request , res:Response , next:NextFunction)=>{


console.log(roles)

const token  = req.headers["authorization"]?.split("Bearer ")[1];
if(token) console.log(token)
    else throw new ApiError(404 , "Token Not Found")

const user:JwtPayload = await verifyToken(token);
console.log(user)
if(!user) throw new ApiError(401 , "Invalid Token")
const role:string = user.role
console.log(role)
if(!roles.includes((role.toLowerCase()))) throw new ApiError(401 , "your are not authorized") 
req.user = {id:user.id , role:user?.role}
console.log("authenticated succes")
next();
    
}