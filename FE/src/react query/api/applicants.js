import { authAxios } from "../axios"

const URL = "/applicants"


export const getApplicants = async(id) =>{
 console.log(id)
    const response  = await  authAxios.get(`${URL}/${id}`);
    console.log(response.data.data)
    return response.data.data;
}