import { Company } from "@prisma/client"
import prisma from "../../../../Shared/prisma"
import { User } from "../../../../interfaces"
import ApiError from "../../../../Error/ApiError"




const addCompany = async ( user:User | undefined , payload:any):Promise<any|undefined> => {
    if(!user) throw new ApiError(401 , "user Does not exist")
        console.log(payload)
    const {companyDetails:company , companyApplication} = payload

    const admin = prisma.admin.findUnique({
        where:{id:user.id}
    })
// console.log()
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
    
   return result;

}
const getAllCompanies = async (user:any):Promise<Company[]> => {
    console.log("getting")
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

const updateCompany = async () => {

}

const getAllApplications = async()=>{
const data:any = await prisma.company.findMany({
    select:{
        name:true,
        industry:true,
        visitDate:true,
        status:true,
        location:true,
      companyApplication:{
        include:{
        
            applicants:{
                select:{
                    studentId:true
                }
            }
        }
      }
    },
})

// const details  ={...(data.companyApplication) }
// // const details = 
// console.log(details)
// console.log(data)
// console.log(data.name)
return data
}

export const CompanyService = {
    addCompany,
    getAllCompanies, 
    getCompanyDetails,
     updateCompany,
     getAllApplications
}