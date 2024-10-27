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

export const getCompanyApplication = async(id)=>{
    // const id="9baac591-e034-4206-9adf-677ccb062e17"
    const response = await authAxios.get(`${URL}/${id}`);
    console.log(response.data.data)
    return response.data.data
}