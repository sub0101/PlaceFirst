import { authAxios } from "../axios"

const URL = "application"
export const applyCompany = async (data) =>{

    const response =  await authAxios.post(URL , data);
    console.log(response)
    console.log(response.data.data)
    return response.data.data
}