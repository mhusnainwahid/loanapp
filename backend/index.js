import express from "express";
import dotenv from "dotenv"
import cors from 'cors'
import connectMongoDb from "./src/config/mongodb.js";
import authRoutes from "./src/routes/auth.js";
import loanRoutes from "./src/routes/loan.js";

const app = express()
dotenv.config()
app.use(cors())

const PORT = process.env.PORT || 5000
connectMongoDb()

app.use(express.json())
app.use('/',authRoutes)
app.use('/',loanRoutes)


app.listen(PORT,()=>{
    console.log(`Server is running on Port:${PORT}`)
})