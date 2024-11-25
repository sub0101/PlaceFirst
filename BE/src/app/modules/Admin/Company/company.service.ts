import { Company } from "@prisma/client"
import prisma from "../../../../Shared/prisma"
import { User } from "../../../../interfaces"
import ApiError from "../../../../Error/ApiError"
import { AuthUser } from "../../../../enums"
import { app } from "../../../../app"
import mongoose from "mongoose"
import { Model } from "mongoose"
import { ApplicantModel, CustomFormModel } from "../../../../config/database"

import { canApply, getApplicants } from "./comapny.helper"
import { JsonArray } from "@prisma/client/runtime/library"

const addForm = async(payload:any , id:string)=>{
    console.log("adding applicant")
    console.log(payload)
    console.log(id)
   
    const form = new CustomFormModel({
        companyApplicationId:id,
        fields: payload
    })
    await form.save();
    console.log(form)
    return form
}
const getForm = async()=>{

const response:any =  await CustomFormModel.find({})
console.log(response)
console.log(response[0])
return response[0].fields;
}


const addCompany = async ( user:User | undefined , payload:any):Promise<any|undefined> => {
    if(!user) throw new ApiError(401 , "user Does not exist")
        console.log(payload)
    const {companyDetails:company , companyApplication,customForm} = payload

    const admin = prisma.admin.findUnique({
        where:{id:user.id}
    })
    const result  = await prisma.company.create({
        data:{
            ...company,
            companyApplication:{
                create:{
                    ...companyApplication
                }
            }
        },
        include:{
            companyApplication:true
        }
    
    })

    addForm(customForm,result?.companyApplication?.id || "")
    
   return result;

}
const getAllCompanies = async (user:any):Promise<Company[]> => {
   
    const data = await prisma.company.findMany({
        include:{
            companyApplication:true
        }
    })
    const updatedData = await Promise.all(
        data.map(async (company: any) => {
            const applicants = await getApplicants(company.companyApplication.id);
            return {
                ...company,

                applicants: applicants
            };
        })
    );

    return updatedData


}
const getCompanyDetails = async () => { }

const updateCompany = async (user:any , payload:any) => {

    const {companyApplication,company}  = payload
    console.log(company)
    console.log(companyApplication)

    const response  = await prisma.company.update({
        where:{
            id:company.id
        },
        data:{
           
        companyApplication:{
           update:{
            ...companyApplication
           }
            
        }
        },
        select:{    
            companyApplication:true
        }
    })

    return response;
    
}

const getAllApplications = async(user:any )=>{
    const {id} = user
    console.log(id)
    const data: any = await prisma.company.findMany({
        select: {
          name: true,
          industry: true,
          visitDate: true,
          location: true,
          companyApplication: true
        
        }
      })
    //   const student = await prisma.student.findUnique({where:{id:id}})
    //   const placementStatus:any= student?.placementStatus || [];

    // !placementStatus?.some((item: any) => console.log(item));
// const canApply  = canApply(id , )
      const updatedData = await Promise.all(
        data.map(async (company: any) => {
            const applicants = await getApplicants(company.companyApplication.id);
            return {
                ...company,
                applicants: applicants,
                canApply :( await canApply(id , company.companyApplication.tier ,applicants)) && company.companyApplication.applicationStatus 
            };
        })
    );
    
    console.log(updatedData);
      
    
return updatedData
}

const getApplication = async(user:any, comapnyId:string) =>{
    console.log("get Application")
    const {role , id } = user
    const is_admin:boolean = role==="admin"
    const application = await prisma.companyApplication.findUnique({
        where:{
            id:comapnyId
        },
        include:{
            company:{
                select:{
                    name:true,
                    location:true,
                    industry:true,
                    contactPerson:is_admin,
                    contactEmail:is_admin,
                    contactPhone:is_admin,
             
                    visitDate:true
                    
                }
                
            },
            // applicants:is_admin,
            // _count:true
        }
    })
    const {company , ...companyApplication}:any = application
    console.log(companyApplication)
    const response = {
        ...company,
        ...companyApplication, 
      };

    return response
}

export const updateStatus  = async(user:any , payload:any) =>{
    const {id,  status} = payload
    const updateCompany = await prisma.companyApplication.update({
        where:{
            id:id
        },
        data:{
            applicationStatus:status
        }
    })
}

const getApplied = async(user:any) =>{
    const {id } =user;
    const student = await prisma.student.findUnique({
        where:{
            id:id
        }
    })
    const applicant = await ApplicantModel.find({studentId:id})

   const companyApplications =  await Promise.all( applicant.map( async (applicant) =>{
        const companyApplication = await prisma.companyApplication.findUnique({
            where:{
                id:applicant?.companyApplicationId
            },
            include:{
                company:{
                    select:{
                        name:true,
                        location:true
                    }
                }
            }
        })
        return { applicant, ...companyApplication } ;
    })
)
    
    
    console.log(  companyApplications)
    return companyApplications;
    
}

export const CompanyService = {
    addCompany,
    getAllCompanies, 
    getCompanyDetails,
    updateCompany,
    getAllApplications,
    getApplication,
    addForm,
    getForm,
    updateStatus,
    getApplied
}