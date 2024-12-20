import { catchAsync } from "../../../../utils/ayncError";
import { Request , Response } from "express";
import { ApplicantService } from "./applicants.service";
import sendResponse from "../../../../Shared/sendResponse";
const getApplicants = catchAsync(async(req:Request , res:Response) =>{

    const params:string = req.params.id;

    const response = await ApplicantService.getApplicants(req.body , params)
    sendResponse<any>(res ,{
        message:"Successfully feched Applicants",
        success:true,
        statusCode:200,
        data:response
    })
})
const updateApplicant = catchAsync(async(req:Request , res:Response) =>{

    // const params:string = req.params.id;

    const response = await ApplicantService.updateApplicant(req.body , req.body)
    sendResponse<any>(res ,{
        message:"Successfully feched Applicants",
        success:true,
        statusCode:200,
        data:response
    })
})
const updateStatus = catchAsync(async(req:Request , res:Response) =>{
    const response   = await ApplicantService.updateStatus(req.user , req.body);
    sendResponse<any>(res ,{
        message:"Successfully feched Applicants",
        success:true,
        statusCode:200,
        data:response
    })

}) 

export const ApplicantsController = {
    getApplicants,
    updateApplicant,
    updateStatus
}