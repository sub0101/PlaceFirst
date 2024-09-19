import { Admin, Student } from "@prisma/client"
import { IAdmin, IStundent } from "../../../interfaces"
import prisma from "../../../Shared/prisma"
import { AuthHelper } from "./auth.helper"

const login = async () => {

}
const signupStudent = async (payLoad: Student) => {
console.log(payLoad)
    const { enrollment, email } = payLoad
    AuthHelper.isEmailExist(email)
    AuthHelper.isEnrollmentExist(email)

    const student =  await prisma.student.create({
        data: payLoad
    })
    console.log(student)


}
const signupAdmin = async (payload: Admin) => {
    const { registration_number, email } = payload
    await AuthHelper.isEmailExist(email)
   await AuthHelper.isRegistraionNumberExist(registration_number)

    const student =  await prisma.admin.create({
        data: payload
    })

    console.log(student)
}
export const AuthService = {
    login,
    signupStudent,
    signupAdmin
}