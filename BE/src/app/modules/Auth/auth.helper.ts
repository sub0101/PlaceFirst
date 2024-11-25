import { register } from "module"
import ApiError from "../../../Error/ApiError"
import prisma from "../../../Shared/prisma"
import otpGenerator from "otp-generator"
import { Prisma } from "@prisma/client"
import { sendVerificationEmail } from "../../../utils/mailer"
import { student_DB } from "../../../Shared/Student_DB"

const isUserExist = async(user_id:string ,email:string)=>{
    console.log(user_id + email)
    
    const auth  = await prisma.auth.findFirst({
        where: {
            OR: [
              { user_id: user_id },
              { email: email }
            ]
          }
    })
    console.log(auth)

    if(auth!=null) throw new ApiError(401 , "Email or Student Id is Already Exist")
        console.log("user not exist")
}
export const sendOtp = async(email:string ,enrollment:string) =>
   {
    try {
     
      // Check if user is already present
      if(!verifyStudent(enrollment)) throw new ApiError(401 , "User Not Registered to MIS")
      const checkUserPresent = await prisma.student.findUnique({where:{email:email}})
      if(checkUserPresent) throw new ApiError(401  ,"Uer Already Exist")
     
      let otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
   
      let result = await prisma.oTP.findUnique({where:{code:otp}})
      while (result) {
        otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
        });
        result = await prisma.oTP.findUnique({where:{code:otp}})
      }
      const otpPayload = { email, otp };
      const otpBody = await prisma.oTP.create({ 
        data:{
          email,
          code:otp
        }
      })
      console.log(otpBody)
      sendVerificationEmail(email , otp)
      
      // throw new ApiError(200 , "OTP  sent Successfully")
      // res.status(200).json({
      //   success: true,
      //   message: 'OTP sent successfully',
      //   otp,
      // });
    } catch (error:any) {
      console.log(error.message);
      // return res.status(500).json({ success: false, error: error.message });
      throw new ApiError(500 , error.message)
    }
    return "Successfully Sent OTP"
   }

   export const  verifyStudent  = (enrollment:string)=> {
const data = student_DB()
    const is_Exist = data.some((info) => info.enrollment === enrollment)
    console.log(is_Exist)
    return is_Exist

   }
export const AuthHelper = {
    isUserExist , 
    
}