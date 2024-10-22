import { authAxios } from "../axios"

const URL = "/applicants"


export const getApplicants = async() =>{
    const id = "e41c72bf-678d-4519-a047-e77188ee8950";
    console.log(id +"is")
    const response  = await  authAxios.get(`${URL}/${id}`);
    console.log(response.data.data)
    return response.data.data;
}