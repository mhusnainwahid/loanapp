import express from "express"
import { loginUser, signupUser } from "../controllers/auth.js"

const authRoutes = express.Router()
authRoutes.post("/signup",signupUser)
authRoutes.post("/login", loginUser)

export default authRoutes