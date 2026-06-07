//require("dotenv").config({path:'./env'})
import dotenv from "dotenv"
import mongoose from "mongoose";
import {DB_NAME} from "./constants.js"
import connectDB from "./db/index.js";
// import express from "express"
// const app = express()


dotenv.config({
    path:'./.env'
})
console.log("MONGODB_URI:", process.env.MONGODB_URI)
console.log("DB_NAME:", DB_NAME)
connectDB()


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
 