import {z} from "zod";
import {BaseResponse} from "../../types/BaseResponse";
import {Note} from "@prisma/client";
import {TypedRequestParams} from "../../types/TypedRequestParams";
import {Response} from "express";
import prisma from "../../config/db";

const Schema = z.object({
     userId:z.string()
})
type RequestParams = z.infer<typeof Schema>

interface ResponseBody extends BaseResponse{
     notes:Note[] | null
}

const deleteAllNotesByUserId = async (req:TypedRequestParams<RequestParams>,res:Response<BaseResponse>) => {
     try{
          const validationResult = Schema.safeParse(req.params)
          if (validationResult.success){
               const notes = await prisma.note.deleteMany({
                    where:{
                         noteAuthorId:req.params.userId
                    }
               })
               return res.json({
                    msg:`Deleted All Notes by User ${req.params.userId}`,
                    success:true,

               })
          }else {
               return res.json({
                    msg:"Invalid request body",
                    success:false,
               })
          }
     }catch (e){
          console.log("Error",e)
          return res.json({
               msg:"An unexpected error ocurred getting notes ",
               success:false,
          })
     }
}

export default deleteAllNotesByUserId
