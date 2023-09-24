import express from 'express';
import getNotesByUserId from "../controllers/note/getNotesByUserId";
import updateNote from "../controllers/note/updateNote";
import addNote from "../controllers/note/addNote";
import deleteNote from "../controllers/note/deleteNote";

const router = express.Router()


router.get('/all/:userId', getNotesByUserId)
router.put("/update", updateNote)
router.post("/add",addNote)
router.delete("/delete/:noteId",deleteNote)


export default router
