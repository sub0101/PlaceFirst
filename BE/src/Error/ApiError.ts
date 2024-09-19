class BaseApiError extends Error {
    public readonly  statusCode:number;
    public readonly message :string;

    constructor(statusCode :number , message:string) {
        super(message)
        this.statusCode = statusCode
        this.message  =message

    }
}
class ApiError extends BaseApiError {

    constructor(statusCode:number , message:string) {
        super(statusCode , message);
        
    }
}

export default ApiError