import { getFromLocalStorage } from "../localStorage";
import decodeToken  from "./jwt";
export function getAccessToken(){
return getFromLocalStorage("token")
}

export const getUserInfo =  () => {
    const authToken = getFromLocalStorage("token");
    if (authToken) {
        console.log(authToken)
        const decodedToken =  decodeToken(authToken);
      
        return decodedToken
    } else {
        return null
    }
}

export const isLoggedIn = () => {
    const authToken = getFromLocalStorage("token");
    return !!authToken;
}
export const loggedOut = () => {
    return localStorage.removeItem("token")
}