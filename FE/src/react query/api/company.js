import axios from "axios"
import { authAxios } from "../axios"

const URL = "/company" 
export const addCompany = async (data)=>{

    const response   =await  authAxios.post(URL ,  data);
    console.log(response)
return response.data
}