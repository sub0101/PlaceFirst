import { connect } from "http2";
import prisma from "../../../../Shared/prisma";
import { number } from "zod";
import { app } from "../../../../app";
import ApiError from "../../../../Error/ApiError";
import httpStatus from "http-status";
import mongoose, { Model } from "mongoose";
import { ApplicantModel } from "../../../../config/database"
import { mailSender } from "../../../../utils/mailer";
import { successfully_applied } from "../../../../utils/mailBody";

const createApplication = async(user:any , data:any)=>{
const {id } = user
    
    const student =  await prisma.student.findUnique({where:{id:id}})

    if(!student) throw new ApiError(401 , "User Does Not Exist")
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
    mailSender(student?.email , "Application Successful!" ,await successfully_applied(student.name , student.email , ""))
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