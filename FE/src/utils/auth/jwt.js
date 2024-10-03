import {jwtDecode} from "jwt-decode"

const  decodeToken = (token) =>{
    const data = jwtDecode(token)
    console.log(data)
    return jwtDecode(token);
}

export default decodeToken