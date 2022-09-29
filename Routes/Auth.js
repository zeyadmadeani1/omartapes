import express from "express"
import User from "../models/User.js"
import jwt from "jsonwebtoken"
import {signin,signup,forgotPassword,newpass} from "../controllers/auth.js"
import VerifyToken from "../VerifyToken.js"
const router=express.Router()
//create a user
router.post("/register",signup)
//login
router.post("/login",signin)

router.post("/reset",forgotPassword)

router.post("/newpass",newpass)

export default router