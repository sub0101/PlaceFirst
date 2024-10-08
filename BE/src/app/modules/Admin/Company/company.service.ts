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
const getAllCompanies = async () => {

}
const getCompanyDetails = async () => { }

const updateCompany = async () => {

}


export const CompanyService = {
    addCompany,
    getAllCompanies, 
    getCompanyDetails,
     updateCompany
}