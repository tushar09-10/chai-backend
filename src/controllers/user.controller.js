import {asyncHandler} from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
    // User registration logic
    res.status(200).json({
        message: "Hey! I am Tushar || Everything is ok"
    });
});

export { registerUser };