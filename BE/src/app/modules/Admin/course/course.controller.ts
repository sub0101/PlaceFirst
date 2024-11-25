import { Department } from "../../../../enums";
import { catchAsync } from "../../../../utils/ayncError";
import { CourseService } from "./course.service";
import { Request,Response } from "express";
import sendResponse from "../../../../Shared/sendResponse";
import httpStatus from "http-status";
const addCourse = catchAsync(async(req:Request, res:Response)=>{
    const response = await CourseService.addCourse(req.body)
    sendResponse<any>(res , {
        statusCode:httpStatus.OK,
        success:true,
        message:"Successfully Add Course",
        data:response
    })
})
const getAllCourses = catchAsync(async(req:Request , res:Response) =>{
    const response = await CourseService.getAllCourses()
    sendResponse<any []>(res , {
        statusCode:httpStatus.OK,
        success:true,
        message:"Successfully Fetched Courses",
        data:response
    })
})

const deleteCourse = catchAsync(async (req:Request , res:Response) =>{
    const response = await CourseService.deleteCourse(req.user , Number(req.params.id))
    sendResponse<any>(res , {
        statusCode:httpStatus.OK,
        success:true,
        message:"Successfully deleted Course",
        data:response
    })
})


export const CourseController ={
    addCourse,
    getAllCourses,
    deleteCourse
}