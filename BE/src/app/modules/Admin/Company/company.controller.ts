import httpStatus from "http-status"
import ApiError from "../../../../Error/ApiError"
import { catchAsync } from "../../../../utils/ayncError"
import { Request , Response } from "express"
import sendResponse from "../../../../Shared/sendResponse"
import { CompanyService } from "./company.service"
import { Company, CompanyApplication } from "@prisma/client"

const getAllCompanies= catchAsync(async (req , res) =>{

    const response:Company[] = await CompanyService.getAllCompanies(req.user)
 
    return sendResponse<Company[]> ( res , {
        statusCode:200 , 
        success: true,
        message: "sucess",
        data: response
    })

})

const getAllApplications = catchAsync(async(req:Request , res:Response) =>{
    const response = await CompanyService.getAllApplications()
    sendResponse<any>(res , {
        statusCode:httpStatus.OK,
        success:true,
        message:"Successfully Fetched Company Application",
        data:response
    })
})
const addCompany= catchAsync(async (req , res) =>{

    const response:any = await CompanyService.addCompany( req.user , req.body)
    
    return sendResponse<any> ( res , {
        statusCode:200 , 
        success: true,
        message: "sucess",
        data: response
    })

})


export const CompanyController = {
    getAllCompanies,
    addCompany,
    getAllApplications
}