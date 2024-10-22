import express, { urlencoded } from "express"
import ApiError from "./Error/ApiError";
import { Request,Response ,NextFunction } from "express";
import router from "./app/routes";
import exp from "constants";
import cors from "cors"
import { isAuth } from "./app/middlewares/Auth";
import cookieParser from "cookie-parser";
export const app = express();

app.use(cors({origin:"http://localhost:5173" ,
    optionsSuccessStatus: 200,
    preflightContinue: false,
    methods: "GET,POST,OPTIONS,PATCH",
    credentials: true}))
app.use(express.json())
app.use(urlencoded({extended:true}))
app.use("/api/v1" , router )
app.use(cookieParser())



app.use( ( err:any  , req:Request , res:Response , next:NextFunction) =>{
   console.log("error detections")
 
    if(err instanceof ApiError) {
        console.log(err)
        return  res.status(err.statusCode).json({success:false  , message: err.message})
    }
    else {
        console.log(err)
        return res.status(500).json({success:false , message:"something went Wrong"})
    }
})
