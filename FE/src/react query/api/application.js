import { authAxios } from "../axios"

const URL = "application"
export const applyCompany = async (data) =>{

    const response =  await authAxios.post(URL , data);
    console.log(response)
    console.log(response.data.data)
    return response.data.data
}

export const saveForm = async(data)=>{
    const response = await authAxios.post('form/addForm' , data);
    console.log(response)
    return response.data.data
}

export const getForm = async()=>{
    const response =await authAxios.post('form/getForm') ;
    console.log(response);
    return response.data.data
}