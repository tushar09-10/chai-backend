const asyncHandler = (requestHandeler) => {
    (req, res, next) => {
        Promise.resolve(requestHandeler(req, res, next)).catch((error) => next(error))
    }
}


export {asyncHandler}

// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         // next(error)
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message || "Internal Server Error",
//         })
//     }
// }
