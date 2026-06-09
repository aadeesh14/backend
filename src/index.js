//require("dotenv").config({path:'./env'})
import dotenv from "dotenv"
import mongoose from "mongoose";
import {DB_NAME} from "./constants.js"
import connectDB from "./db/index.js";
import { app } from "./app.js";
// import express from "express"
// const app = express()


dotenv.config({
    path:'./.env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server Is Running At Port : ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGO DB Connection Failed!",err);
})

/*
( async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",()=>{
            console.log("Error: ",error);
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log("App is listening on port ${process.env.PORT}");
        })
    }
    catch(error){
        console.log("Error:",error)
        throw error
    }
})()
 
*/
 