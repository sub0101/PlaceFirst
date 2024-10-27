import { authAxios } from "../axios"

const S_URL = "/s_profile"
const A_URL = "/a_profile"
export const getStudentProfile = async()=>{
    const response  = await authAxios.get(S_URL);
    console.log(response.data.data)
    return response.data.data

}
export const updateProfile = async(data)=>{
    console.log(data)
    const response = await authAxios.patch(S_URL , data);
    console.log(response.data.data)
    return response.data.data
}
export const getAllStudents = async() =>{
    const response = await authAxios.get(`${S_URL}/all`)
    console.log(response.data.data);
    return response.data.data;
}

export const getAdminProfile = async()=>{
    const response = await authAxios.get(A_URL);
    console.log(response.data.data)
    return response.data.data;
}