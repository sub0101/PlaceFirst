import axios from "axios"
import { authAxios } from "../axios"

const URL = "/company" 
export const addCompany = async (data)=>{

    const response   =await  authAxios.post(URL ,  data);
    
return response.data
}

export const getAllCompany = async() =>{
    const response = await authAxios.get(URL);
    console.log("get all")
    return response.data.data
}

export const getAllCompanyApplications = async()=>{
    const response  = await authAxios.get(`${URL}/applications`);

    return response.data.data
}