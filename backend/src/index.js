import express from "express"
import dotenv from "dotenv"
import {clerkMiddleware} from '@clerk/express'
import { connectDB } from "./lib/db.js";
import cors from "cors"
import User from "./models/user.model.js";
import fs from "fs"
import path from "path";
dotenv.config()
const app=express();
const PORT = process.env.PORT
const FRONTEND_URL= process.env.FRONTEND_URL
const publicDir = path.join(process.cwd(),"public");

app.use(express.json())
app.use(cors({origin:FRONTEND_URL,credentials:true}))
app.use(clerkMiddleware())

app.get("/health",(req,res)=>{

    res.status(200).json({ok:true});
})
if(fs.existsSync(publicDir)){
    app.use(express.static(publicDir))
    app.get("/{*any}",(req,res,nxt)=>{
        res.sendFile(path.join(publicDir,"index.html"),(err)=>nextTick(err));
    })
}
app.listen(PORT,()=>{
    connectDB();
    console.log(`app is running on port ${PORT}`)
});
