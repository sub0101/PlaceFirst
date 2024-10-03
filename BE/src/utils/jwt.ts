import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import env from '../config';
import ApiError from '../Error/ApiError';
import httpStatus from 'http-status';
import { IJwtPayload } from '../interfaces';

export const generateAceessToken = async (payload:any ) =>{

    const{userId , role} = payload
    const data = { 
        userId:userId,
        role:role
    }

    const accessToken:string = jwt.sign(

        data,

        env.JWT_SECRET,
        { expiresIn: env.ACCESS_TOKEN_EXPIRE }
    )
    return accessToken
    }
export const generateRefreshToken = async (payload:any )=>{
    const data = {
        id: payload.id,
        email: payload.email,
    }
    const refreshToken =  jwt.sign(data, env.JWT_SECRET, { expiresIn: env.REFRESH_TOKEN_EXPIRE })
    return refreshToken
}

export const verifyToken = async   (token:string)=>{
 
    const response  =   jwt.verify(token , env.JWT_SECRET) as IJwtPayload
  
    return response;
}
   
export  const verifyRefreshToken =  async (token:string , email:string):Promise<string> => {

let  response :string ="";
await jwt.verify(token , env.JWT_SECRET , (err:any , decode:any) =>{

    if(err || decode.email !== email) {
     
        throw new ApiError(httpStatus.UNAUTHORIZED , "UNAUTHORIZED");
    }
    const data = {id:decode.id, email:decode.email}
  
response =     jwt.sign(data
        ,
        env.JWT_SECRET,
        { expiresIn: env.ACCESS_TOKEN_EXPIRE })
})

console.log(response)
return response;


}
