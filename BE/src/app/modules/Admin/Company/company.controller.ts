import httpStatus from "http-status"
import ApiError from "../../../../Error/ApiError"
import { catchAsync } from "../../../../utils/ayncError"
import { Request , Response } from "express"
import sendResponse from "../../../../Shared/sendResponse"
import { CompanyService } from "./company.service"
import { CompanyApplication } from "@prisma/client"

const getAllCompanies= catchAsync(async (req , res) =>{

})

const addCompany= catchAsync(async (req , res) =>{
    console.log("in addd")
const user  = req.user
console.log(user)
    const response:any = await CompanyService.addCompany( user , req.body)
    return sendResponse<any> ( res , {
        statusCode:200 , 
        success: true,
        message: "sucess",
        data: response
    })

})


export const CompanyController = {
    getAllCompanies,
    addCompany
}