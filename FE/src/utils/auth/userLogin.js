import axios from "axios"
import { setUserInfo } from "../localStorage"

const BASE_URL = import.meta.env.VITE_BASE_URL
export const login = async (data)=>{
    
    const res =  await axios.post(`${BASE_URL}/auth/login`,data , {
        withCredentials:true
    })

    const {token } = res.data.data
    
    setUserInfo(token)
    if(token) return true
}