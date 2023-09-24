import {z} from "zod";
import {TypedRequestParams} from "../../types/TypedRequestParams";
import {BaseResponse} from "../../types/BaseResponse";
import {Response} from "express";
import prisma from "../../config/db";


const DeleteNoteSchema = z.object({
     noteId:z.string()
})
type RequestParams = z.infer<typeof DeleteNoteSchema>


const deleteNote = async (req:TypedRequestParams<RequestParams>,res:Response<BaseResponse>) => {
     try{
          const validationResult = DeleteNoteSchema.safeParse(req.params)
          if (validationResult.success){
               await prisma.note.delete({
                    where:{
                         noteId:req.params.noteId
                    }
               })
               return res.json({
                    msg:"Note deleted successfully",
                    success:true
               })
          }else {
               return res.json({
                    msg:"Invalid request",
                    success:false
               })
          }
     }catch (e){
          console.log("Error",e)
          return res.json({
               msg:"An unexpected error ocurred trying to delete",
               success:false
          })
     }
}

export default deleteNote
