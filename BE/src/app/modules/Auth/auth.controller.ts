import { Request , Response } from "express";
import { catchAsync } from "../../../utils/ayncError";
import { AuthService } from "./auth.service";
import sendResponse from "../../../Shared/sendResponse";
import { IUserResponse } from "../../../interfaces";
import { sendOtp } from "./auth.helper";

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
const login = catchAsync( async (req:Request , res:Response) =>{
const response:IUserResponse  = await AuthService.login(req.body)
// res.cookie('token', response.token, {   httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite:'none' });

// res.cookie('aa' , 'dffdf')

 sendResponse<IUserResponse>(res , {
    statusCode:200 , 
    success: true,
    message: "sucess",
    data: response
})
    

})
const sendOTP = catchAsync(async(req:Request , res:Response) =>{
    console.log('send otp') 
    
    const response =  await sendOtp(req.body.email , req.body.enrollment)
    sendResponse<any>(res , {
        statusCode:200 , 
        success: true,
        message: "sucessfully sent otp",
        data: response
    })
})


export const AuthController = {
signupStudent,
signupAdmin,
login,
sendOTP
}