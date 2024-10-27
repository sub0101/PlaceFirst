import { catchAsync } from "../../../../utils/ayncError";
import { Request,Response } from "express";
import { StatsService } from "./stats.service";
import sendResponse from "../../../../Shared/sendResponse";
const getStats = catchAsync(async(req:Request , res:Response) =>{
const response = await StatsService.getStats()
return sendResponse<any>(res , {
    message:"successfully fetched the stats",
    success:true,
    statusCode:200,
    data:response
})
})

export const StatsController = {
    getStats
}