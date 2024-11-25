import { authAxios } from "../axios"

const URL = "/applicants"


export const getApplicants = async(id) =>{
 console.log(id)
    const response  = await  authAxios.get(`${URL}/${id}`);
    console.log(response.data.data)
    return response.data.data;
}
export const updateApplicant = async(data) =>{
    console.log(data)
    const response = await authAxios.patch(URL , data)
    console.log(response.data.data)
    return response.data.data
}
export const updateStatus = async(data) =>{
    const resposne = await authAxios.patch(`${URL}/update-status`  ,data)
return resposne.data.data
}