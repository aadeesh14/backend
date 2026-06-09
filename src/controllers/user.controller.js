import asyncHandler from 'express-async-handler';
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinery} from "../utils/cloudinary.js" 
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req,res)=>{
    // get user details from frontend
    // validation = not empty
    // check if user already exists : username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in DB 
    // remove password and refresh token field from response 
    // check for user creation 
    // return response otherwise send error
    

    const {fullName, email, username, password} = req.body
    console.log("email: ",email);
    
    /*if(fullName === ""){
        throw new ApiError(400, "Fullname Is Required") 
    }
*/
    if([
        [fullName,email,username,password].some((field)=>field?.trim()==="")
    ])  {
        throw new ApiError(400,"All Fields Are Required")
    }

    const existedUser = User.findOne({$or:[
        { username },{ email }]
    })
    if(existedUser){
        throw new ApiError(409, "User With Email Or Username already Exists")
    }
    const avatrLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;  
    if(!avatrLocalPath){
        throw new ApiError(400,"Avatar File Is Required")
    }

    const avatar = await uploadOnCloudinery(avatrLocalPath)
    const coverImage = await uploadOnCloudinery(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar File Is Required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500, "Something Went Wrong While Registering The User")
    }
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User Registered Successfully")
    )
})

export {registerUser}