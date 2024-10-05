import exp from "constants"

export  interface IUserResponse {
    userId:string
    token :string
    role:string
}
export interface IUserSignUp {
    name: string
    userId :string
    email :string 
    password:string
    role:string
}
export interface IJwtPayload {
    userId:string
    role:string
    
  }


  export interface User {
    id:string |undefined , 
    role:string|undefined
  } 