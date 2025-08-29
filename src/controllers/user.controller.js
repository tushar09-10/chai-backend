import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js"; 

const registerUser = asyncHandler(async (req, res) => {
    // User registration logic
    // get user details from frontend
    // validation -- not empty
    // check if user already exist: username, email
    // check for images, check for avtar
    // upload them to cloudinary
    // create user object - create entry in db
    // remove password and requestToken field from response
    // check for user creation
    // return response


    const {fullName, email, username, password} = req.body
    console.log("email:", email);

    // if(fullName === ""){
    //     throw new ApiError(400, "All fields are required", 400);
    // }


    if(
        [fullName, email, username, password].some((field)=> field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required", 400);
    }

    if(email.includes("@") === false){
        throw new ApiError(400, "Invalid email format", 400);
    }

    const existedUser = User.findOne({
        $or: [{email}, {username}]
    })

    if(existedUser){
        throw new ApiError(409, "User already exist");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(500, "Failed to upload avatar image");
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken -__v -createdAt -updatedAt");

    if(!createdUser){
        throw new ApiError(500, "User registration failed");
    }

    return res.status(201).json(new ApiResponse(
        true,
        201,
        "User registered successfully",
        createdUser
    ));

    // res.status(200).json({
    //     message: "Hey! I am Tushar || Everything is ok"
    // });
});

export { registerUser };