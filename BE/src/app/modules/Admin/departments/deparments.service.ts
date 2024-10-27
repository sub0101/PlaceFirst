import prisma from "../../../../Shared/prisma"

const addDeparment = async(payload:any)=>{
    const department =  await prisma.department.create({
        data:payload
    }) 
    return department;

}

const getAllDepartments = async() =>{
    const departments = await prisma.department.findMany();
    return departments
}

export const DepartmentService = {
    addDeparment,
    getAllDepartments
}