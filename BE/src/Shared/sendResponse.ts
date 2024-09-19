import { Response } from "express"
type ApiResponse<T> =  {

    statusCode:number
    success:boolean
    message:string;
    meta?: {
        page: number;
        limit: number;
        total: number;
    };
    data:T|null
}


const sendResponse = <T>(res:Response , data:ApiResponse<T> ) => {

    res.status(data.statusCode).json(data)
}

export default sendResponse