import { Admin, Student } from "@prisma/client"
import { IAdmin, IStundent } from "../../../interfaces"
import prisma from "../../../Shared/prisma"
import { AuthHelper } from "./auth.helper"
import { compare } from "bcrypt"
import jwt from "jsonwebtoken"
import ApiError from "../../../Error/ApiError"

const login = async (payload: { email: string, password: string }) => {
    const { email, password } = payload;
    const student: Student | null = await prisma.student.findUnique({
        where: {
            email: email
        }
    });
    if (student) {
        const isPasswordValid = await compare(password, student.password);
        if (!isPasswordValid) throw new ApiError(401, "Invalid email or password.");

        const accessToken = jwt.sign(
            {
                userId: student.id,
                isAdmin: false
            },
            process.env.ACCESS_TOKEN_SECRET || "secret"
        );
    } else {
        const admin: Admin | null = await prisma.admin.findUnique({
            where: {
                email: email
            }
        });
        if (admin) {
            const isPasswordValid = await compare(password, admin.password);
            if (!isPasswordValid) throw new ApiError(401, "Invalid email or password.");

            const accessToken = jwt.sign(
                {
                    userId: admin.id,
                    isAdmin: true
                },
                process.env.ACCESS_TOKEN_SECRET || "secret"
            );
        }
    }
}
const signupStudent = async (payLoad: Student) => {
    console.log(payLoad)
    const { enrollment, email } = payLoad
    AuthHelper.isEmailExist(email)
    AuthHelper.isEnrollmentExist(email)

    const student = await prisma.student.create({
        data: payLoad
    })
    console.log(student)


}
const signupAdmin = async (payload: Admin) => {
    const { registration_number, email } = payload
    await AuthHelper.isEmailExist(email)
    await AuthHelper.isRegistraionNumberExist(registration_number)

    const student = await prisma.admin.create({
        data: payload
    })

    console.log(student)
}
export const AuthService = {
    login,
    signupStudent,
    signupAdmin
}