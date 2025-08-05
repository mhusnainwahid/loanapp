import express from "express";
import connectMongoDb from "./config/mongodb.js";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv"
import cors from 'cors'
import loanRoutes from "./routes/loan.js";

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