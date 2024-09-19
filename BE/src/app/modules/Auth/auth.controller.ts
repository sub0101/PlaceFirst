import { Request , Response } from "express";
import { catchAsync } from "../../../utils/ayncError";
import { AuthService } from "./auth.service";
import sendResponse from "../../../Shared/sendResponse";

const signupStudent = catchAsync( async (req:Request , res:Response) => {

    const response =  await AuthService.signupStudent(req.body)
    return sendResponse<any> ( res , {
        statusCode:200 , 
        success: true,
        message: "sucess",
        data: response
    })


})
const signupAdmin = catchAsync( async (req :Request , res:Response) =>{
    const response = await AuthService.signupAdmin(req.body) 
    return sendResponse<any> ( res , {
        statusCode:200 , 
        success: true,
        message: "sucess",
        data: response
    })


})
const login = catchAsync((req:Request , res:Response) =>{

})


export const AuthController = {
signupStudent,
signupAdmin,
login
}