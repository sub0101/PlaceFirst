import { connect } from "http2";
import prisma from "../../../../Shared/prisma";
import { number } from "zod";
import { app } from "../../../../app";
import ApiError from "../../../../Error/ApiError";
import httpStatus from "http-status";
import mongoose, { Model } from "mongoose";
import { ApplicantSchema } from "../../../../config/database";

const createApplication = async(user:any , data:any)=>{

    // const application = null
    
    const ApplicantModel:Model<any> = mongoose.model('applicantSchema'  , ApplicantSchema)
    const isApplicationExist = await ApplicantModel.findOne({
        studentId:data.studentId,
        companyApplicationId :data.companyApplicationId
    })
    console.log(isApplicationExist)
    if(isApplicationExist) throw new ApiError(401 , "Application Already Exist")

    const respone = await ApplicantModel.create({
        ...data
    })
    console.log(respone)
    return respone;
    // const {cgpa , backlog,precentage,studentId , companyId } = data
    // const isExist = await prisma.applicant.findFirst({
    //     where:{
    //         studentId:studentId,
    //         companyApplicationId:companyId,
    //     }
    // })
    // if(isExist) {
    //     throw new ApiError(409 , "Application Already Exist")
    // }
    // const application =  await prisma.applicant.create( {
    //    data:{
    //     cgpa: parseInt(cgpa),
    //     backlog:backlog,
    //     precentage:precentage,
    //     Student:{
    //         connect:{id:studentId}      
    //     },
    //     CompanyApplication:{
    //         connect:{id:companyId}
    //     }
    //    }
    // })
    // console.log(application)
    // return application
}

export const ApplicationService = {
    createApplication
}