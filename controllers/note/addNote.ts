import { z } from "zod"
import {TypedRequestBody} from "../../types/TypedRequestBody";
import {Response} from "express";
import {BaseResponse} from "../../types/BaseResponse";
import {Note} from "@prisma/client";
import prisma from "../../config/db";


const NoteSchema = z.object({
     noteTitle:z.string(),
     noteContent:z.string(),
     noteColor:z.number(),
     noteAuthorId:z.string(),
})
type NoteBody =z.infer<typeof NoteSchema>

interface ResponseBody extends BaseResponse{
     note:Note | null
}
const addNote = async (req:TypedRequestBody<NoteBody>,res:Response<ResponseBody>) => {
     try{
          const validationResult = NoteSchema.safeParse(req.body)
          if (validationResult.success){
               const newNote = await prisma.note.create({
                    data:{
                         noteTitle:req.body.noteTitle,
                         noteColor:req.body.noteColor,
                         noteAuthorId:req.body.noteAuthorId,
                         noteContent:req.body.noteContent,
                    }
               })
               return res.json({
                    msg:"Note Added successfully",
                    success:true,
                    note:newNote,
               })
          }else {
               console.log(validationResult.error)
               return res.json({
                    msg:"Invalid note body",
                    success:false,
                    note:null,
               })
          }

     }catch (e){
          console.log("Error adding note",e)
          return res.json({
               msg:"An unexpected error occurred",
               success:false,
               note:null,
          })
     }
}

export default addNote
