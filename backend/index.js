import express from "express";
import connectMongoDb from "./config/mongodb.js";
import authRoutes from "./routes/auth.js";

const app = express()

const PORT = 3000
connectMongoDb()
app.use(express.json())
app.use('/',authRoutes)


app.listen(PORT,()=>{
    console.log(`Server is running on Port:${PORT}`)
})