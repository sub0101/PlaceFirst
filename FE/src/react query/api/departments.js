import { authAxios } from "../axios"

const URL = 'department'
const URL2 ='course'
export const  addDeparment = async(data) =>{

    const response = await  authAxios.post(URL , data)
    console.log(response.data.data)
    return response.data.data
}


export const getAllDepartments  = async()=>{
    const response = await  authAxios.get(URL);
    console.log(response.data.data)
    return response.data.data;
}

export const addCourse = async(data) =>{
    const response = await  authAxios.post(URL2 , data)
    console.log(response.data.data)
    return response.data.data
}

export const  getAllCourses  = async()=>{
    const response = await  authAxios.get(URL2);
    console.log(response.data.data)
    return response.data.data;
}

export const removeDepartment = async(id) =>{
    const response   = await authAxios.delete(`${URL}/${id}`)
    return response.data.data;
    
}
export const removeCourse = async(id) =>{
    const response   = await authAxios.delete(`${URL2}/${id}`)
    return response.data.data

    
}