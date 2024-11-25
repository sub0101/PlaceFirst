import httpStatus from "http-status"
import ApiError from "../../../../Error/ApiError"
import { catchAsync } from "../../../../utils/ayncError"
import { Request , Response } from "express"
import sendResponse from "../../../../Shared/sendResponse"
import { CompanyService, updateStatus } from "./company.service"
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
    console.log("getALl")
    const response = await CompanyService.getAllApplications(req.user)
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
const getApplicationDetail = catchAsync(async(req:Request , res:Response) =>{
    const response = await CompanyService.getApplication(req.user , req.params.id)
    sendResponse<any>(res , {
        statusCode:httpStatus.OK,
        success:true,
        message:"Successfully Fetched Company Application",
        data:response
    })
})
const updateCompany = catchAsync(async(req:Request , res:Response) =>{
    const response = await CompanyService.updateCompany(req.user,req.body);
    sendResponse<any>(res , {
        statusCode:httpStatus.OK,
        success:true,
        message:"Successfully Updated Company Application",
        data:response
    })
})

const addForm = catchAsync(async(req:Request , res:Response) =>{
    // const response  = await CompanyService.addForm(req.body) ;
    // sendResponse<any>(res , {
    //     statusCode:httpStatus.OK,
    //     success:true,
    //     message:"Successfully added Company Application",
    //     data:response
    // })
})

const getForm = catchAsync(async(req:Request , res:Response) =>{
    const response  = await CompanyService.getForm() ;
    sendResponse<any>(res , {
        statusCode:httpStatus.OK,
        success:true,
        message:"Successfully added Company Application",
        data:response
    })
})
const updateCompanyStatus = catchAsync(async (req:Request , res:Response) =>{

    const response = await  CompanyService.updateStatus(req.user , req.body);
    sendResponse<any>(res , {
        statusCode:httpStatus.OK,
        success:true,
        message:"Successfully update Company Status",
        data:response
    })
})

const getApplied = catchAsync(async(req:Request , res:Response) =>{
    const response  = await CompanyService.getApplied(req.user);
    sendResponse<any>  (res , {
        statusCode:httpStatus.OK,
        success:true,
        message:"Successfully fetch Company Application",
        data:response
    })
})

export const CompanyController = {
    getAllCompanies,
    addCompany,
    getAllApplications,
    getApplicationDetail,
    updateCompany,
    addForm,
    getForm,
    updateCompanyStatus,
    getApplied
}