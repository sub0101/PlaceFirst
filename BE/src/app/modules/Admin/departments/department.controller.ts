import { Department } from "../../../../enums";
import { catchAsync } from "../../../../utils/ayncError";
import { DepartmentService } from "./deparments.service";
import { Request,Response } from "express";
import sendResponse from "../../../../Shared/sendResponse";
import httpStatus from "http-status";
const addDeparment = catchAsync(async(req:Request, res:Response)=>{
    const response = await DepartmentService.addDeparment(req.body)
    sendResponse<any>(res , {
        statusCode:httpStatus.OK,
        success:true,
        message:"Successfully Fetched Company Application",
        data:response
    })
})
const getAllDepartments = catchAsync(async(req:Request , res:Response) =>{
    const response = await DepartmentService.getAllDepartments()
    sendResponse<any []>(res , {
        statusCode:httpStatus.OK,
        success:true,
        message:"Successfully Fetched Company Application",
        data:response
    })
})


export const DepartmentController ={
    addDeparment,
    getAllDepartments
}