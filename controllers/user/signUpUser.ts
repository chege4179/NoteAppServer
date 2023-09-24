import {z} from "zod"
import {TypedRequestBody} from "../../types/TypedRequestBody";
import {Response} from "express";
import {User} from "@prisma/client";
import {BaseResponse} from "../../types/BaseResponse";
import prisma from "../../config/db";
import generateAvatarURL from "../../config/avatarUtil";
import * as argon from "argon2";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";

const RequestSchema = z.object({
     email: z.string(),
     password: z.string(),
     fullName: z.string(),
})
type RequestBody = z.infer<typeof RequestSchema>

interface ResponseBody extends BaseResponse {
     user:User | null
}
const signUpUser = async (req:TypedRequestBody<RequestBody>, res:Response<ResponseBody>) => {
     try{
          const result = RequestSchema.safeParse(req.body)
          if (result.success){
               const hashPassword = await argon.hash(req.body.password)
               const newUser = await prisma.user.create({
                    data:{
                         fullName:req.body.fullName,
                         email:req.body.email,
                         password:hashPassword,
                         imageUrl:generateAvatarURL(req.body.fullName),
                    }
               })
               return res.json({
                    msg:"Account created successfully",
                    success:true,
                    user:newUser
               })

          }else {
               return res.json({
                    msg:"Please fill in all the fields",
                    success:false,
                    user:null,
               })
          }
     }catch (err){
          console.log("Error signing up user",err)
          if (err instanceof PrismaClientKnownRequestError){
               console.log("Error code",err.code)
               if (err.code === 'P2002'){
                    return res.json({
                         msg:"A user with a similar email address already exist",
                         success:false,
                         user:null,
                    })
               }else {
                    return res.json({
                         msg:"An unexpected error occurred",
                         success:false,
                         user:null,
                    })
               }
          }else {
               return res.json({
                    msg:"An unexpected error occurred",
                    success:false,
                    user:null,
               })
          }
     }
}

export default signUpUser
