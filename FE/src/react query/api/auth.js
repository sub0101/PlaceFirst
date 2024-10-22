import { responsiveArray } from "antd/es/_util/responsiveObserver";
import { authAxios , unAuthAxios } from "../axios";

const URL = "auth/"
export async function  login(data) {

        const response =    await unAuthAxios.post(`${URL}login` , data)
     

        // if(response.data.success)  return response.data.data;
        console.log(response.data.data)
        
        // else{
        //     console.log("Wrong email id or password")
        //     return null;    
        // }
    

  return response.data.data
  
}

export async function  register(data) {
  const response  =await unAuthAxios.post(`${URL}/signup/student` , data)
  console.log(response.data)
}