import mongoose, { Model } from "mongoose"
import prisma from "../../../../Shared/prisma"
import { ApplicantSchema, formSchema } from "../../../../config/database"

const getApplicants = async(user:any  , id:string)=>{
    console.log("get applicants")
    console.log(id)
   
const ApplicantModel:Model<any> = mongoose.model("applicantSchema" ,ApplicantSchema)
const response = await ApplicantModel.find({
    companyApplicationId:id
    // Enrollment:"22MCA021"
})
console.log(response)
return response
// return response
    // const applicants = await prisma.applicant.findMany({
    //     where:{
    //         companyApplicationId:id
    //     },
    //     include:{
    //         Student:{
    //             include:{
    //              department:true   ,
    //              course:true
    //             }
    //         }

    //     }
    // })
    // console.log(applicants)
    // return applicants;
}
const updateApplicant = async(user:any , payload:any) =>{
    const{id , ...data} = payload
    const response = await prisma.applicant.update({
        where:{
            id:id
        },
        data:data
    })
    return response;
}

export  const ApplicantService = {
    getApplicants,
    updateApplicant
}