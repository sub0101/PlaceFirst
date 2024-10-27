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

export const ApplicantsController = {
    getApplicants
}