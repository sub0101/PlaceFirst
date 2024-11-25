import mongoose, { Model, mongo } from "mongoose"
import { ApplicantModel } from "../../../../config/database"
import prisma from "../../../../Shared/prisma"

export const getApplicants = async  (id:string )=>{
  

const response = await ApplicantModel.find({ companyApplicationId: id }).select("studentId")
   
    console.log(response)
    return response
}

export const canApply = async (id:string ,tier :string ,applicants:any) =>{
    console.log(tier)
    const student = await prisma.student.findUnique({where:{id:id}})
    const placementStatus:any= student?.placementStatus || [];
    
    const canApply = !placementStatus?.some((item: any) => {
        if(tier == item.tier) return true;
        if (item.tier === "DREAM") {
            return true;  
        }
        if(item.tier ==="STANDARD" && tier =="NORMAL") return true;
        return false

    });
    const isExist =  applicants && !applicants.some((val:any) => val.studentId === id);
 console.log(canApply &&isExist)
 return canApply &&isExist
}
[{"status":"offered","company":"Amazon","position":"SDE-1" ,"tier":"DREAM"}]