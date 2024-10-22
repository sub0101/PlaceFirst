import httpStatus from "http-status";
import sendResponse from "../../../../Shared/sendResponse";
import { catchAsync } from "../../../../utils/ayncError";
import { ApplicationService } from "./application.service";

const createApplication  = catchAsync(async(req ,res) =>{

    const response = await ApplicationService.createApplication(req.user , req.body)
    return sendResponse<any>(res , {
        message:"successfully created",
        statusCode:httpStatus.OK,
        success:true,
        data:response

    })
})

export const ApplicationController = {
    createApplication
}