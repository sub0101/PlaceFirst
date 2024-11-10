import httpStatus from "http-status"
import ApiError from "../../../../Error/ApiError"
import prisma from "../../../../Shared/prisma"


const getProfile = async (user:any)=>{
    console.log(user)
    const student = await prisma.student.findUnique({
        where:{
        id:user.id
        },
        include:{
            education:true,
            department:true,
            course:true
        }
        
    })
    if(!student) throw new ApiError( httpStatus.UNAUTHORIZED , "User Does not Exist")
        return student
}
const updateProfile = async(user:any , data:any) =>{
    // console.log(user)
    const {studentInfo , education} = data
    const {departmentId ,department, courseId, course , ...updateData } = studentInfo
    const student = await  prisma.student.update({
       data:{
        ...updateData,
        departmentId:departmentId,
        courseId:courseId
       },
        where:{
            id:user.id
        }
    })
    if(education.length>0) {

        await prisma.student.update({
            where: { id: user.id },
            data: {
              education: {
            
                upsert: education.map((ed:any) => ({
                  where: { id: ed.id || 0 }, 
                  update: {
                    
                            degree: ed.degree,
                            institution: ed.institution,
                            year: ed.year,
                            currentEducation:ed.currentEducation,
                            grade: parseFloat(ed.grade),
                        specialization:ed.specialization
                  },
                  create: {
                    degree: ed.degree,
                    institution: ed.institution,
                    year: ed.year,
                    currentEducation:ed.currentEducation,
                    grade: parseFloat(ed.grade),
                specialization:ed.specialization
                  },
                
                }))
              },
            
            }})
    }
    
    return student
}

const getAllProfiles = async()=>{
    const response  = await prisma.student.findMany({
        include:{
            department:true,
            course:true
        }
    });

    return response;
}
const getStudentInfo = async(id:string)=>{
    
    const student = await prisma.student.findUnique({
        where:{
        id:id
        },
        include:{
            education:true,
            department:true,
            course:true,
            
        }
        
    })
    if(!student) throw new ApiError( httpStatus.UNAUTHORIZED , "User Does not Exist")
        return student
}

const deleteEducation  = async(id:number) =>{
    const respone = await prisma.education.delete({
    where:{
        id:id
    }
    })
    return respone;
}
export const S_ProfileService = {
    getProfile,
    updateProfile,
    getAllProfiles,
    getStudentInfo
}

