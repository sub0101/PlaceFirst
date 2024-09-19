import express, { urlencoded } from "express"
import ApiError from "./Error/ApiError";
import { Request,Response ,NextFunction } from "express";
import router from "./app/routes";
import exp from "constants";
export const app = express();


app.use(express.json())
app.use(urlencoded({extended:true}))
app.use("/api/v1" , router )


app.use( ( err:any  , req:Request , res:Response , next:NextFunction) =>{
   
    if(err instanceof ApiError) {
       
        return  res.status(err.statusCode).json({success:false  , message: err.message})
    }
    else {
        
        return res.status(500).json({success:false , message:"something went Wrong"})
    }
})
