import prisma from "../../../../Shared/prisma"

const getApplicants = async(user:any  , id:string)=>{
    console.log(id)

    const applicants = await prisma.applicant.findMany({
        where:{
            companyApplicationId:id
        },
        include:{
            Student:true
        }
    })
    console.log(applicants)
    return applicants;
}

export  const ApplicantService = {
    getApplicants
}