import { Company } from "@prisma/client"
import prisma from "../../../../Shared/prisma"
import { User } from "../../../../interfaces"
import ApiError from "../../../../Error/ApiError"
import { AuthUser } from "../../../../enums"
import { app } from "../../../../app"
import mongoose from "mongoose"
import { Model } from "mongoose"
import { formSchema } from "../../../../config/database"

const addForm = async(payload:any , id:string)=>{
    console.log("adding applicant")
    console.log(payload)
    console.log(id)
    const CustomFormModel:Model<any> = mongoose.model('CustomForm' , formSchema)
   
    const form = new CustomFormModel({
        companyApplicationId:id,
        fields: payload
    })
    await form.save();
    console.log(form)
    return form
}
const getForm = async()=>{
    const CustomFormModel:Model<any> = mongoose.model('CustomForm' , formSchema)

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
            companyApplication:{
                include:{
                    applicants:{
                       select:{
                        id:true
                       }
                    }
                }
            }
        }
    })

    return data


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
    console.log(response)
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
          companyApplication: {
          
            include:{
            
                applicants:{
                    where:{
                        studentId:id
                    },
                    select:{
                        studentId:true
                        
                    },
                    
                },
                _count:{
                    select:{
                        applicants:true
                    }
                }
            }
          }
        
        }
      })
      
    
return data
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
            applicants:is_admin,
            _count:true
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


export const CompanyService = {
    addCompany,
    getAllCompanies, 
    getCompanyDetails,
    updateCompany,
    getAllApplications,
    getApplication,
    addForm,
    getForm
}