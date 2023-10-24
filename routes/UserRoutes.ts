import express from 'express';
import loginUser from "../controllers/user/loginUser";
import signUpUser from "../controllers/user/signUpUser";
import getAllUsers from "../controllers/user/getAllUsers";

const router = express.Router()


router.post('/login', loginUser)
router.post("/signup", signUpUser)
router.get("/all",getAllUsers)

export default router
