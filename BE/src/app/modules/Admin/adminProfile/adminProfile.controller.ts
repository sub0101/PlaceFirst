import { get } from "http";
import { catchAsync } from "../../../../utils/ayncError";
import { Request ,Response } from "express";
import sendResponse from "../../../../Shared/sendResponse";
import { A_ProfileService } from "./adminProfile.service";
const getProfile = catchAsync( async( req:Request  ,res:Response) =>{
    const response = await A_ProfileService.getProfile(req.user)
    sendResponse<any>(res , {
        message:"SuccessFully get details",
        success:true,
        statusCode:201,
        data:response
    })

})

// const updateProfile = catchAsync(async(req:Request , res:Response) =>{
//     console.log(req.body)
//     const response = await S_ProfileService.updateProfile(req.user , req.body)
//     sendResponse<any>(res , {
//         message:"SuccessFully get details",
//         success:true,
//         statusCode:201,
//         data:response
//     })

// })

const getAllProfiles = catchAsync(async(req:Request , res:Response) =>{
    const response= await  A_ProfileService.getAllProfiles();
    sendResponse<any>(res , {
        message:"SuccessFully get all Profiles",
        success:true,
        statusCode:201,
        data:response
    })
})
export const A_ProfileController = {
    getProfile,
    getAllProfiles
}