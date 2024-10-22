import { get } from "http";
import { catchAsync } from "../../../../utils/ayncError";
import { Request ,Response } from "express";
import { S_ProfileService } from "./profile.service";
import sendResponse from "../../../../Shared/sendResponse";

const getProfile = catchAsync( async( req:Request  ,res:Response) =>{
    const response = await S_ProfileService.getProfile(req.user)
    sendResponse<any>(res , {
        message:"SuccessFully get details",
        success:true,
        statusCode:201,
        data:response
    })

})

const updateProfile = catchAsync(async(req:Request , res:Response) =>{
    console.log(req.body)
    const response = await S_ProfileService.updateProfile(req.user , req.body)
    sendResponse<any>(res , {
        message:"SuccessFully get details",
        success:true,
        statusCode:201,
        data:response
    })

})

export const S_ProfileController = {
    getProfile,
    updateProfile
}