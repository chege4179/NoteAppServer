import express from 'express';
import loginUser from "../controllers/user/loginUser";
import signUpUser from "../controllers/user/signUpUser";

const router = express.Router()


router.post('/login', loginUser)
router.post("/signup", signUpUser)


export default router
