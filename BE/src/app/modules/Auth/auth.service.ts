import { Admin, Auth, Student } from "@prisma/client"
import prisma from "../../../Shared/prisma"
import { IUserResponse, IUserSignUp } from "../../../interfaces"
import { AuthHelper } from "./auth.helper"
import { compare } from "bcrypt"
import jwt from "jsonwebtoken"
import env from "../../../config"
import ApiError from "../../../Error/ApiError"
import { hashPassword } from "../../../utils/bcrypt"
import { userInfo } from "os"
import { generateAceessToken } from "../../../utils/jwt"
import { AuthUser } from "../../../enums"

const login = async (payload: { userId: string, password: string }):Promise<IUserResponse> => {
    let  { userId, password } = payload;
    console.log(payload)
    userId = userId.toLocaleLowerCase()
    const auth: Auth | null = await prisma.auth.findUnique({
        where: {
            user_id: userId
        }
    });
    if (!auth) throw new ApiError(401, "Invalid User Id")
    console.log(auth)
    const isPasswordValid = await compare(password, auth.password);
    console.log(isPasswordValid)
    if (!isPasswordValid) throw new ApiError(401, "Invalid  User Id or Password.");


    const user:any = auth.role=="admin"? await prisma.admin.findUnique({where:{adminId:userId} }) :await prisma.student.findUnique({where:{studentId:userId}})
    console.log(user.id)
    const accessToken = await generateAceessToken( {
        userId: userId,
        id:user.id,
        role: auth.role == "admin" ? "Admin" : "Student"
    })
    console.log(accessToken)

    const response :IUserResponse ={
        userId:userId,
        token:accessToken,
        role:auth.role
    }
    return response



}
const signupStudent = async (payload: IUserSignUp) => {

    let { name, userId, email, password ,contact} = payload

userId = userId.toLocaleLowerCase()
    await AuthHelper.isUserExist(userId, email)
    const hpassword = await hashPassword(password);

    const trasaction  = await prisma.$transaction(async (tx) => {

        const auth = await tx.auth.create({
            data: {
                email: email,
                user_id: userId,
                password: hpassword,
                role: AuthUser.STUDENT
            }
        })
        const student = await tx.student.create({
            data: {
                name: name,
                email: email,
                contact:contact,
                studentId: userId,

            }
        })
    })
}
const signupAdmin = async (payload: IUserSignUp) => {
    let  { name, userId, email, password ,contact} = payload
    userId = userId.toLocaleLowerCase()
    await AuthHelper.isUserExist(userId, email)
    const hpassword = await hashPassword(password);
    const trasaction = prisma.$transaction(async (tx) => {
        const auth = await tx.auth.create({
            data: {
                email: email,
                user_id: userId,
                password: hpassword,
                role: AuthUser.ADMIN
            }
        })
        const admin = await tx.admin.create({
            data: {
                name: name,
                email: email,
                contact:contact,
                adminId: userId,

            }
        })

    })


}
export const AuthService = {
    login,
    signupStudent,
    signupAdmin
}