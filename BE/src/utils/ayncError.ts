import { RequestHandler } from "express";
import { Request , Response , NextFunction } from "express-serve-static-core";
export const catchAsync = (fn:RequestHandler) => async(req:Request , res:Response , next :NextFunction) =>{

    try{
        await fn(req , res, next);
    }
    catch(e){
        console.log(e)
        next(e);

    }
}