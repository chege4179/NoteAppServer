import {BaseResponse} from "../../types/BaseResponse";
import {Request, Response} from "express";
import {User} from "@prisma/client";
import prisma from "../../config/db";

interface ResponseBody extends BaseResponse {
     users: User[] | null
}

const getAllUsers = async (req: Request, res: Response<ResponseBody>) => {
     try {
          const users = await prisma.user.findMany({})
          return res.json({
               msg: "All users fetched successfully",
               success: true,
               users: users,
          })

     } catch (e) {
          console.log("Error fetching all users", e)
          return res.json({
               msg: "An unexpected error occurred",
               success: false,
               users: null
          })
     }
}


export default getAllUsers
