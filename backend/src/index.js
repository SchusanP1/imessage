import express from "express"
import dotenv from "dotenv"
dotenv.config()
const app=express();
const PORT = process.env.PORT
app.listen(PORT,()=>console.log(`app is running on port ${PORT}`))
console.log("db uri is ",process.env.DB_URI)