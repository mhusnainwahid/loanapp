import express from "express"
import { loginUser, signupUser, verifyUser } from "../controllers/auth.js"

const authRoutes = express.Router()
authRoutes.post("/signup",signupUser)
authRoutes.post("/login", loginUser)
authRoutes.post("/verifyuser", verifyUser)

export default authRoutes