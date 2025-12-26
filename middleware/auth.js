import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
    // First we take the token from the user 
    const {token} = req.headers
    if(!token) {
        return res.json({success:false, message:"Not Authorised Login Again"})
    }
    try {
        // The token will be decoded
        const token_decode = jwt.verify(token, process.env.JWT_SECRET) // we get the token from the header
        
        // When we generate the token we have an object "id" 
        // When we decode we get the id 
        req.body.userId = token_decode.id
        next()

        // Middleware will taake the token and convert it to user id and using that user id we can add, remove, or get items from the cart 
    } catch (error) {
        console.log(error);
        res.json({
          success: false,
          message: "Error",
        });
    }
}

export default authMiddleware