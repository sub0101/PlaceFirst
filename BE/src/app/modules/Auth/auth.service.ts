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

const login = async (payload: { userId: string, password: string }):Promise<IUserResponse> => {
    const { userId, password } = payload;
    console.log(payload)
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


    const accessToken = await generateAceessToken( {
        userId: userId,
        role: auth.role == "Admin" ? "Admin" : "Student"
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

    const { name, role, userId, email, password } = payload
    await AuthHelper.isUserExist(userId, email)
    const hpassword = await hashPassword(password);

    const trasaction = prisma.$transaction(async (tx) => {

        const auth = await tx.auth.create({
            data: {
                email: email,
                user_id: userId,
                password: hpassword,
                role: role
            }
        })
        const student = await tx.student.create({
            data: {
                name: name,
                email: email,
                studentId: userId,

            }
        })
    })
}
const signupAdmin = async (payload: IUserSignUp) => {
    const { name, role, userId, email, password } = payload
    await AuthHelper.isUserExist(userId, email)
    const hpassword = await hashPassword(password);
    const trasaction = prisma.$transaction(async (tx) => {
        const auth = await tx.auth.create({
            data: {
                email: email,
                user_id: userId,
                password: hpassword,
                role: role
            }
        })
        const admin = await tx.admin.create({
            data: {
                name: name,
                email: email,
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