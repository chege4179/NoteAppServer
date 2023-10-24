import {z} from "zod";
import {TypedRequestParams} from "../../types/TypedRequestParams";
import {BaseResponse} from "../../types/BaseResponse";
import {Note} from "@prisma/client";
import {Response} from "express";
import prisma from "../../config/db";


const Schema = z.object({
     userId:z.string()
})
type RequestParams = z.infer<typeof Schema>

interface ResponseBody extends BaseResponse{
     notes:Note[] | null
}

const getNotesByUserId = async (req:TypedRequestParams<RequestParams>,res:Response<ResponseBody>) => {
     try{
          const validationResult = Schema.safeParse(req.params)
          if (validationResult.success){
               const notes = await prisma.note.findMany({
                    where:{
                         noteAuthorId:req.params.userId
                    }
               })
               return res.json({
                    msg:`Notes by User ${req.params.userId}`,
                    success:true,
                    notes:notes,
               })
          }else {
               return res.json({
                    msg:"Invalid request body",
                    success:false,
                    notes:null,
               })
          }
     }catch (e){
          console.log("Error",e)
          return res.json({
               msg:"An unexpected error ocurred getting notes ",
               success:false,
               notes:null
          })
     }
}

export default getNotesByUserId
