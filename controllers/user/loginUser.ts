import {TypedRequestBody} from "../../types/TypedRequestBody";
import {z} from "zod"
import {BaseResponse} from "../../types/BaseResponse";
import {Response} from "express";
import {User} from "@prisma/client";
import prisma from "../../config/db";
import * as argon from "argon2";


const LoginSchema = z.object({
     email: z.string(),
     password: z.string()
})

type LoginBody = z.infer<typeof LoginSchema>

interface ResponseBody extends BaseResponse {
     user: User | null
}

const loginUser = async (req: TypedRequestBody<LoginBody>, res: Response<ResponseBody>) => {
     try {
          const result = LoginSchema.safeParse(req.body)
          if (result.success) {
               const user = await prisma.user.findUnique({
                    where: {
                         email: req.body.email
                    }
               })
               if (!user) {
                    return res.json({
                         msg: "No such user exists",
                         success: false,
                         user: null,
                    })
               } else {
                    const pwMatches = await argon.verify(user.password, req.body.password)
                    if (pwMatches) {
                         return res.json({
                              msg: "Login Successful",
                              success: true,
                              user,

                         })
                    } else {
                         return res.json({
                              msg: "Wrong Password...Please try again",
                              success: false,
                              user: null,
                         })
                    }
               }

          } else {
               return res.json({
                    msg: "Please fill in all the fields",
                    success: false,
                    user: null,
               })
          }
     } catch (err) {
          console.log("An unexpected error occurred login a user >>>>>>>>>", err)
          return res.json({
               msg: "An unexpected error occurred...Please try again",
               success: false,
               user: null,
          })
     }
}

export default loginUser
