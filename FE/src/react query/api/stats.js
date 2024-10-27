import { authAxios } from "../axios"
const URL = "stats"
export const getStats = async() =>{
    console.log('getting stats')
    const response  =  await authAxios.get(URL);
    console.log(response.data.data)
    return response.data.data;
}