import {z} from "zod";
import {BaseResponse} from "../../types/BaseResponse";
import {Note} from "@prisma/client";
import {TypedRequestBody} from "../../types/TypedRequestBody";
import {Response} from "express";
import prisma from "../../config/db";


const UpdateNoteSchema = z.object({
     noteTitle:z.string(),
     noteContent:z.string(),
     noteColor:z.number(),
     noteAuthorId:z.string(),
     noteId:z.string(),
})
type UpdateNoteBody =z.infer<typeof UpdateNoteSchema>

interface ResponseBody extends BaseResponse{
     note:Note | null
}
const updateNote = async (req:TypedRequestBody<UpdateNoteBody>,res:Response<ResponseBody>) => {
     try{
          const validationResult = UpdateNoteSchema.safeParse(req.body)
          if (validationResult.success){
               const updatedNote = await prisma.note.update({
                    where:{
                         noteId:req.body.noteId
                    },
                    data:{
                         noteTitle:req.body.noteTitle,
                         noteColor:req.body.noteColor,
                         noteContent:req.body.noteContent,
                    }
               })
               return res.json({
                    msg:"Note updated successfully",
                    success:true,
                    note:updatedNote,
               })
          }else {

               return res.json({
                    msg:"Invalid note body",
                    success:false,
                    note:null,
               })
          }
     }catch (e:unknown){
          console.log("Invalid note body",e)
          return res.json({
               msg:"An unexpected error occurred",
               success:false,
               note:null,
          })
     }
}

export default updateNote
