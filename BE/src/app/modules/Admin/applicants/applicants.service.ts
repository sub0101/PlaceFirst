import mongoose, { Model } from "mongoose"
import prisma from "../../../../Shared/prisma"
import { ApplicantModel} from "../../../../config/database"
import { app } from "src/app"
import ApiError from "../../../../Error/ApiError"

const getApplicants = async(user:any  , id:string)=>{
    console.log("get applicants")
    console.log(id)
   

const response = await ApplicantModel.find({
    companyApplicationId:id
})
return response

}
// const updateApplicant = async(user:any , payload:any) =>{
//     const{id , ...data} = payload
//     const response = await prisma.applicant.update({
//         where:{
//             id:id
//         },
//         data:data
//     })
//     return response;
// }

const updateApplicant = async(user:any , payload:any) =>{
let {id , ...data} = payload
console.log(id)
const response = await ApplicantModel.updateOne(
    { _id: id },
    { $set: data }
  );

return response

}

const updateStatus = async(user:any , payload:any) =>{

    let {id , ...data} = payload
console.log(id)
const applicant = await ApplicantModel.findOne({_id:id})

const companyApplication  = await prisma.companyApplication.findUnique({
    where:{
        id:applicant.companyApplicationId
    },
    include:{
        company:true
    }
})


const studentId:any = applicant?.studentId
const student = await prisma.student.findFirst({
    where:{
        id:studentId
    }
})
const currentPlacementStatus = Array.isArray(student?.placementStatus) ? student?.placementStatus : [];

const check = currentPlacementStatus.some((info:any) => info.id === companyApplication?.id )
if(check ) throw new ApiError(400 , "Can Not Update Status Already Selected")
if(data.status =="accepted") {
    // const response = prisma.student.update({
    
    // })
    
   

    const updateStudent = await prisma.student.update({
        where:{
            id:studentId
        },
        data:{
            placementStatus: [
                ...currentPlacementStatus,
                {
                  status: "offered",
                  company: companyApplication?.company.name ,
                  position: companyApplication?.jobTitle,
                  tier : companyApplication?.tier,
                  id:companyApplication?.id
                  
                },
              ],
        }
    })
}
const response = await ApplicantModel.updateOne(
    { _id: id },
    { $set: data }
  );
console.log(response)
return response
}
export  const ApplicantService = {
    getApplicants,
    updateApplicant,
    updateStatus
}